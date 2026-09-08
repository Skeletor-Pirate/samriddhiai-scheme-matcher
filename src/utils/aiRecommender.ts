import { Scheme, UserInputProfile, SchemeRecommendation } from '../types';
import { SCHEMES_DATABASE } from '../data/schemes';
import { calculateConcessionalLoan } from './calculator';

export function recommendSchemes(profile: UserInputProfile): SchemeRecommendation[] {
  const recommendations: SchemeRecommendation[] = [];

  for (const scheme of SCHEMES_DATABASE) {
    let score = 50; // base score
    const matchingReasons: string[] = [];
    const hindiMatchingReasons: string[] = [];
    let isIncomeEligible = true;
    let isCostEligible = true;

    // 1. Mandatory Income Criterion: Family Income <= ₹5.00 Lakhs
    if (profile.annualIncome > scheme.maxAnnualIncome) {
      score -= 60;
      isIncomeEligible = false;
      matchingReasons.push(`Annual income of ₹${(profile.annualIncome / 100000).toFixed(2)}L exceeds the ₹5.00L concessional ceiling`);
      hindiMatchingReasons.push(`वार्षिक पारिवारिक आय ₹5.00 लाख की रियायती सीमा से अधिक है`);
    } else {
      score += 20;
      matchingReasons.push(`Income ₹${(profile.annualIncome / 100000).toFixed(2)}L is well within the ₹5.00L concessional criteria`);
      hindiMatchingReasons.push(`वार्षिक आय ₹5.00 लाख की रियायती पात्रता सीमा के अंतर्गत है`);
    }

    // 2. Project Cost Fit
    if (profile.estimatedCost > scheme.maxProjectCost) {
      score -= 40;
      isCostEligible = false;
      matchingReasons.push(`Estimated cost exceeds scheme limit of ₹${(scheme.maxProjectCost / 100000).toFixed(2)}L`);
      hindiMatchingReasons.push(`प्रोजेक्ट लागत योजना की अधिकतम सीमा से अधिक है`);
    } else {
      score += 25;
      const costRatio = profile.estimatedCost / scheme.maxProjectCost;
      if (costRatio > 0.4 && costRatio <= 1.0) {
        score += 15; // sweet spot
        matchingReasons.push(`Optimal capital match: Project cost fits the ₹${(scheme.maxProjectCost / 100000).toFixed(2)}L envelope`);
        hindiMatchingReasons.push(`लागत का दायरा इस योजना के अनुकूल है`);
      }
    }

    // 3. Sector & Category Alignment
    if (profile.sector === scheme.category) {
      score += 35;
      matchingReasons.push(`Exact alignment with sector: ${scheme.category.replace('_', ' ').toUpperCase()}`);
      hindiMatchingReasons.push(`आपके चयनित कार्यक्षेत्र के बिल्कुल सटीक अनुरूप`);
    } else if (
      (profile.sector === 'micro_enterprise' && scheme.category === 'term_loan') ||
      (profile.sector === 'women_entrepreneurship' && scheme.id === 'mfs-micro-finance') ||
      (profile.sector === 'green_business' && scheme.category === 'term_loan')
    ) {
      score += 15;
      matchingReasons.push(`Cross-applicable multipurpose credit facility`);
      hindiMatchingReasons.push(`विविध व्यावसायिक आवश्यकताओं हेतु उपयुक्त`);
    }

    // 4. Gender Concession & Special Schemes
    let effectiveRate = scheme.baseInterestRate;
    if (profile.gender === 'female') {
      if (scheme.id === 'msy-mahila-samriddhi' || scheme.id === 'mky-mahila-kisan') {
        score += 30;
        matchingReasons.push(`Special Women Empowerment scheme with ultra-low 5.0% interest rate`);
        hindiMatchingReasons.push(`महिला सशक्तिकरण हेतु विशेष 5.0% रियायती ब्याज दर`);
      } else if (scheme.femaleInterestRebate > 0) {
        effectiveRate -= scheme.femaleInterestRebate;
        score += 10;
        matchingReasons.push(`Eligible for ${scheme.femaleInterestRebate}% Female Concessional Interest Rebate`);
        hindiMatchingReasons.push(`महिला लाभार्थियों के लिए अतिरिक्त ${scheme.femaleInterestRebate}% ब्याज छूट`);
      }
    }

    // 5. Education Level Check (For Education Schemes)
    if (scheme.category === 'education_inland' || scheme.category === 'education_abroad') {
      if (profile.sector !== 'education_inland' && profile.sector !== 'education_abroad') {
        score -= 50; // Not looking for education
      } else {
        if (scheme.category === 'education_abroad' && profile.education !== 'graduate' && profile.education !== 'post_graduate_professional') {
          score -= 30;
          matchingReasons.push(`Requires minimum graduation level for foreign studies`);
          hindiMatchingReasons.push(`विदेश अध्ययन योजना हेतु न्यूनतम स्नातक होना अनिवार्य है`);
        } else {
          score += 25;
          matchingReasons.push(`Education moratorium covers full degree course duration`);
          hindiMatchingReasons.push(`अध्ययन की पूरी अवधि के दौरान ईएमआई से पूर्ण छूट`);
        }
      }
    }

    // Calculate Eligible Loan & Estimated EMI
    const eligibleAmount = Math.min(profile.estimatedCost * (scheme.maxAssistancePct / 100), scheme.maxProjectCost * 0.9);
    const promoterContrib = profile.estimatedCost - eligibleAmount;
    const loanCalc = calculateConcessionalLoan(
      profile.estimatedCost,
      scheme.maxAssistancePct,
      effectiveRate,
      scheme.maxTenureYears,
      scheme.maxMoratoriumMonths
    );

    let eligibilityStatus: 'EL_ELIGIBLE' | 'EL_INCOME_OVER_LIMIT' | 'EL_COST_EXCEEDED' = 'EL_ELIGIBLE';
    if (!isIncomeEligible) eligibilityStatus = 'EL_INCOME_OVER_LIMIT';
    else if (!isCostEligible) eligibilityStatus = 'EL_COST_EXCEEDED';

    const boundedScore = Math.min(99, Math.max(15, score));

    recommendations.push({
      scheme,
      matchScore: boundedScore,
      effectiveInterestRate: effectiveRate,
      eligibleLoanAmount: eligibleAmount,
      promoterContribution: promoterContrib,
      estimatedMonthlyEmi: loanCalc.monthlyEmi,
      matchingReasons,
      hindiMatchingReasons,
      eligibilityStatus
    });
  }

  // Sort by highest match score first
  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}
