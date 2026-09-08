import { Scheme } from '../types';

export const SCHEMES_DATABASE: Scheme[] = [
  {
    id: 'mfs-micro-finance',
    code: 'NSFDC-MFS',
    name: 'Micro Finance Scheme (MFS)',
    hindiName: 'सूक्ष्म वित्त योजना (MFS)',
    category: 'micro_enterprise',
    maxProjectCost: 140000, // Up to ₹1.40 Lakh
    maxAssistancePct: 90, // Up to 90%
    baseInterestRate: 6.5,
    femaleInterestRebate: 1.0, // Effective 5.5% for women
    maxMoratoriumMonths: 6,
    maxTenureYears: 3,
    maxAnnualIncome: 500000,
    targetDemographic: 'Petty traders, small artisans, hawkers, street vendors, rural craftspeople',
    keyHighlights: [
      'Covers unit projects up to ₹1,40,000 with minimum paperwork',
      'Up to 90% concessional financing (Beneficiary share only 10%)',
      'Very low interest rate: 6.5% p.a. (Special 5.5% for women)',
      'Moratorium period of up to 6 months before principal repayment'
    ],
    documentsRequired: [
      'Caste Certificate issued by Competent Authority',
      'Income Certificate (Annual Family Income <= ₹5.00 Lakhs)',
      'Aadhaar Card & PAN / Voter ID',
      'Bank Account Passbook / Cancelled Cheque',
      'Simple Business Quotation or Activity Plan'
    ],
    subsidyAvailable: 'State Govts provide supplementary capital subsidy through SCAs',
    description: 'Specially engineered for low-capital micro-enterprises, small vending carts, tailoring units, and cottage trades requiring fast capital up to ₹1.40 Lakh without collateral.',
    hindiDescription: 'छोटे व्यापारियों, दर्जी, कुटीर उद्योग एवं छोटे दुकानदारों के लिए बिना किसी गारंटी के ₹1.40 लाख तक की रियायती सहायता।'
  },
  {
    id: 'msy-mahila-samriddhi',
    code: 'NSFDC-MSY',
    name: 'Mahila Samriddhi Yojana (MSY)',
    hindiName: 'महिला समृद्धि योजना (MSY)',
    category: 'women_entrepreneurship',
    maxProjectCost: 140000,
    maxAssistancePct: 90,
    baseInterestRate: 5.0, // Ultra concessional 5%
    femaleInterestRebate: 0.0,
    maxMoratoriumMonths: 6,
    maxTenureYears: 4,
    maxAnnualIncome: 500000,
    targetDemographic: 'SC Women Entrepreneurs, Self-Help Groups (SHGs), and home-based producers',
    keyHighlights: [
      'Exclusively dedicated to SC Women Entrepreneurs and Self-Help Groups',
      'Ultra-concessional interest rate of only 5.0% per annum',
      'Direct disbursement through State Channelizing Agencies and Women SHG Federations',
      'Flexible weekly or monthly repayment schedule options'
    ],
    documentsRequired: [
      'Caste Certificate of the woman applicant',
      'Income Certificate (Family income <= ₹5.00 Lakhs)',
      'Aadhaar Card & Residence Proof',
      'SHG Membership proof or Individual business declaration',
      'Bank Account linked to Aadhaar'
    ],
    subsidyAvailable: 'Full interest subvention & training allowance during skill bootcamps',
    description: 'Empowering marginalized women entrepreneurs with micro-credit up to ₹1.40 Lakh at an unbeatable 5% interest rate to establish tailoring, food processing, beauty wellness, or handicraft businesses.',
    hindiDescription: 'अनुसूचित जाति की महिला उद्यमियों के लिए मात्र 5% ब्याज दर पर ₹1.40 लाख तक की आसान ऋण योजना।'
  },
  {
    id: 'mky-mahila-kisan',
    code: 'NSFDC-MKY',
    name: 'Mahila Kisan Yojana (MKY)',
    hindiName: 'महिला किसान योजना (MKY)',
    category: 'agriculture',
    maxProjectCost: 200000, // Up to ₹2.00 Lakh
    maxAssistancePct: 90,
    baseInterestRate: 5.0,
    femaleInterestRebate: 0.0,
    maxMoratoriumMonths: 6,
    maxTenureYears: 4,
    maxAnnualIncome: 500000,
    targetDemographic: 'Women farmers, dairy operators, goatery, horticulture & agro-allied workers',
    keyHighlights: [
      'Finances agricultural activities, dairy cows/buffaloes, goat farming, vermicompost',
      'Low interest of 5.0% per annum with seasonal harvest repayment flexibilities',
      'Unit cost up to ₹2.00 Lakh with minimal promoter equity',
      'Includes insurance coverage support for cattle and dairy livestock'
    ],
    documentsRequired: [
      'SC Community Certificate',
      'Family Income Certificate (< ₹5.00 Lakhs p.a.)',
      'Aadhaar Card & Land lease or Animal husbandry site verification',
      'Bank Passbook photocopy'
    ],
    description: 'Promoting economic independence for SC women in rural areas through agro-allied occupations such as dairy farming, poultry, apiary, and organic produce harvesting.',
    hindiDescription: 'ग्रामीण महिलाओं के लिए दुग्ध उत्पादन, पशुपालन एवं कृषि गतिविधियों हेतु ₹2.00 लाख तक रियायती ऋण।'
  },
  {
    id: 'tls-term-loan-small',
    code: 'NSFDC-TLS-S',
    name: 'Term Loan Scheme (Small Projects)',
    hindiName: 'सावधि ऋण योजना - लघु परियोजनाएं',
    category: 'term_loan',
    maxProjectCost: 500000, // Up to ₹5.00 Lakh
    maxAssistancePct: 90,
    baseInterestRate: 6.5,
    femaleInterestRebate: 0.5, // 6.0% for women
    maxMoratoriumMonths: 6,
    maxTenureYears: 5,
    maxAnnualIncome: 500000,
    targetDemographic: 'Small workshop owners, retail kiosks, repair hubs, logistics vehicle owners',
    keyHighlights: [
      'Comprehensive term loan funding up to ₹5.00 Lakhs for plant, equipment & working capital',
      'Fixed concessional interest rate of 6.5% p.a. (6.0% for women)',
      '90% assistance from NSFDC with 10% promoter contribution',
      'Moratorium period of 6 months during enterprise setup'
    ],
    documentsRequired: [
      'Caste Certificate & Domicile Certificate',
      'Income Certificate (< ₹5 Lakhs)',
      'Project Appraisal Report / Machinery Quotation',
      'Trade License / Udyam MSME Registration Certificate',
      'Aadhaar, PAN Card & 6 Months Bank Statement'
    ],
    description: 'Ideal for establishing auto repair workshops, small hardware stores, printing kiosks, light engineering, and departmental mini-marts.',
    hindiDescription: 'लघु उद्यमों, वर्कशॉप और सेवा केंद्रों के लिए ₹5 लाख तक का रियायती सावधि ऋण।'
  },
  {
    id: 'tls-term-loan-general',
    code: 'NSFDC-TLS-G',
    name: 'Term Loan Scheme (High Investment Projects)',
    hindiName: 'सावधि ऋण योजना - उच्च निवेश',
    category: 'term_loan',
    maxProjectCost: 5000000, // Up to ₹50.00 Lakh
    maxAssistancePct: 90,
    baseInterestRate: 7.5, // 7.5% - 8.0%
    femaleInterestRebate: 0.5, // 7.0% for women
    maxMoratoriumMonths: 12,
    maxTenureYears: 10,
    maxAnnualIncome: 500000,
    targetDemographic: 'Commercial manufacturing units, cold storage, transport fleet, medical diagnostic centers',
    keyHighlights: [
      'Substantial credit ceiling up to ₹50.00 Lakhs for growth-stage enterprises',
      'Highly competitive 7.5% - 8% rate compared to commercial bank rates of 12-16%',
      'Extended moratorium of up to 12 months for machinery installation & commercial gestation',
      'Flexible repayment span of up to 10 years'
    ],
    documentsRequired: [
      'Caste Certificate & Valid Income Certificate (< ₹5.00 L)',
      'Detailed Project Report (DPR) with financial cash flow projections',
      'Udyam Registration & GST Certificate (if applicable)',
      'Rent Agreement / Land Ownership documents of commercial site',
      'PAN, Aadhaar & 12 Months Bank Account Statement',
      'Quotations for plant machinery from certified suppliers'
    ],
    description: 'Designed for ambitious Scheduled Caste industrial founders scaling up manufacturing factories, food processing lines, commercial transport fleets, and healthcare facilities.',
    hindiDescription: 'बड़ी विनिर्माण इकाइयों, परिवहन और उद्योगों के लिए ₹50 लाख तक का 10 वर्षीय रियायती ऋण।'
  },
  {
    id: 'gbs-green-business',
    code: 'NSFDC-GBS',
    name: 'Green Business Scheme (GBS)',
    hindiName: 'हरित व्यापार योजना (GBS)',
    category: 'green_business',
    maxProjectCost: 3000000, // Up to ₹30.00 Lakh
    maxAssistancePct: 90,
    baseInterestRate: 6.5,
    femaleInterestRebate: 0.5,
    maxMoratoriumMonths: 9,
    maxTenureYears: 7,
    maxAnnualIncome: 500000,
    targetDemographic: 'Entrepreneurs in clean mobility, solar PV setups, battery swap stations, bio-waste recycling',
    keyHighlights: [
      'Promotes climate-friendly businesses: E-rickshaws, commercial EV delivery, solar rooftops',
      'Financial assistance up to ₹30.00 Lakh with 90% loan component',
      'Favorable interest rate of 6.5% p.a. with carbon reduction incentive',
      'Moratorium of 9 months for equipment testing and grid/transport commissioning'
    ],
    documentsRequired: [
      'SC Caste Certificate & Income Certificate (< ₹5.00 Lakhs)',
      'Detailed Quotation for E-vehicles, Solar Inverters, or recycling equipment',
      'Vehicle Route Permit / Commercial License or RTO clearance (for EVs)',
      'Aadhaar, PAN & Electricity Connection / Land suitability proof'
    ],
    description: 'Catalyzing green entrepreneurship among SC youth by funding electric mobility fleets, rooftop solar generation installations, and organic solid waste recycling ventures.',
    hindiDescription: 'ई-रिक्शा, सौर ऊर्जा उपकरण और पर्यावरण अनुकूल व्यवसायों के लिए ₹30 लाख तक की योजना।'
  },
  {
    id: 'els-education-inland',
    code: 'NSFDC-ELS-IN',
    name: 'Educational Loan Scheme (Inland Studies)',
    hindiName: 'शिक्षा ऋण योजना (भारत में अध्ययन)',
    category: 'education_inland',
    maxProjectCost: 2000000, // Up to ₹20.00 Lakh
    maxAssistancePct: 90,
    baseInterestRate: 6.5,
    femaleInterestRebate: 0.5, // 6.0% for female students
    maxMoratoriumMonths: 60, // Course duration + 6 months
    maxTenureYears: 10,
    maxAnnualIncome: 500000,
    minEducation: 'matriculate',
    targetDemographic: 'SC Students pursuing professional degrees (Engineering, Medical, Law, CA, MBA)',
    keyHighlights: [
      'Covers tuition fees, hostel, books, laptop & study equipment up to ₹20.00 Lakh',
      'Zero repayment during entire course duration plus 6 months grace or 1 yr after securing employment',
      'Only 6.5% interest rate (0.5% female concession = 6.0%)',
      'No collateral requirement for loans up to designated institutional limits'
    ],
    documentsRequired: [
      'Caste Certificate of Student & Co-borrower (Parent/Guardian)',
      'Income Certificate of family (< ₹5.00 Lakhs)',
      'Admission Letter / Selection Proof from recognized UGC/AICTE university',
      'Fee Structure Schedule issued by the college/institution',
      'Class 10th & 12th Marksheets, Aadhaar & Bank Passbook'
    ],
    description: 'Enabling deserving SC students to pursue top-tier engineering, medical, technological, and postgraduate degrees across premier Indian institutes without financial hurdles.',
    hindiDescription: 'भारत के शीर्ष इंजीनियरिंग, मेडिकल और प्रबंधन कॉलेजों में उच्च शिक्षा हेतु ₹20 लाख तक शिक्षा ऋण।'
  },
  {
    id: 'els-education-abroad',
    code: 'NSFDC-ELS-AB',
    name: 'Educational Loan Scheme (Studies Abroad)',
    hindiName: 'शिक्षा ऋण योजना (विदेश में अध्ययन)',
    category: 'education_abroad',
    maxProjectCost: 3000000, // Up to ₹30.00 Lakh
    maxAssistancePct: 90,
    baseInterestRate: 6.5,
    femaleInterestRebate: 0.5,
    maxMoratoriumMonths: 48,
    maxTenureYears: 10,
    maxAnnualIncome: 500000,
    minEducation: 'graduate',
    targetDemographic: 'SC Graduates pursuing Masters, STEM, or Ph.D. degrees in accredited foreign universities',
    keyHighlights: [
      'Comprehensive financing up to ₹30.00 Lakh for tuition fees and overseas living expenses',
      'Concessional 6.5% interest rate vs 13-15% private education loan rates',
      'Moratorium covers the full degree timeline plus post-study visa job transition period',
      'Repayment period up to 10 years after student gains employment'
    ],
    documentsRequired: [
      'Caste Certificate & Valid Income Certificate (< ₹5.00 L)',
      'Valid Passport & Student Visa or I-20/CAS confirmation',
      'Unconditional Admission Offer from accredited foreign institution',
      'TOEFL / IELTS / GRE / GMAT score card',
      'Academic Transcripts and Degree Certificate'
    ],
    description: 'Empowering SC scholars to access global education in STEM, data science, artificial intelligence, biotechnology, and public policy in USA, UK, Germany, Canada, and Australia.',
    hindiDescription: 'विदेश के प्रतिष्ठित विश्वविद्यालयों में मास्टर्स एवं डॉक्टरेट की पढ़ाई हेतु ₹30 लाख तक का ऋण।'
  },
  {
    id: 'lvy-laghu-vyavasay',
    code: 'NSFDC-LVY',
    name: 'Laghu Vyavasay Yojana (Small Business Scheme)',
    hindiName: 'लघु व्यवसाय योजना (LVY)',
    category: 'micro_enterprise',
    maxProjectCost: 500000,
    maxAssistancePct: 90,
    baseInterestRate: 6.5,
    femaleInterestRebate: 0.5,
    maxMoratoriumMonths: 6,
    maxTenureYears: 5,
    maxAnnualIncome: 500000,
    targetDemographic: 'Urban and semi-urban retail stores, mobile repair shops, dry cleaners, pharmacies',
    keyHighlights: [
      'Specifically curated for modern service-oriented shops and retail establishments',
      'Up to ₹5.00 Lakh unit cost with 90% funding assistance',
      'Fast turnaround approval through Regional Rural Banks and State SC Finance Corporations',
      'Assistance covers inventory procurement and commercial shop interior fixtures'
    ],
    documentsRequired: [
      'Caste & Income Certificate (< ₹5 Lakhs)',
      'Shop Establishment Act license or Municipal trade permit',
      'Aadhaar Card, PAN Card & Bank Details',
      'Quotation for equipment, counter, and initial stock'
    ],
    description: 'Turn your retail or service idea into a thriving storefront. Covers working capital, shop fitting, and digital billing systems for retail entrepreneurs.',
    hindiDescription: 'दुकान, सेवा केंद्र, मोबाइल रिपेयरिंग और रीटेल स्टोर खोलने हेतु ₹5 लाख तक का सुलभ ऋण।'
  }
];
