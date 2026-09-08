export type Language = 'en' | 'hi' | 'ta' | 'mr';

export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  navRecommender: string;
  navCalculator: string;
  navLocator: string;
  navDossier: string;
  navGuidelines: string;
  
  // Hero
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCta1: string;
  heroCta2: string;
  statIncomeLimit: string;
  statIncomeLabel: string;
  statAssistance: string;
  statAssistanceLabel: string;
  statPartners: string;
  statPartnersLabel: string;
  statInterest: string;
  statInterestLabel: string;

  // Recommender
  recHeader: string;
  recSubheader: string;
  lblSector: string;
  lblProjectCost: string;
  lblIncome: string;
  lblEducation: string;
  lblGender: string;
  lblExistingBusiness: string;
  btnFindSchemes: string;
  btnReset: string;
  bestMatchBadge: string;
  effectiveRate: string;
  maxAssistance: string;
  promoterEquity: string;
  estEmi: string;
  moratoriumPeriod: string;
  whyFitsYou: string;
  viewDocs: string;
  calcEmiBtn: string;
  locateBranchBtn: string;

  // Calculator
  calcHeader: string;
  calcSubheader: string;
  lblCostSlider: string;
  lblAssistancePct: string;
  lblRateSlider: string;
  lblTenureSlider: string;
  lblMoratoriumSlider: string;
  resMonthlyEmi: string;
  resLoanAmount: string;
  resPromoterShare: string;
  resTotalInterest: string;
  resTotalRepayable: string;
  btnViewAmortization: string;

  // Locator
  locHeader: string;
  locSubheader: string;
  filterAll: string;
  filterSCA: string;
  filterPSB: string;
  filterRRB: string;
  filterNBFC: string;
  filterSafeOnly: string;
  fundBalance: string;
  npaRate: string;
  disbursalTime: string;
  nodalContact: string;
  routeApplicationBtn: string;
  statusSafe: string;
  statusCaution: string;
  statusRestricted: string;

  // Audio Assistant
  voiceHelp: string;
  listenGuide: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    appTitle: 'SamriddhiAI',
    appSubtitle: 'Concessional Finance & Channel Partner Router for SC Entrepreneurs',
    tagline: 'Bridging marginalized entrepreneurs directly to 100+ authorized Channel Partners with 90% concessional credit.',
    navRecommender: 'Scheme Recommender',
    navCalculator: 'EMI & Moratorium Calculator',
    navLocator: 'Geo-Spatial Partner Locator',
    navDossier: 'Application Dossier',
    navGuidelines: 'Scheme Guidelines',

    heroBadge: 'Govt Concessional Lending Framework | NSFDC & State Channelizing Agencies',
    heroHeadline: 'Concessional Credit Matching for Scheduled Caste Entrepreneurs',
    heroSubheadline: 'Empowering eligible entrepreneurs (family income up to ₹5.00 Lakhs) with up to 90% project financing at 6.5% – 8% concessional interest. Intelligently routed to authorized Channel Partners with verified active funds.',
    heroCta1: 'Check My Scheme Match',
    heroCta2: 'Calculate EMI & Subsidy',
    statIncomeLimit: 'Up to ₹5.00 Lakh',
    statIncomeLabel: 'Annual Family Income Limit',
    statAssistance: 'Up to 90%',
    statAssistanceLabel: 'Concessional Loan Assistance',
    statPartners: '100+ Partners',
    statPartnersLabel: 'SCAs, PSBs, RRBs & MFIs',
    statInterest: '5.0% - 7.5%',
    statInterestLabel: 'Concessional Annual Interest',

    recHeader: 'AI-Driven Smart Scheme Recommender',
    recSubheader: 'Answer 5 quick questions about your project to instantly unlock the best concessional credit scheme with exact subsidy and repayment details.',
    lblSector: 'Project Sector / Business Activity',
    lblProjectCost: 'Estimated Total Project Cost (₹)',
    lblIncome: 'Annual Family Income (₹)',
    lblEducation: 'Highest Education Level',
    lblGender: 'Applicant Gender',
    lblExistingBusiness: 'Enterprise Stage',
    btnFindSchemes: 'Find My Tailored Schemes',
    btnReset: 'Reset Filters',
    bestMatchBadge: 'Highest Match Score',
    effectiveRate: 'Effective Interest Rate',
    maxAssistance: 'Apex Loan Assistance',
    promoterEquity: 'Promoter Contribution (10%)',
    estEmi: 'Estimated Monthly EMI',
    moratoriumPeriod: 'Moratorium Period',
    whyFitsYou: 'Why This Fits Your Profile',
    viewDocs: 'Required Documents',
    calcEmiBtn: 'Simulate in Calculator',
    locateBranchBtn: 'Find Channel Partner',

    calcHeader: 'Dynamic Concessional EMI & Moratorium Calculator',
    calcSubheader: 'Accurately simulate your monthly repayments, accounting for the 90% loan assistance limit, promoter equity, interest rates, and 3–12 months moratorium.',
    lblCostSlider: 'Project Cost',
    lblAssistancePct: 'Assistance Share',
    lblRateSlider: 'Concessional Interest Rate (% p.a.)',
    lblTenureSlider: 'Repayment Tenure (Years)',
    lblMoratoriumSlider: 'Moratorium Grace Period (Months)',
    resMonthlyEmi: 'Monthly EMI (Post-Moratorium)',
    resLoanAmount: 'Concessional Loan (90%)',
    resPromoterShare: 'Beneficiary Equity (10%)',
    resTotalInterest: 'Total Interest Payable',
    resTotalRepayable: 'Total Amount Payable',
    btnViewAmortization: 'View Full Year-by-Year Repayment Schedule',

    locHeader: 'Geo-Spatial Partner Locator & Fund Utilization Router',
    locSubheader: 'Pinpoint the closest authorized Channel Partner (SCA, Bank, RRB, NBFC) with verified unutilized funds and clean NPA health.',
    filterAll: 'All Partners',
    filterSCA: 'State Channelizing (SCAs)',
    filterPSB: 'Public Sector Banks',
    filterRRB: 'Regional Rural Banks',
    filterNBFC: 'Microfinance (MFIs)',
    filterSafeOnly: 'Active & Optimal Fund Utilization Only',
    fundBalance: 'Unutilized Credit Limit',
    npaRate: 'Overdue / NPA Health',
    disbursalTime: 'Avg Disbursal Window',
    nodalContact: 'Branch Nodal Officer',
    routeApplicationBtn: 'Route Application to this Partner',
    statusSafe: 'Optimal / Safe Disbursal',
    statusCaution: 'Caution / Moderate Overdue',
    statusRestricted: 'Restricted / High Overdues',

    voiceHelp: 'Voice Assistance (Audio Guide)',
    listenGuide: 'Click to listen to scheme audio summary in your language'
  },
  hi: {
    appTitle: 'समृद्धि एआई (SamriddhiAI)',
    appSubtitle: 'अनुसूचित जाति उद्यमियों हेतु रियायती वित्त एवं चैनल पार्टनर राउटर',
    tagline: 'वंचित वर्ग के उद्यमियों को 90% रियायती ऋण सहायता के साथ 100+ अधिकृत चैनल पार्टनर्स से सीधे जोड़ना।',
    navRecommender: 'योजना अनुशंसा (Recommender)',
    navCalculator: 'ईएमआई व मोरेटोरियम कैलकुलेटर',
    navLocator: 'निकटतम चैनल पार्टनर खोजें',
    navDossier: 'आवेदन डोजियर',
    navGuidelines: 'योजना नियम व शर्तें',

    heroBadge: 'भारत सरकार रियायती ऋण ढांचा | NSFDC एवं राज्य चैनलाइजिंग एजेंसियां',
    heroHeadline: 'अनुसूचित जाति (SC) उद्यमियों हेतु रियायती ऋण मैचिंग प्लेटफॉर्म',
    heroSubheadline: 'वार्षिक पारिवारिक आय ₹5.00 लाख तक के पात्र उद्यमियों को 6.5% - 8% रियायती ब्याज पर 90% तक प्रोजेक्ट ऋण। बिना किसी बिचौलिए के निकटतम अधिकृत बैंक या निगम से सीधा संपर्क।',
    heroCta1: 'अपनी उपयुक्त योजना खोजें',
    heroCta2: 'ईएमआई व सब्सिडी गणना करें',
    statIncomeLimit: '₹5.00 लाख तक',
    statIncomeLabel: 'वार्षिक पारिवारिक आय सीमा',
    statAssistance: '90% तक ऋण',
    statAssistanceLabel: 'रियायती ऋण सहायता',
    statPartners: '100+ भागीदार',
    statPartnersLabel: 'राज्य निगम, सरकारी बैंक व ग्रामीण बैंक',
    statInterest: '5.0% - 7.5%',
    statInterestLabel: 'वार्षिक रियायती ब्याज दर',

    recHeader: 'एआई-संचालित स्मार्ट योजना चयन',
    recSubheader: 'अपने व्यवसाय और आय के बारे में 5 आसान प्रश्नों का उत्तर दें और तुरंत अपने लिए सबसे उपयुक्त सरकारी ऋण योजना की जानकारी पाएं।',
    lblSector: 'व्यवसाय का क्षेत्र / गतिविधि',
    lblProjectCost: 'अनुमानित कुल लागत (₹)',
    lblIncome: 'वार्षिक पारिवारिक आय (₹)',
    lblEducation: 'शैक्षणिक योग्यता',
    lblGender: 'आवेदक का लिंग',
    lblExistingBusiness: 'व्यवसाय की स्थिति',
    btnFindSchemes: 'मेरी उपयुक्त योजनाएं खोजें',
    btnReset: 'रीसेट करें',
    bestMatchBadge: 'सर्वश्रेष्ठ मैच स्कोर',
    effectiveRate: 'प्रभावी रियायती ब्याज दर',
    maxAssistance: 'सरकारी ऋण सहायता',
    promoterEquity: 'स्वयं का अंशदान (10%)',
    estEmi: 'अनुमानित मासिक ईएमआई',
    moratoriumPeriod: 'मोरेटोरियम (छूट अवधि)',
    whyFitsYou: 'यह योजना आपके लिए क्यों सही है',
    viewDocs: 'आवश्यक दस्तावेज',
    calcEmiBtn: 'कैलकुलेटर में जांचें',
    locateBranchBtn: 'निकटतम शाखा खोजें',

    calcHeader: 'गतिशील ईएमआई एवं मोरेटोरियम कैलकुलेटर',
    calcSubheader: '90% ऋण सीमा, 10% स्वयं के अंशदान और 3 से 12 महीने की मोरेटोरियम अवधि के साथ अपनी मासिक किस्त की सटीक गणना करें।',
    lblCostSlider: 'परियोजना लागत',
    lblAssistancePct: 'ऋण सहायता प्रतिशत',
    lblRateSlider: 'रियायती ब्याज दर (% वार्षिक)',
    lblTenureSlider: 'भुगतान अवधि (वर्ष)',
    lblMoratoriumSlider: 'मोरेटोरियम अवधि (महीने)',
    resMonthlyEmi: 'मासिक किस्त (ईएमआई)',
    resLoanAmount: 'रियायती ऋण (90%)',
    resPromoterShare: 'लाभार्थी अंशदान (10%)',
    resTotalInterest: 'कुल देय ब्याज',
    resTotalRepayable: 'कुल चुकौती राशि',
    btnViewAmortization: 'वर्ष-वार संपूर्ण भुगतान तालिका देखें',

    locHeader: 'भू-स्थानिक पार्टनर लोकेटर एवं फंड उपयोग राउटर',
    locSubheader: 'उपलब्ध फंड और कम एनपीए (NPA) वाले निकटतम राज्य निगम, सरकारी बैंक अथवा ग्रामीण बैंक को आसानी से ढूंढें।',
    filterAll: 'सभी पार्टनर',
    filterSCA: 'राज्य चैनलाइजिंग निगम (SCAs)',
    filterPSB: 'राष्ट्रीयकृत बैंक (PSBs)',
    filterRRB: 'क्षेत्रीय ग्रामीण बैंक (RRBs)',
    filterNBFC: 'माइक्रोफाइनेंस संस्थान (MFIs)',
    filterSafeOnly: 'केवल सक्रिय व सुरक्षित फंड वाले पार्टनर',
    fundBalance: 'उपलब्ध ऋण सीमा',
    npaRate: 'एनपीए (NPA) स्वास्थ्य स्थिति',
    disbursalTime: 'औसत ऋण वितरण समय',
    nodalContact: 'शाखा नोडल अधिकारी',
    routeApplicationBtn: 'इस शाखा को आवेदन भेजें',
    statusSafe: 'उत्कृष्ट / सुरक्षित वितरण',
    statusCaution: 'सावधानी / मध्यम एनपीए',
    statusRestricted: 'अवरुद्ध / उच्च एनपीए',

    voiceHelp: 'ध्वनि सहायता (ऑडियो गाइड)',
    listenGuide: 'अपनी भाषा में योजना का विवरण सुनने हेतु क्लिक करें'
  },
  ta: {
    appTitle: 'சம்ரித்தி ஏஐ (SamriddhiAI)',
    appSubtitle: 'ஆதி திராவிடர் தொழில்முனைவோருக்கான சலுகை கடன் மற்றும் வழிநடத்துதல் தளம்',
    tagline: '90% சலுகை நிதியுதவியுடன் 100+ அங்கீகரிக்கப்பட்ட நிதி நிறுவனங்களுடன் நேரடி இணைப்பு.',
    navRecommender: 'திட்ட பரிந்துரை',
    navCalculator: 'இஎம்ஐ கால்குலேட்டர்',
    navLocator: 'அருகிலுள்ள வங்கி/முகமை',
    navDossier: 'விண்ணப்ப ஆவணம்',
    navGuidelines: 'திட்ட வழிகாட்டுதல்கள்',

    heroBadge: 'மத்திய/மாநில அரசு சலுகைக் கடன் கட்டமைப்பு (TAHDCO & NSFDC)',
    heroHeadline: 'பட்டியலின (SC) தொழில்முனைவோருக்கான பிரத்யேக கடன் உதவி',
    heroSubheadline: 'குடும்ப ஆண்டு வருமானம் ₹5.00 லட்சத்திற்குள் உள்ள தொழில்முனைவோருக்கு 90% வரை குறைந்த வட்டியில் (6.5% - 8%) சிறப்பு நிதி உதவி.',
    heroCta1: 'எனக்கான திட்டத்தை தேடு',
    heroCta2: 'இஎம்ஐ கணக்கிடு',
    statIncomeLimit: '₹5.00 லட்சம் வரை',
    statIncomeLabel: 'குடும்ப ஆண்டு வருமான வரம்பு',
    statAssistance: '90% வரை',
    statAssistanceLabel: 'சலுகைக் கடன் உதவி',
    statPartners: '100+ நிறுவனங்கள்',
    statPartnersLabel: 'TAHDCO, பொதுத்துறை & கிராம வங்கிகள்',
    statInterest: '5.0% - 7.5%',
    statInterestLabel: 'குறைந்தபட்ச ஆண்டு வட்டி',

    recHeader: 'ஏஐ அடிப்படையிலான ஸ்மார்ட் திட்ட தேர்வு',
    recSubheader: 'உங்கள் திட்டம் பற்றிய விவரங்களை அளித்து உங்களுக்குரிய சிறந்த அரசு கடன் திட்டங்களை உடனே அறிந்து கொள்ளுங்கள்.',
    lblSector: 'தொழில் துறை',
    lblProjectCost: 'திட்ட மதிப்பீடு (₹)',
    lblIncome: 'குடும்ப ஆண்டு வருமானம் (₹)',
    lblEducation: 'கல்வி தகுதி',
    lblGender: 'பாலினம்',
    lblExistingBusiness: 'வணிக நிலை',
    btnFindSchemes: 'திட்டங்களை கண்டறி',
    btnReset: 'மீட்டமைக்க',
    bestMatchBadge: 'சிறந்த தேர்வு',
    effectiveRate: 'நடைமுறை வட்டி விகிதம்',
    maxAssistance: 'அரசு கடன் உதவி (90%)',
    promoterEquity: 'சுய பங்களிப்பு (10%)',
    estEmi: 'மாதாந்திர இஎம்ஐ',
    moratoriumPeriod: 'தவணைச் சலுகை காலம்',
    whyFitsYou: 'பொருத்தத்திற்கான காரணங்கள்',
    viewDocs: 'தேவையான ஆவணங்கள்',
    calcEmiBtn: 'இஎம்ஐ கணக்கிடு',
    locateBranchBtn: 'அருகிலுள்ள கிளையை காண்க',

    calcHeader: 'டைனமிக் இஎம்ஐ மற்றும் மோரட்டோரியம் கால்குலேட்டர்',
    calcSubheader: '90% கடன் வரம்பு, 3-12 மாதங்கள் விலக்கு காலத்துடன் மாதாந்திர தவணையை எளிதில் கணக்கிடலாம்.',
    lblCostSlider: 'திட்ட செலவு',
    lblAssistancePct: 'கடன் உதவி சதவீதம்',
    lblRateSlider: 'வட்டி விகிதம் (% ஆண்டு)',
    lblTenureSlider: 'கால அளவு (ஆண்டுகள்)',
    lblMoratoriumSlider: 'விலக்கு காலம் (மாதங்கள்)',
    resMonthlyEmi: 'மாதாந்திர இஎம்ஐ',
    resLoanAmount: 'கடன் தொகை (90%)',
    resPromoterShare: 'பயனாளி பங்கு (10%)',
    resTotalInterest: 'மொத்த வட்டி',
    resTotalRepayable: 'மொத்த திருப்பிச் செலுத்தும் தொகை',
    btnViewAmortization: 'முழு தவணை பட்டியலை காண்க',

    locHeader: 'இருப்பிடம் சார்ந்த நிதி கூட்டாளர் தேடல்',
    locSubheader: 'குறைந்த என்.பி.ஏ மற்றும் போதுமான நிதி இருப்பு உள்ள அருகிலுள்ள TAHDCO / வங்கிகளை கண்டறியவும்.',
    filterAll: 'அனைத்து முகமைகள்',
    filterSCA: 'TAHDCO மற்றும் மாநில முகமைகள்',
    filterPSB: 'பொதுத்துறை வங்கிகள்',
    filterRRB: 'கிராமப்புற வங்கிகள்',
    filterNBFC: 'மைக்ரோஃபைனான்ஸ்',
    filterSafeOnly: 'பாதுகாப்பான நிதி நிலை உள்ளவை மட்டும்',
    fundBalance: 'பயன்படுத்தப்படாத நிதி வரம்பு',
    npaRate: 'என்.பி.ஏ ஆரோக்கிய நிலை',
    disbursalTime: 'சராசரி கடன் வழங்கும் காலம்',
    nodalContact: 'நோடல் அதிகாரி',
    routeApplicationBtn: 'இந்த கிளைக்கு விண்ணப்பத்தை அனுப்பு',
    statusSafe: 'பாதுகாப்பானது',
    statusCaution: 'எச்சரிக்கை',
    statusRestricted: 'தடைசெய்யப்பட்டது',

    voiceHelp: 'குரல் உதவி',
    listenGuide: 'உங்கள் மொழியில் ஆடியோ வழிகாட்டலை கேட்க கிளிக் செய்யவும்'
  },
  mr: {
    appTitle: 'समृद्धी एआय (SamriddhiAI)',
    appSubtitle: 'अनुसूचित जातीच्या उद्योजकांसाठी सवलतीचे अर्थसहाय्य व चॅनल पार्टनर पोर्टल',
    tagline: '९०% सवलतीच्या कर्जासह वंचित घटकातील उद्योजकांना थेट १००+ अधिकृत चॅनल भागीदारांशी जोडणे.',
    navRecommender: 'योजना शिफारस',
    navCalculator: 'ईएमआय कॅल्क्युलेटर',
    navLocator: 'जवळचे चॅनल पार्टनर',
    navDossier: 'अर्ज डॉसियर',
    navGuidelines: 'योजना मार्गदर्शक तत्त्वे',

    heroBadge: 'महात्मा फुले मागासवर्ग विकास महामंडळ व NSFDC सवलत योजना',
    heroHeadline: 'अनुसूचित जाती (SC) उद्योजकांसाठी सवलतीचे कर्ज मॅचिंग प्लॅटफॉर्म',
    heroSubheadline: 'वार्षिक कौटुंबिक उत्पन्न ₹५.०० लाखांपर्यंत असणाऱ्या पात्र उद्योजकांसाठी ६.५% ते ८% सवलतीच्या व्याजदरात ९०% पर्यंत कर्ज सहाय्य.',
    heroCta1: 'माझ्यासाठी योग्य योजना शोधा',
    heroCta2: 'ईएमआय गणना करा',
    statIncomeLimit: '₹५.०० लाखांपर्यंत',
    statIncomeLabel: 'वार्षिक कौटुंबिक उत्पन्न मर्यादा',
    statAssistance: '९०% पर्यंत',
    statAssistanceLabel: 'सवलतीचे कर्ज सहाय्य',
    statPartners: '१००+ भागीदार',
    statPartnersLabel: 'महामंडळे, राष्ट्रीयीकृत व ग्रामीण बँका',
    statInterest: '५.०% - ७.५%',
    statInterestLabel: 'वार्षिक सवलतीचा व्याजदर',

    recHeader: 'एआय-आधारित स्मार्ट योजना शिफारस',
    recSubheader: 'आपल्या व्यवसायाबद्दल ५ सोप्या प्रश्नांची उत्तरे द्या आणि त्वरित सर्वोत्तम सवलतीची योजना मिळवा.',
    lblSector: 'व्यवसाय क्षेत्र',
    lblProjectCost: 'अंदाजे प्रकल्प खर्च (₹)',
    lblIncome: 'वार्षिक कौटुंबिक उत्पन्न (₹)',
    lblEducation: 'शिक्षण',
    lblGender: 'लिंग',
    lblExistingBusiness: 'व्यवसाय टप्पा',
    btnFindSchemes: 'माझ्यासाठी योजना शोधा',
    btnReset: 'रीसेट करा',
    bestMatchBadge: 'उत्कृष्ट जुळणी',
    effectiveRate: 'प्रभावी व्याजदर',
    maxAssistance: 'शासकीय कर्ज सहाय्य',
    promoterEquity: 'स्वतःचा वाटा (१०%)',
    estEmi: 'अंदाजे मासिक हप्ता (EMI)',
    moratoriumPeriod: 'सवलतीचा काळ (Moratorium)',
    whyFitsYou: 'ही योजना तुमच्यासाठी का योग्य आहे',
    viewDocs: 'आवश्यक कागदपत्रे',
    calcEmiBtn: 'कॅल्क्युलेटरमध्ये पहा',
    locateBranchBtn: 'जवळची शाखा शोधा',

    calcHeader: 'डायनॅमिक ईएमआय आणि मोरेटोरियम कॅल्क्युलेटर',
    calcSubheader: '९०% कर्ज मर्यादा, १०% लाभार्थी हिस्सा आणि ३ ते १२ महिन्यांच्या सवलत कालावधीसह अचूक हप्ता गणना करा.',
    lblCostSlider: 'प्रकल्प खर्च',
    lblAssistancePct: 'कर्ज हिस्सा टक्केवारी',
    lblRateSlider: 'व्याजदर (% वार्षिक)',
    lblTenureSlider: 'कर्ज कालावधी (वर्षे)',
    lblMoratoriumSlider: 'सवलत कालावधी (महिने)',
    resMonthlyEmi: 'मासिक हप्ता (ईएमआय)',
    resLoanAmount: 'सवलतीचे कर्ज (९०%)',
    resPromoterShare: 'लाभार्थी हिस्सा (१०%)',
    resTotalInterest: 'एकूण देय व्याज',
    resTotalRepayable: 'एकूण परतफेड रक्कम',
    btnViewAmortization: 'वर्षनिहाय परतफेड तक्ता पहा',

    locHeader: 'भौगोलिक पार्टनर लोकेटर आणि निधी वितरण ट्रॅकर',
    locSubheader: 'उपलब्ध निधी आणि कमी एनपीए असणारे जवळचे महात्मा फुले महामंडळ किंवा बँक सहज शोधा.',
    filterAll: 'सर्व भागीदार',
    filterSCA: 'राज्य विकास महामंडळे (SCAs)',
    filterPSB: 'राष्ट्रीयीकृत बँका (PSBs)',
    filterRRB: 'प्रादेशिक ग्रामीण बँका (RRBs)',
    filterNBFC: 'मायक्रोफायनान्स संस्था (MFIs)',
    filterSafeOnly: 'केवळ सक्रिय निधी उपलब्ध असणाऱ्या शाखा',
    fundBalance: 'उपलब्ध कर्ज निधी मर्यादा',
    npaRate: 'एनपीए (NPA) स्थिती',
    disbursalTime: 'सरासरी वितरण वेळ',
    nodalContact: 'शाखा नोडल अधिकारी',
    routeApplicationBtn: 'या शाखेकडे अर्ज पाठवा',
    statusSafe: 'सुरक्षित / जलद वितरण',
    statusCaution: 'सावधगिरी / मध्यम एनपीए',
    statusRestricted: 'प्रतिबंधित / उच्च एनपीए',

    voiceHelp: 'आवाज सहाय्य (ऑडिओ गाईड)',
    listenGuide: 'आपल्या भाषेत माहिती ऐकण्यासाठी येथे क्लिक करा'
  }
};
