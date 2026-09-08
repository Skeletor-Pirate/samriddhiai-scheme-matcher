export type SectorType = 
  | 'micro_enterprise' 
  | 'term_loan' 
  | 'education_inland' 
  | 'education_abroad' 
  | 'agriculture' 
  | 'green_business' 
  | 'women_entrepreneurship' 
  | 'sanitation_allied';

export type EducationLevel = 
  | 'below_10th' 
  | 'matriculate' 
  | 'graduate' 
  | 'post_graduate_professional';

export type GenderType = 'male' | 'female' | 'transgender';

export interface Scheme {
  id: string;
  code: string;
  name: string;
  hindiName: string;
  category: SectorType;
  maxProjectCost: number; // in INR
  maxAssistancePct: number; // e.g. 90%
  baseInterestRate: number; // e.g. 6.5%
  femaleInterestRebate: number; // e.g. 1.0% or 0.5%
  maxMoratoriumMonths: number;
  maxTenureYears: number;
  maxAnnualIncome: number; // ₹5,00,000
  minEducation?: EducationLevel;
  targetDemographic: string;
  keyHighlights: string[];
  documentsRequired: string[];
  subsidyAvailable?: string;
  description: string;
  hindiDescription: string;
}

export interface UserInputProfile {
  sector: SectorType;
  estimatedCost: number;
  annualIncome: number;
  education: EducationLevel;
  gender: GenderType;
  isExistingBusiness: boolean;
  state: string;
  district: string;
  pincode: string;
}

export interface SchemeRecommendation {
  scheme: Scheme;
  matchScore: number; // 0 - 100
  effectiveInterestRate: number;
  eligibleLoanAmount: number;
  promoterContribution: number;
  estimatedMonthlyEmi: number;
  matchingReasons: string[];
  hindiMatchingReasons: string[];
  eligibilityStatus: 'EL_ELIGIBLE' | 'EL_INCOME_OVER_LIMIT' | 'EL_COST_EXCEEDED';
}

export type PartnerType = 'SCA' | 'PSB' | 'RRB' | 'NBFC-MFI';

export interface ChannelPartner {
  id: string;
  name: string;
  hindiName: string;
  type: PartnerType;
  typeFullName: string;
  state: string;
  district: string;
  city: string;
  address: string;
  pincode: string;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  nodalOfficer: string;
  allocatedFundCrores: number;
  utilizedFundCrores: number;
  unutilizedFundCrores: number;
  npaPercentage: number;
  healthStatus: 'OPTIMAL' | 'CAUTION' | 'RESTRICTED';
  supportedCategories: SectorType[];
  avgDisbursalDays: number;
  distanceKm?: number;
}

export interface AmortizationRow {
  month: number;
  year: number;
  beginningBalance: number;
  principalPayment: number;
  interestPayment: number;
  totalPayment: number;
  endingBalance: number;
  isMoratorium: boolean;
}

export interface CalculationSummary {
  projectCost: number;
  loanAmount: number;
  promoterContribution: number;
  interestRate: number;
  tenureYears: number;
  moratoriumMonths: number;
  monthlyEmi: number;
  moratoriumInterestMonthly: number;
  totalInterestPayable: number;
  totalAmountPayable: number;
  schedule: AmortizationRow[];
}
