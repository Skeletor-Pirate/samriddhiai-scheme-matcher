import { CalculationSummary, AmortizationRow } from '../types';

export function calculateConcessionalLoan(
  projectCost: number,
  assistancePct: number = 90,
  annualInterestRate: number = 6.5,
  tenureYears: number = 5,
  moratoriumMonths: number = 6
): CalculationSummary {
  // Ensure valid minimums
  const safeCost = Math.max(10000, projectCost);
  const safeRate = Math.max(1.0, annualInterestRate);
  const safeTenure = Math.max(1, tenureYears);
  const safeMoratorium = Math.min(Math.max(0, moratoriumMonths), (safeTenure * 12) - 3);

  // Eligible loan up to 90% (or requested assistancePct)
  const loanAmount = Math.round(safeCost * (assistancePct / 100));
  const promoterContribution = safeCost - loanAmount;

  const totalTenureMonths = safeTenure * 12;
  const repaymentMonths = Math.max(1, totalTenureMonths - safeMoratorium);
  const monthlyRate = safeRate / 100 / 12;

  // Simple interest during moratorium per month
  const moratoriumInterestMonthly = Math.round(loanAmount * monthlyRate);

  // Standard Reducing Balance EMI post-moratorium
  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    monthlyEmi = Math.round(loanAmount / repaymentMonths);
  } else {
    const factor = Math.pow(1 + monthlyRate, repaymentMonths);
    monthlyEmi = Math.round((loanAmount * monthlyRate * factor) / (factor - 1));
  }

  // Generate Amortization Schedule
  const schedule: AmortizationRow[] = [];
  let currentBalance = loanAmount;
  let totalInterestPayable = 0;

  // Moratorium period
  for (let m = 1; m <= safeMoratorium; m++) {
    const year = Math.ceil(m / 12);
    const intPayment = moratoriumInterestMonthly;
    totalInterestPayable += intPayment;

    schedule.push({
      month: m,
      year,
      beginningBalance: currentBalance,
      principalPayment: 0,
      interestPayment: intPayment,
      totalPayment: intPayment,
      endingBalance: currentBalance,
      isMoratorium: true
    });
  }

  // Active Repayment Period
  for (let m = safeMoratorium + 1; m <= totalTenureMonths; m++) {
    const year = Math.ceil(m / 12);
    const intPayment = Math.round(currentBalance * monthlyRate);
    let princPayment = monthlyEmi - intPayment;

    if (m === totalTenureMonths || currentBalance < monthlyEmi) {
      princPayment = currentBalance;
    }

    const totalPayment = princPayment + intPayment;
    const endingBalance = Math.max(0, currentBalance - princPayment);
    totalInterestPayable += intPayment;

    schedule.push({
      month: m,
      year,
      beginningBalance: currentBalance,
      principalPayment: princPayment,
      interestPayment: intPayment,
      totalPayment,
      endingBalance,
      isMoratorium: false
    });

    currentBalance = endingBalance;
    if (currentBalance <= 0) break;
  }

  const totalAmountPayable = loanAmount + totalInterestPayable;

  return {
    projectCost: safeCost,
    loanAmount,
    promoterContribution,
    interestRate: safeRate,
    tenureYears: safeTenure,
    moratoriumMonths: safeMoratorium,
    monthlyEmi,
    moratoriumInterestMonthly,
    totalInterestPayable,
    totalAmountPayable,
    schedule
  };
}

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
