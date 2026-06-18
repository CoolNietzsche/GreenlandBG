import React, { useState, useEffect, useRef } from "react";
import {
  Wheat,
  Layers,
  Cpu,
  Snowflake,
  Sun,
  MapPin,
  Phone,
  Mail,
  Clock,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Check,
  Globe,
  Award,
  Users,
  Linkedin,
  Facebook,
  ArrowUpRight,
  Calculator,
  Compass,
  Briefcase,
  ExternalLink,
  BookOpen
} from "lucide-react";

// Types for structural safety
interface Stat {
  label: string;
  value: string;
}

interface SectorCard {
  id: string;
  title: { en: string; am: string };
  icon: React.ReactNode;
  body: { en: string; am: string };
  badge: { en: string; am: string };
}

interface ExportItem {
  id: string;
  title: { en: string; am: string };
  intro: { en: string; am: string };
  description: { en: string; am: string };
  specs: { label: { en: string; am: string }; value: string }[];
  features: { en: string; am: string }[];
}

interface ImportItem {
  id: string;
  title: { en: string; am: string };
  intro: { en: string; am: string };
  description: { en: string; am: string };
  tags: { en: string; am: string }[];
  specs: { label: { en: string; am: string }; value: string }[];
}

// Lightweight ScrollReveal helper component for premium AOS-like smooth fade-up animations
interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  key?: React.Key;
}

function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-800 transform ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function App() {
  // Navigation & UI States
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  
  // Language toggle state: 'en' for English, 'am' for Amharic
  const [lang, setLang] = useState<"en" | "am">("en");

  // Interactive inquiry state
  const [selectedInquirySubject, setSelectedInquirySubject] = useState<string>("Export Inquiry");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    subject: "Export Inquiry",
    message: ""
  });

  // Interactive Trade Calculator State
  const [calcRegion, setCalcRegion] = useState<string>("europe");
  const [calcProduct, setCalcProduct] = useState<string>("seeds");
  const [calcVolume, setCalcVolume] = useState<string>("20ft");
  const [calcResult, setCalcResult] = useState<any>(null);

  // Certification modal / details state
  const [activeCert, setActiveCert] = useState<string | null>(null);

  const contactSectionRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for header adjustments and active section highlighting
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ["home", "about", "export", "import", "solutions", "contact"];
      const scrollPosition = window.scrollY + 120; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft smooth scroll
  const scrollToId = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Pre-fill enquiry details on button click
  const triggerEnquiry = (subject: string, productName: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedInquirySubject(subject);
    
    const prefilledMessage = lang === "en"
      ? `Dear Greenland Business Group International Trade Team,\n\nWe are highly interested in acquiring information, specifications, and pricing terms regarding your product line: "${productName}". Please send us your current catalog, phytosanitary/industrial quality frameworks, minimum order quantities (MOQ), and trade compliance terms.\n\nBest regards,`
      : `ክቡር የግሪንላንድ ቢዝነስ ግሩፕ የዓለም አቀፍ ንግድ ክፍል,\n\nእባክዎን ስለ ምርት ዘርፋችሁ: "${productName}" ዝርዝር ማብራሪያ፣ የምርት መግለጫዎች፣ ዋጋ እንዲሁም ትንሹን የማዘዣ መጠን (MOQ) እና የንግድ ውሎችን በኢሜላችን ይላኩልን።\n\nከአክብሮት ጋር፣`;

    setFormData((prev) => ({
      ...prev,
      subject: subject,
      message: prefilledMessage
    }));

    // Scroll to contact ref
    if (contactSectionRef.current) {
      const offset = 80;
      const elementPosition = contactSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate compliant mailto content
    const subjectLine = `[Trade Inquiry] GreenlandBG.com - ${formData.subject} - ${formData.companyName || formData.fullName}`;
    const emailBody = `${formData.message}\n\n---\nSender Details:\nName: ${formData.fullName}\nCompany: ${formData.companyName || "Not Provided"}\nPhone: ${formData.phone || "Not Provided"}\nEmail: ${formData.email}`;
    
    const mailtoUrl = `mailto:info@greenlandbg.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;
    
    // Simulate interactive transmission success and trigger default mail service
    setFormSubmitted(true);
    window.location.href = mailtoUrl;
  };

  // Reset form status
  const resetForm = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      subject: "Export Inquiry",
      message: ""
    });
    setFormSubmitted(false);
  };

  // Run logistics calculation based on selected inputs
  const calculateLogistics = (e: React.FormEvent) => {
    e.preventDefault();

    let transitDays = "14 - 18 Days";
    let route = "Addis Ababa Depot -> MoT Terminal -> Djibouti Port -> Hamburg/Rotterdam";
    let temperature = "Ambient ventilated dry containers";
    let certificate = "Ministry of Agriculture Phytosanitary, Certificate of Origin, SGS Test";
    let moqUnit = "19 Metric Tons (1x 20ft FCL)";

    if (calcProduct === "injera") {
      temperature = "Deep Frozen (-18°C Cryogenic Reefer Container)";
      moqUnit = "Shared Air-Freight Pallets or Full 40ft Cryo Reefer";
    }

    if (calcRegion === "north_america") {
      transitDays = "28 - 35 Days";
      route = "Addis Ababa Depot -> Djibouti Port -> Suez Canal -> New York / Savannah Port";
    } else if (calcRegion === "middle_east") {
      transitDays = "7 - 10 Days";
      route = "Addis Ababa -> Djibouti Port -> Jeddah Port / Jebel Ali Port";
    } else if (calcRegion === "asia") {
      transitDays = "22 - 28 Days";
      route = "Addis Ababa -> Djibouti Port -> Bab-el-Mandeb -> Port of Singapore -> Shanghai";
    }

    if (calcVolume === "40ft") {
      moqUnit = "38 Metric Tons (1x 40ft FCL)";
    } else if (calcVolume === "air") {
      transitDays = "2 - 4 Days (Air Freight)";
      route = "Addis Ababa Bole International Airport (ADD) -> Direct Destination Cargo Terminal";
    }

    setCalcResult({
      transitDays,
      route,
      temperature,
      certificate,
      moqUnit
    });
  };

  // Pre-fill form from calculator state
  const applyCalcToForm = () => {
    if (!calcResult) return;
    
    const regionName = calcRegion.toUpperCase();
    const productName = calcProduct === "seeds" ? "Premium Oilseeds & Grains" : "Authentic Cryo-Frozen Teff Injera";
    
    const prefilledMessage = lang === "en"
      ? `Dear Greenland Trade Desk,\n\nI used your digital shipping calculator for: \n- Product: ${productName}\n- Route: To ${regionName}\n- Volume Format: ${calcVolume}\n\nEstimated Route Calculated:\n${calcResult.route}\nTransit Duration: ${calcResult.transitDays}\nTemperature Specification: ${calcResult.temperature}\n\nPlease send us an official FOB/CIF quotation based on these parameters as soon as possible.`
      : `ክቡር ግሪንላንድ ንግድ ክፍል,\n\nበድረ-ገጻችሁ የሎጂስቲክስ ማስያ በመጠቀም የመረጥናቸው መለኪያዎች:\n- ምርት: ${productName}\n- አቅጣጫ: ወደ ${regionName}\n- መጠን: ${calcVolume}\n\nየተሰላው መስመር:\n${calcResult.route}\nየመተላለፊያ ጊዜ: ${calcResult.transitDays}\nየሙቀት መግለጫ: ${calcResult.temperature}\n\nእባክዎን በዚህ መሰረት ትክክለኛ ዋጋ እና ሰነዶችን ይላኩልን።`;

    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      subject: "Export Inquiry",
      message: prefilledMessage
    });

    // Scroll to contact form
    if (contactSectionRef.current) {
      const offset = 80;
      const elementPosition = contactSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Business Lines Data with English and Amharic
  const sectorCards: SectorCard[] = [
    {
      id: "seeds",
      title: { en: "Premium Oilseeds & Grains", am: "ምርጥ የቅባት እህሎች እና ጥራጥሬዎች" },
      icon: <Wheat className="w-6 h-6 text-gold" />,
      body: { 
        en: "We export premium agricultural oilseeds including high-grade mustard seed – thoroughly cleaned, graded, and certified for international buyers in Europe, the Gulf, and Asia.",
        am: "ሰናፍጭ እና ሌሎች ከፍተኛ ጥራት ያላቸውን የቅባት እህሎች እና ጥራጥሬዎች ለዓለም አቀፍ ገበያ እናጸዳለን፣ ደረጃ እንመድባለን፤ ለአውሮፓ፣ ለመካከለኛው ምስራቅ እና እስያ ገዢዎች እንልካለን።"
      },
      badge: { en: "AGRI EXPORT", am: "የግብርና ኤክስፖርት" }
    },
    {
      id: "injera",
      title: { en: "Injera Export", am: "የጤፍ እንጀራ ኤክስፖርት" },
      icon: <Layers className="w-6 h-6 text-gold animate-pulse" />,
      body: { 
        en: "Authentic teff injera – in both frozen and dehydrated formats – supplying Ethiopian diaspora markets and premier global food retailers across three continents.",
        am: "እውነተኛ የጤፍ እንጀራ በበረዶ እና በድርቅ መልክ - በሦስት አህጉራት ለሚገኙ የኢትዮጵያ ዳያስፖራ ገበያዎች እና ለታዋቂ የምግብ ቸርቻሪዎች እናቀርባለን።"
      },
      badge: { en: "SPECIALTY COLD-PROOF", am: "ልዩ ቀዝቃዛ ምርት" }
    },
    {
      id: "machinery",
      title: { en: "Machinery & Electrical", am: "ማሽነሪ እና ኤሌክትሪካል" },
      icon: <Cpu className="w-6 h-6 text-gold" />,
      body: { 
        en: "Importing state-of-the-art industrial, agricultural processing tools, and heavy electrical components from certified manufacturers across Germany, China, and the UAE.",
        am: "ከጀርመን፣ ከቻይና እና ከተባበሩት አረብ ኤሚሬቶች ከተረጋገጡ አምራቾች የተራቀቁ የኢንዱስትሪ፣ የግብርና ማቀነባበሪያ እና ከባድ የኤሌክትሪክ ዕቃዎችን እናስመጣለን።"
      },
      badge: { en: "HEAVY INDUSTRIES", am: "ከባድ ኢንዱስትሪዎች" }
    },
    {
      id: "cold-chain",
      title: { en: "Cold Chain Solutions", am: "የቀዝቃዛ ሰንሰለት መፍትሄዎች" },
      icon: <Snowflake className="w-6 h-6 text-gold" />,
      body: { 
        en: "Providing advanced cold storage facility configurations, climate-controlled reefers, and comprehensive logistics to enable perishables and floricultural shipping.",
        am: "የግብርና ምርቶችን እና የአበባ ኤክስፖርት እቃዎችን ለማቀዝቀዝ ዘመናዊ ቀዝቃዛ ክፍል መጋዘኖችን፣ ተንቀሳቃሽ ማቀዝቀዣ ኮንቴይነሮችን እና የተሟላ ሎጂስቲክስ እናቀርባለን።"
      },
      badge: { en: "SUPPLY CHAIN", am: "ታማኝ ሎጂስቲክስ" }
    },
    {
      id: "solar-pumps",
      title: { en: "Heavy Duty Solar Pumps", am: "ከባድ የፀሐይ ኃይል ፓምፖች" },
      icon: <Sun className="w-6 h-6 text-gold" />,
      body: { 
        en: "High-yield, fuel-free solar-powered pumps ranging from 5HP to over 100HP+, engineered specifically to support Ethiopia's agricultural irrigators and off-grid setups.",
        am: "ከ5 እስከ 100+ የፈረስ ጉልበት ያላቸው ነዳጅ አልባ የፀሐይ ኃይል የውሃ ፓምፖች፣ ለኢትዮጵያ የግብርና መስኖ እና ከኤሌክትሪክ መስመር ውጭ ላሉ የውሃ አቅርቦት ፕሮጀክቶች የተነደፉ።"
      },
      badge: { en: "SOLAR ECOSYSTEMS", am: "ሶላር ኢነርጂ" }
    }
  ];

  // Deep dive product exports with Amharic bilingual objects (replacing 'tiratere' word entirely)
  const exportItems: ExportItem[] = [
    {
      id: "seeds",
      title: { en: "Premium Oilseeds & Grains", am: "ምርጥ የቅባት እህሎች እና ጥራጥሬዎች" },
      intro: { 
        en: "Harvested from the pure volcanic highlands of Gojjam, Gondar, and Wollo.", 
        am: "ከጎጃም፣ ጎንደር እና ወሎ ምርጥ የእሳተ ገሞራ አፈር የተሰበሰበ ንፁህ ምርት።" 
      },
      description: {
        en: "Ethiopia stands as one of the world's most pristine gene-pools for high-oil agricultural commodities. Our specialty Ethiopian Mustard Seed undergoes precise triple-pass mechanical aspiration, gravity-separation, and sizing. Sourced through cooperative partnerships directly from smallholder farmers, each batch and freight container is loaded under rigorous sanitary supervisor checkpoints.",
        am: "ኢትዮጵያ በዓለም ላይ በቅባት እህሎች ምርጥ ዘረ-መል ካላቸው አገሮች ቀዳሚዋ ናት። የእኛ ምርጥ የሰናፍጭ እና የቅባት እህሎች በዘመናዊ ማሽን ተለይተውና ተጠርገው ዓለም አቀፍ የዕፅዋትና ንፅህና ደረጃን እንዲያሟሉ ይደረጋል። ከአርሶ አደሮች ማህበራት ጋር በቀጥታ በመስራት ጥራቱ የተረጋገጠ ምርት እናቀርባለን።"
      },
      specs: [
        { label: { en: "Country of Origin", am: "መገኛ ሀገር" }, value: "Ethiopia (ኢትዮጵያ)" },
        { label: { en: "Purity Level", am: "የንፅህና ደረጃ" }, value: "99.5% Minimum" },
        { label: { en: "Oil Content", am: "የዘይት መጠን" }, value: "42% - 47% Range" },
        { label: { en: "Moisture Content", am: "የእርጥበት መጠን" }, value: "Max 7%" },
        { label: { en: "MOQ", am: "ቢያንስ ማዘዣ (MOQ)" }, value: "19 Metric Tons (1x 20ft FCL)" },
        { label: { en: "Standard Packaging", am: "መደበኛ ማሸጊያ" }, value: "50kg Composite PP Bags" }
      ],
      features: [
        { en: "Certified Phytosanitary Inspection Reports with every bill of lading", am: "ከእያንዳንዱ ጭነት ጋር የተረጋገጠ የግብርና ሚኒስቴር የዕፅዋት ጤንነት ሰነድ ይላካል" },
        { en: "Direct highland provenance tracking (Gojjam & Gondar agricultural zones)", am: "የምርቱ መገኛ የላይኛው የኢትዮጵያ ሰብል ልማት ቀጠናዎች መሆናቸውን በቀጥታ ማረጋገጫ" },
        { en: "Zero Chemical Post-Harvest Treatment - completely authentic raw grade", am: "ምንም አይነት ኬሚካል ያልተቀላቀለበት፣ በመጋዘን ውስጥ ተፈጥሯዊ ጥበቃ የሚደረግለት" }
      ]
    },
    {
      id: "injera",
      title: { en: "Authentic Teff Injera", am: "እውነተኛ የጤፍ እንጀራ" },
      intro: { 
        en: "Traditional baking heritage merged with state-of-the-art cold preservation.", 
        am: "የባህል መጋገሪያ ጥበብን በዘመናዊ የቅዝቃዜ ጥበቃ ቴክኖሎጂ አዋህደን እናቀርባለን።" 
      },
      description: {
        en: "Baked daily in custom, modern sanitation-focused facilities in Addis Ababa, our injera uses 100% genuine red and white teff flour (the ancient Ethiopian supergrain). Through immediate post-bake flash dehydration or cryogenic freezing, we preserve the critical carbonation-pocket structure ('Ayn') and genuine sourdough tang. Highly demanded by specialty stores and restaurants globally.",
        am: "በአዲስ አበባ ውስጥ በዘመናዊና ንፅህናው በጠበቀ ፋሲሊቲ በየቀኑ የሚጋገርው እንጀራችን 100% እውነተኛ የኢትዮጵያ ቀይ እና ነጭ ጤፍ በመጠቀም ይዘጋጃል። ከተጋገረ በኋላ ወዲያውኑ በረዶ እንዲሆን በማድረግ ወይም በማድረቅ የባህላዊው እንጀራ አይን እና የምርት ጣዕም እንደተጠበቀ ለዓለም አቀፍ ገበያ እንዲደርስ እናደርጋለን።"
      },
      specs: [
        { label: { en: "Teff Composition", am: "የጤፍ ስብጥር" }, value: "100% True Pure Teff" },
        { label: { en: "Available Formats", am: "የሚቀርብበት ሁኔታ" }, value: "Dehydrated, Frozen Vacuum, Fresh Air-freight" },
        { label: { en: "Rehydration Speed", am: "የማዘጋጃ ፍጥነት" }, value: "45 Seconds Steam Re-activation" },
        { label: { en: "Bulk Storage Temp", am: "የማከማቻ ሙቀት" }, value: "-18°C Cryo-frozen" },
        { label: { en: "Diaspora Markets", am: "የዳያስፖራ ገበያ" }, value: "North America, Western Europe, Middle East" },
        { label: { en: "Certifications", am: "የጥራት ምስክር ወረቀቶች" }, value: "Phytosanitary & FDA Registration Eligible" }
      ],
      features: [
        { en: "Baked by master culinary artisans using traditional stone griddles", am: "በባህላዊ የድንጋይ ምጣድ አጠቃቀም ጥበብ በአንጋፋ መጋገሪያ ባለሙያዎች የተጋገረ" },
        { en: "Zero synthetic acidifiers, gluten fillers, or chemical leavening agents", am: "ምንም አይነት ሰው ሰራሽ አሲድ፣ ግሉተን ወይም ኬሚካሎች ያልተጨመሩበት" },
        { en: "Pioneering multi-layered protective film prevents fracturing during transit", am: "እንጀራው በጉዞ ወቅት እንዳይሰባበር ወይም እንዳይበላሽ የሚከላከል ባለብዙ ሽፋን ማሸጊያ" }
      ]
    }
  ];

  // Deep dive import lines with bilingual structures
  const importItems: ImportItem[] = [
    {
      id: "industrial-machinery",
      title: { en: "Industrial & Electrical Systems", am: "የኢንዱስትሪ እና የኤሌክትሪካል ማሽነሪዎች" },
      intro: { en: "Supplying the hardware for Ethiopia's industrial progression.", am: "ለኢትዮጵያ የኢንዱስትሪ ልማት እምቅ አቅም መገልገያ መሳሪያዎችን እናስመጣለን።" },
      description: {
        en: "Importing directly from premier, ISO-certified makers across Germany, Japan, China, and the United Arab Emirates. We manage everything from Letter of Credit (LC) facilitation, custom clearances to transit transport.",
        am: "በቀጥታ ከጀርመን፣ ጃፓን፣ ቻይና እና የተባበሩት አረብ ኤሚሬቶች ታዋቂና ISO ከተረጋገጠላቸው አምራቾች እናስመጣለን። የባንክ ብድር (LC)፣ ጉምሩክ ክሊራንስ እና የውስጥ ትራንስፖርት ሙሉ ኃላፊነት እንወስዳለን።"
      },
      tags: [
        { en: "Agricultural Processing", am: "የግብርና ማቀነባበሪያ" },
        { en: "3-Phase Generators", am: "ባለ 3-ፌዝ ጄኔሬተር" },
        { en: "Tension Line Insulators", am: "የኤሌክትሪክ መስመር ዕቃዎች" },
        { en: "Packaging Systems", am: "ዘመናዊ ማሸጊያ ማሽኖች" }
      ],
      specs: [
        { label: { en: "Origin Brands", am: "የማሽን ብራንዶች" }, value: "European, Japanese & Top-Tier Chinese" },
        { label: { en: "Target Sectors", am: "ዋና ዋና ተጠቃሚዎች" }, value: "Agriprocessing, Construction, Energy" },
        { label: { en: "Compliance Scope", am: "የዕውቅና ደረጃ" }, value: "Ethiopian Standards Agency (ESA) Compliant" }
      ]
    },
    {
      id: "cold-chain-networks",
      title: { en: "Integrated Cold Chain Distribution", am: "የቀዝቃዛ ሰንሰለት መጋዘን መዋቅሮች" },
      intro: { en: "Counteracting post-harvest losses and safeguarding pharmaceuticals.", am: "ከአዝመራ በኋላ የሚከሰት የምርት ብክነትን መከላከል እና መድሃኒቶችን መጠበቅ።" },
      description: {
        en: "Our heavy modular cold chain infrastructure is built bespoke for Ethiopia's specific transit conditions. Combining refrigeration systems with digital telemetry lets exporters track cold shelf-life indicators perfectly.",
        am: "የእኛ ሞዱላር ቀዝቃዛ መጋዘኖች ለኢትዮጵያ የአየር ንብረት እና የአቅርቦት ሁኔታ ተስማሚ ሆነው የተነደፉ ናቸው። እቃ ኤክስፖርት የሚያደርጉ አካላት የምርታቸውን የሙቀት መጠን በቀጥታ መከታተል የሚችሉበት ሲስተም አለው።"
      },
      tags: [
        { en: "Walk-in Modular Cold Rooms", am: "ተገጣጣሚ ቀዝቃዛ ክፍሎች" },
        { en: "Digital Telemetry Control", am: "የዲጂታል ሙቀት መቆጣጠሪያ" },
        { en: "Reefers & Containers", am: "አቀዝቃዛ ኮንቴይነሮች" },
        { en: "Horticulture Depots", am: "የአትክሲትና አበባ መጋዘን" }
      ],
      specs: [
        { label: { en: "Insulation Class", am: "የሙቀት መጋረጫ ፓነል" }, value: "PU Panels 100mm to 150mm Thickness" },
        { label: { en: "Compressor Units", am: "የኮምፕሬሰር አይነቶች" }, value: "High-Efficiency Copeland / Bitzer Systems" },
        { label: { en: "Thermal Range", am: "የሙቀት ጠባይ" }, value: "Operating range from +15°C down to -25°C" }
      ]
    },
    {
      id: "solar-irrigation",
      title: { en: "Agricultural Solar Water Pumps", am: "የግብርና ሶላር ውሃ ፓምፖች" },
      intro: { en: "Delivering reliable off-grid water lifting systems at zero runtime fuel costs.", am: "ያለ ምንም የነዳጅ ወጪ አስተማማኝ የውሃ ማውጫ ሶላር ፓምፖችን እናቀርባለን።" },
      description: {
        en: "High head, multi-stage stainless steel submersible solar pumps engineered for medium and large-scale agricultural schemes. These systems draw water efficiently under modern agricultural and community projects across Ethiopia.",
        am: "ከፍተኛ ጥራት ያላቸው ከማይዝግ ብረት (stainless steel) የተሰሩ የፀሐይ ብርሃን ተንቀሳቃሽ ፓምፖች ለመካከለኛና ለከባድ የግብርና መስኖ ፕሮጀክቶች የተሰሩ ናቸው። ያለ ነዳጅ ወጪ በረሃማ በሆኑ የሀገሪቱ ክፍሎች ጭምር በብቃት ያገለግላሉ።"
      },
      tags: [
        { en: "Helical Submersible", am: "ሰንሰለታማ ሰብመርሲብል" },
        { en: "Dual-Axis Solar Panels", am: "ባለ ሁለት-ዘንግ ሶላር ፓነል" },
        { en: "Automated Irrigation", am: "አውቶማቲክ መስኖ መቆጣጠሪያ" },
        { en: "100% Fuel-Free", am: "100% ነዳጅ-አልባ የፀሐይ ብርሃን" }
      ],
      specs: [
        { label: { en: "Power Ratings", am: "የፓምፕ አቅም" }, value: "Bespoke packages ranging from 5HP to 100HP+" },
        { label: { en: "Max Head Capacity", am: "ከፍተኛው ቁመት" }, value: "Up to 350 Meters Vertical Lift" },
        { label: { en: "Wet-End Structure", am: "የፓምፕ ብረት ጥራት" }, value: "AISI 304/316 Corrosion-Resistant Stainless Steel" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-charcoal text-gray-100 font-sans selection:bg-gold selection:text-brand-charcoal">
      
      {/* TOP INFO BAR */}
      <div className="w-full bg-[#111411] border-b border-[#222822] text-[11px] font-sans text-gray-400 py-2 px-4 shadow-sm z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          {/* Left panel */}
          <div className="flex items-center gap-4">
            <a href="tel:+251116638787" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+251 11 663 8787</span>
            </a>
            <span className="text-gray-600">|</span>
            <a href="mailto:info@greenlandbg.com" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>info@greenlandbg.com</span>
            </a>
          </div>

          {/* Right panel with live localization switch */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>Bole Grace Plaza, Addis Ababa, Ethiopia</span>
            </span>
            <span className="text-gray-600">|</span>
            
            {/* AMHARIC / ENGLISH TOGGLE COMPONENT */}
            <div className="flex bg-[#191D1A] rounded p-0.5 border border-forest/30 text-[10px] font-bold">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-0.5 rounded transition-all duration-300 ${
                  lang === "en" ? "bg-gold text-brand-charcoal" : "text-gray-400 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("am")}
                className={`px-2 py-0.5 rounded transition-all duration-300 ${
                  lang === "am" ? "bg-gold text-brand-charcoal" : "text-gray-400 hover:text-white"
                }`}
              >
                አማ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER / STICKY NAVIGATION */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? "bg-white text-brand-charcoal py-3 border-b-2 border-forest shadow-md"
            : "bg-gradient-to-b from-brand-charcoal/90 to-brand-charcoal/70 backdrop-blur-md text-white py-5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          {/* Logo Branding */}
          <a
            href="#home"
            onClick={(e) => scrollToId("home", e)}
            className="flex flex-col group cursor-pointer"
            id="brand-logo"
            aria-label="Greenland Business Group Homepage"
          >
            <span
              className={`font-serif text-2xl font-bold tracking-tight leading-none transition-colors ${
                isScrolled ? "text-forest" : "text-white"
              }`}
            >
              GREENLAND
            </span>
            <span className="text-[9px] font-sans font-bold tracking-widest text-gold mt-1 transition-transform group-hover:translate-x-0.5">
              BUSINESS GROUP
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
            {[
              { label_en: "Home", label_am: "ዋና ገጽ", id: "home" },
              { label_en: "About", label_am: "ስለ እኛ", id: "about" },
              { label_en: "Export", label_am: "ላኪነት", id: "export" },
              { label_en: "Import", label_am: "አስመጪነት", id: "import" },
              { label_en: "Solutions", label_am: "መፍትሄዎች", id: "solutions" },
              { label_en: "Contact", label_am: "ያግኙን", id: "contact" }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToId(link.id, e)}
                className={`transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:origin-left ${
                  isScrolled
                    ? activeSection === link.id
                      ? "text-forest after:scale-x-100 after:bg-forest"
                      : "text-gray-700 hover:text-forest hover:after:scale-x-100 hover:after:bg-forest"
                    : activeSection === link.id
                    ? "text-gold after:scale-x-100 after:bg-gold"
                    : "text-gray-300 hover:text-gold hover:after:scale-x-100 hover:after:bg-gold"
                }`}
              >
                {lang === "en" ? link.label_en : link.label_am}
              </a>
            ))}
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setSelectedInquirySubject("Partnership");
                scrollToId("contact");
              }}
              className={`px-4 py-2 text-[11px] font-bold tracking-widest rounded transition-all duration-300 ${
                isScrolled
                  ? "bg-forest hover:bg-forest-dark text-white shadow-sm"
                  : "bg-gold hover:bg-gold-light text-brand-charcoal"
              }`}
            >
              {lang === "en" ? "ENQUIRE NOW" : "መረጃ ይጠይቁ"}
            </a>
          </nav>

          {/* Mobile Hamburg Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Quick mobile language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "am" : "en")}
              className="text-[10px] font-bold border border-gold/40 text-gold rounded px-2 py-1 select-none"
            >
              {lang === "en" ? "አማ" : "EN"}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              id="mobile-nav-toggle"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? "text-brand-charcoal" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? "text-brand-charcoal" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN OVERLAY MENU */}
      <div
        className={`fixed inset-0 z-30 bg-brand-charcoal/98 flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        id="mobile-nav-panel"
      >
        <div className="absolute top-20 right-4 flex flex-col items-center">
          <span className="text-[9px] font-semibold text-gold tracking-widest uppercase mb-1">
            Greenland Corporate
          </span>
          <div className="h-[1px] w-12 bg-gold/50"></div>
        </div>

        <nav className="flex flex-col gap-6 text-center text-lg font-serif font-medium tracking-wide">
          {[
            { label_en: "Home Base", label_am: "መግቢያ", id: "home" },
            { label_en: "Corporate About", label_am: "ስለ እኛ", id: "about" },
            { label_en: "Agricultural Exports", label_am: "ላኪ ምርቶች", id: "export" },
            { label_en: "Industrial Imports", label_am: "አስመጪ መላዎች", id: "import" },
            { label_en: "Strategic Solutions", label_am: "ስትራቴጂያዊ መፍትሄዎች", id: "solutions" },
            { label_en: "Reach Our Desk", label_am: "የእኛ አድራሻ", id: "contact" }
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToId(link.id, e)}
              className={`hover:text-gold transition-colors block text-2xl py-1 ${
                activeSection === link.id ? "text-gold border-b border-gold/40" : "text-gray-300"
              }`}
            >
              {lang === "en" ? link.label_en : link.label_am}
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <a
              href="tel:+251116638787"
              className="text-xs text-gray-400 hover:text-gold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-gold" />
              <span>+251 11 663 8787</span>
            </a>
            <a
              href="mailto:info@greenlandbg.com"
              className="text-xs text-gray-400 hover:text-gold flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-gold" />
              <span>info@greenlandbg.com</span>
            </a>
          </div>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative h-[calc(100vh-80px)] min-h-[650px] flex flex-col justify-center items-center forest-grid-pattern text-white overflow-hidden px-4"
      >
        {/* Abstract vector visual structure directly drawn on canvas representing global routes */}
        <div className="absolute inset-0 opacity-15 overflow-hidden select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100 200C250 150 500 500 900 350C1300 200 1500 450 1700 400" stroke="#C8972B" strokeWidth="2.5" />
            <path d="M-50 450C350 350 650 600 1100 400" stroke="#1A5C2E" strokeWidth="3" />
            <path stroke="#C8972B" strokeDasharray="5,5" d="M200 100 L1200 700" />
            <path stroke="#1A5C2E" strokeDasharray="10,10" d="M100 650 L1400 150" />
            <circle cx="200" cy="100" r="8" fill="#C8972B" />
            <circle cx="1200" cy="700" r="10" fill="#2D8247" />
            <circle cx="1400" cy="150" r="6" fill="#C8972B" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center z-10 relative flex flex-col justify-center items-center px-4">
          
          {/* Eyebrow with scroll-triggered visual feedback */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in">
            <div className="w-8 h-[1px] bg-gold"></div>
            <span className="text-xs font-sans font-semibold tracking-widest text-[#C8972B] uppercase">
              {lang === "en" ? "ETHIOPIAN ROOTS | GLOBAL OUTPOSTS" : "የኢትዮጵያ ባህል | ዓለም አቀፍ ተደራሽነት"}
            </span>
            <div className="w-8 h-[1px] bg-gold"></div>
          </div>

          <ScrollReveal>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] max-w-3xl">
              {lang === "en" ? (
                <>
                  Connecting Ethiopia <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
                    to Global Markets
                  </span>
                </>
              ) : (
                <>
                  ኢትዮጵያን ከዓለም አቀፍ <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
                    ገበያዎች ጋር ማገናኘት
                  </span>
                </>
              )}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <p className="font-sans text-sm sm:text-lg max-w-2xl text-gray-300 leading-relaxed mb-10">
              {lang === "en"
                ? "Premium agricultural exports and industrial imports — trusted by buyers and suppliers across three continents. Bridging Ethiopian trade with unmatched reliability."
                : "ታማኝ የግብርና ምርቶች ኤክስፖርት እና የኢንዱስትሪ ማሽነሪዎች አስመጪ — በሦስት አህጉራት ባሉ አምራቾችና ገዢዎች የታመነ። የኢትዮጵያን የንግድ መረብ በትጋት እንዘረጋለን።"}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <a
                href="#what-we-do"
                onClick={(e) => scrollToId("what-we-do", e)}
                className="bg-gold hover:bg-gold-light text-brand-charcoal text-xs font-black uppercase tracking-widest px-8 py-4 rounded shadow-lg hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
              >
                {lang === "en" ? "Explore Our Products" : "ምርቶቻችንን ይመልከቱ"}
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToId("contact", e)}
                className="border border-white/40 hover:border-gold hover:text-gold text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded backdrop-blur-sm transition-all w-full sm:w-auto text-center"
              >
                {lang === "en" ? "Contact Us" : "ያግኙን"}
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Floating Quick Stats Bar in Bottom Section */}
        <div className="w-full absolute bottom-8 left-0 px-4 z-10 hidden sm:block">
          <div className="max-w-4xl mx-auto py-5 px-8 rounded bg-[#11140F]/90 border border-[#26351F]/40 backdrop-blur-md flex justify-between items-center text-center shadow-lg">
            {[
              { value: "5", label_en: "PRODUCT SECTOR LINES", label_am: "የምርት መስመሮች" },
              { value: "3+", label_en: "CONTINENTS SERVED", label_am: "አህጉራት ተደራሽ" },
              { value: "Addis Ababa", label_en: "GLOBAL HEADQUARTERS", label_am: "ዋና መሥሪያ ቤት" }
            ].map((stat, idx) => (
              <div key={idx} className="flex-1 px-4 relative last:border-r-0 border-r border-[#26351F]/40">
                <div className="font-serif text-2xl font-bold text-gold">{stat.value}</div>
                <div className="text-[9px] font-sans text-gray-400 tracking-widest uppercase mt-1">
                  {lang === "en" ? stat.label_en : stat.label_am}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll down animated indicator arrow */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 sm:opacity-40 animate-bounce">
          <span className="text-[9px] uppercase tracking-wider text-white">
            {lang === "en" ? "Scroll Down" : "ወደ ታች ይውረዱ"}
          </span>
          <ArrowRight className="w-4 h-4 text-gold rotate-90" />
        </div>
      </section>

      {/* SECTOR OVERVIEW */}
      <section id="what-we-do" className="py-24 px-4 bg-brand-charcoal relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans font-semibold tracking-widest text-gold uppercase inline-block mb-3">
              {lang === "en" ? "DIVISIONS OF OPERATION" : "የስራ ዘርፎች"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === "en" ? "What We Do" : "የምናከናውናቸው ስራዎች"}
            </h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="max-w-xl mx-auto text-gray-400 text-xs sm:text-sm leading-relaxed">
              {lang === "en"
                ? "We align our services with international compliance while ensuring the logistics engine coordinates trade smoothly."
                : "በሀገር ውስጥና በውጭ ሀገር የሚከናወኑ የንግድ ስራዎችን ከዓለም አቀፍ የኮምፕሊያንስ ህጎች ጋር እናስማማለን።"}
            </p>
          </div>

          {/* 5 Icon Cards Responsive Grid with scroll revealing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {sectorCards.slice(0, 3).map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 100}>
                <div className="bg-[#191D1A] rounded p-8 h-full border border-forest/20 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-[#242A25] rounded-lg group-hover:bg-forest/30 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-[9.5px] font-mono tracking-widest text-gold/80 px-2 py-0.5 rounded bg-brand-charcoal/40 border border-gold/10">
                        {lang === "en" ? item.badge.en : item.badge.am}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white mb-3">
                      {lang === "en" ? item.title.en : item.title.am}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {lang === "en" ? item.body.en : item.body.am}
                    </p>
                  </div>

                  <a
                    href={item.id === "seeds" || item.id === "injera" ? "#export" : "#import"}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(item.id === "seeds" || item.id === "injera" ? "export" : "import");
                    }}
                    className="inline-flex items-center gap-1 text-gold text-xs font-semibold hover:text-gold-light mt-auto pt-4"
                  >
                    <span>{lang === "en" ? "Explore specifications" : "ሁኔታዎችን ይመልከቱ"}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl mx-auto">
            {sectorCards.slice(3, 5).map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 150}>
                <div className="bg-[#191D1A] rounded p-8 h-full border border-forest/20 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-[#242A25] rounded-lg group-hover:bg-forest/30 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-[9.5px] font-mono tracking-widest text-gold/80 px-2 py-0.5 rounded bg-brand-charcoal/40 border border-gold/10">
                        {lang === "en" ? item.badge.en : item.badge.am}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white mb-3">
                      {lang === "en" ? item.title.en : item.title.am}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {lang === "en" ? item.body.en : item.body.am}
                    </p>
                  </div>

                  <a
                    href="#import"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId("import");
                    }}
                    className="inline-flex items-center gap-1 text-gold text-xs font-semibold hover:text-gold-light mt-auto pt-4"
                  >
                    <span>{lang === "en" ? "Explore specifications" : "ሁኔታዎችን ይመልከቱ"}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-4 bg-white text-brand-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <span className="text-xs font-sans font-bold tracking-widest text-gold uppercase block mb-3">
                  {lang === "en" ? "WHO WE ARE" : "ስለ እኛ ማንነት"}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">
                  {lang === "en" ? "An Ethiopian Trading Company Built on Trust" : "በታማኝነት ላይ የተመሰረተ የኢትዮጵያ ጠንካራ የንግድ ድርጅት"}
                </h2>
                
                <div className="space-y-4 text-xs sm:text-sm text-gray-750 leading-relaxed font-sans mb-8">
                  <p>
                    {lang === "en"
                      ? "Greenland Business Group is a privately held Ethiopian import and export company dedicated to building high-value trade connections between Ethiopia and the world."
                      : "ግሪንላንድ ቢዝነስ ግሩፕ በኢትዮጵያ እና በሌላው ዓለም መካከል አስተማማኝና ከፍተኛ ጥራት ያለው የንግድ ግንኙነት ለመፍጠር የሚተጋ የግል ኤክስፖርት እና ኢምፖርት ኩባንያ ነው።"}
                  </p>
                  <p>
                    {lang === "en"
                      ? "From sourcing premium agricultural commodities like oilseeds, pulses, and grain products, alongside authentic injera to global buyers — to importing the industrial machinery, cold chain infrastructure, and solar energy solutions that Ethiopia's growing economy demands — we operate with precision, compliance, and long-term partnerships at our core."
                      : "ከሀገር ውስጥ ጥራት ያላቸው የቅባት እህሎችን፣ ልዩ ጥራጥሬዎችን እና ባህላዊ ዘመናዊ የእንጀራ ምርቶችን ለግብይት ከማዘጋጀት ጀምሮ - ለሀገራችን እድገት አስፈላጊ የሆኑ የኢንዱስትሪ ማሽነሪዎችን፣ የቀዝቃዛ መጋዘኖችን እና የሶላር ፓምፖችን በታማኝነት እናስመጣለን።"}
                  </p>
                  <p>
                    {lang === "en"
                      ? "Based in Addis Ababa, we work with verified suppliers and buyers across Europe, the Middle East, Asia, and the Americas."
                      : "ዋና መቀመጫችን አዲስ አበባ ሲሆን፣ በአውሮፓ፣ በመካከለኛው ምስራቅ፣ በእስያና በአሜሪካ ከሚገኙ ታዋቂ ነጋዴዎች ጋር የረጅም ጊዜ አጋርነት መስርተናል።"}
                  </p>
                </div>
              </ScrollReveal>

              {/* Three Core Values Row */}
              <ScrollReveal delay={150}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                  {[
                    {
                      title_en: "Integrity",
                      title_am: "ታማኝነት",
                      desc_en: "Transparent in every transaction and compliance framework.",
                      desc_am: "በእያንዳንዱ የሂሳብና ጭነት እንቅስቃሴ ውስጥ ግልፅ መሆንን እናስቀድማለን።"
                    },
                    {
                      title_en: "Quality",
                      title_am: "ከፍተኛ ጥራት",
                      desc_en: "Rigorous standards checked thoroughly from harvest to dock load.",
                      desc_am: "ከላቦራቶሪ ክትትል ጀምሮ እስከ ጭነቱ መጨረሻ ጥብቅ ጥራት ቁጥጥር።"
                    },
                    {
                      title_en: "Partnership",
                      title_am: "አጋርነት",
                      desc_en: "Committed to establishing long-term, mutually generative trade networks.",
                      desc_am: "ለአንድ ጊዜ ብቻ ሳይሆን የረጅም ጊዜ ዘላቂ ትብብር እንመሰርታለን።"
                    }
                  ].map((val, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="flex items-center gap-1.5 font-bold text-xs text-forest uppercase mb-1">
                        <span className="text-gold">✦</span>
                        <span>{lang === "en" ? val.title_en : val.title_am}</span>
                      </span>
                      <span className="text-gray-500 text-[11px] leading-relaxed">
                        {lang === "en" ? val.desc_en : val.desc_am}
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Abstract Architectural Shape Column with visible card decoration */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal delay={200}>
                <div className="aspect-square bg-forest relative rounded-lg p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                  {/* Background abstract decoration line graph */}
                  <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="0" y1="0" x2="100" y2="100" stroke="#FFF" strokeWidth="1" />
                      <line x1="100" y1="0" x2="0" y2="100" stroke="#FFF" strokeWidth="1" />
                      <circle cx="50" cy="50" r="20" stroke="#FFF" strokeWidth="0.5" fill="none" />
                    </svg>
                  </div>

                  <div className="relative z-10">
                    <div className="text-gold text-5xl font-serif">“</div>
                    <p className="text-white font-serif text-lg sm:text-xl italic leading-relaxed mt-2 pl-4">
                      {lang === "en" 
                        ? "Our mandate is deep, reliable supply-chain bridging. We respect Ethiopian agricultural heritage while servicing international markets with precision."
                        : "የእኛ ታላቅ ግዴታ አስተማማኝ የአቅርቦት ሰንሰለት መዘርጋት ነው። የሀገራችንን ሰብል ባህል እያከበርን ዓለም አቀፉን ዘርፍ በትጋት እናገለግላለን።"}
                    </p>
                  </div>

                  <div className="relative z-10 flex justify-between items-end border-t border-white/20 pt-6">
                    <div>
                      <div className="text-white text-xs font-bold tracking-widest uppercase">
                        {lang === "en" ? "Addis Ababa Head Office" : "አዲስ አበባ ዋና ቢሮ"}
                      </div>
                      <div className="text-gold text-[10px] uppercase font-sans mt-0.5">
                        {lang === "en" ? "Greenland Management Board" : "የዳይሬክተሮች ቦርድ"}
                      </div>
                    </div>
                    <Globe className="w-8 h-8 text-gold/60" />
                  </div>
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* EXPORT PRODUCTS DEEP DIVE */}
      <section id="export" className="py-24 px-4 bg-forest-dark text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans font-semibold tracking-widest text-gold uppercase inline-block mb-3">
              {lang === "en" ? "OUTWARD AGRICULTURAL EXPORTS" : "የግብርና ምርቶች ኤክስፖርት"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              {lang === "en" ? "Export Products" : "ወደ ውጭ የምንልካቸው ምርቶች"}
            </h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="max-w-xl mx-auto text-gray-300 text-xs sm:text-sm leading-relaxed">
              {lang === "en"
                ? "We clean, sort, pass and package high-value agricultural commodities according to international phytosanitary specs."
                : "ታዋቂ የኢትዮጵያ ምርቶችን በጥራት አጽድተን፣ አሽገን ለዓለም አቀፍ የጤና ጥበቃ መስፈርት በሚመጥን መልኩ እናቀርባለን።"}
            </p>
          </div>

          {/* Two large cards side-by-side with scroll anim */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {exportItems.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 150}>
                <div className="bg-[#12311A] border-l-4 border-gold rounded-r-lg p-8 lg:p-10 h-full shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-sans font-extrabold tracking-widest text-gold uppercase bg-[#184223] px-3 py-1 rounded">
                        {lang === "en" ? "GREENLAND COMMODITY" : "ግሪንላንድ ምርጥ ምርቶች"}
                      </span>
                      <span className="font-sans text-xs text-gold font-medium px-2 py-0.5 border border-gold/30 rounded bg-forest/20">
                        {item.title.am}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-2">
                      {lang === "en" ? item.title.en : item.title.am}
                    </h3>
                    <p className="text-xs font-sans text-gold-light italic mb-6">
                      "{lang === "en" ? item.intro.en : item.intro.am}"
                    </p>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8">
                      {lang === "en" ? item.description.en : item.description.am}
                    </p>

                    {/* Specification Table */}
                    <div className="border-t border-white/10 pt-6 mb-8">
                      <h4 className="text-[10px] font-sans font-bold tracking-widest text-gold uppercase mb-4">
                        {lang === "en" ? "LOGISTICS & SPECIFICATIONS FRAMEWORK" : "የሎጂስቲክስ እና ዝርዝር መግለጫ መዋቅር"}
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {item.specs.map((spec, specIdx) => (
                          <div key={specIdx} className="border-b border-white/5 pb-2">
                            <span className="text-[10px] font-mono text-gray-400 block uppercase">
                              {lang === "en" ? spec.label.en : spec.label.am}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-white">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certified bullet features */}
                    <div className="mb-8">
                      <h4 className="text-[10px] font-sans font-bold tracking-widest text-[#E0B252] uppercase mb-3">
                        {lang === "en" ? "Core Value Features:" : "ዋና ዋና ጥቅሞች:"}
                      </h4>
                      <ul className="space-y-2.5">
                        {item.features.map((feat, featIdx) => (
                          <li key={featIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                            <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                            <span>{lang === "en" ? feat.en : feat.am}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={(e) => triggerEnquiry("Export Inquiry", lang === "en" ? item.title.en : item.title.am, e)}
                    className="bg-gold hover:bg-gold-light text-brand-charcoal text-xs font-black uppercase tracking-widest py-4 px-6 rounded transition-all duration-300 w-full text-center shadow-md flex items-center justify-center gap-1 hover:scale-[1.02]"
                  >
                    <span>{lang === "en" ? "Enquire Now" : "መረጃ ይጠይቁ"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPONENT: GLOBAL TRADE & LOGISTICS CALCULATOR */}
      <section className="py-20 px-4 bg-[#111411] text-white border-y border-forest-light/10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1 text-[10px] font-black tracking-widest text-gold uppercase bg-forest/20 py-1.5 px-3 rounded-full border border-gold/20 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>{lang === "en" ? "DIGITAL COMMERCE SYSTEM" : "ዲጂታል የንግድ ሲስተም"}</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {lang === "en" ? "Logistics Route & Transit Calculator" : "የማጓጓዣ መስመር እና ፍጥነት ማስያ"}
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              {lang === "en" 
                ? "Simulate freight routes, custom safety clearances, temperature parameters, and estimate timings to your destination harbor."
                : "ወደ እርሶ ሀገር የሚላክበትን መንገድ፣ የመተላለፊያ ዕቃ አቀዝቃዛ ሁኔታዎችን እና የቀናት መጠን እዚህ ያቅዱ።"}
            </p>
          </div>

          <div className="bg-[#191D1A] rounded-lg border border-forest/30 overflow-hidden shadow-2xl p-6 sm:p-10">
            <form onSubmit={calculateLogistics} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              
              {/* Region */}
              <div>
                <label className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-2">
                  1. Destination Continent
                </label>
                <select
                  value={calcRegion}
                  onChange={(e) => setCalcRegion(e.target.value)}
                  className="w-full bg-[#111411] border border-forest/40 rounded p-3 text-xs text-gray-200 focus:border-gold outline-none"
                >
                  <option value="europe">Western Europe (Germany, France, UK)</option>
                  <option value="north_america">North America (USA, Canada)</option>
                  <option value="middle_east">Middle East & Gulf (Saudi, UAE, Kuwait)</option>
                  <option value="asia">Asia-Pacific (Japan, Singapore, China)</option>
                </select>
              </div>

              {/* Product */}
              <div>
                <label className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-2">
                  2. Commodity Type
                </label>
                <select
                  value={calcProduct}
                  onChange={(e) => setCalcProduct(e.target.value)}
                  className="w-full bg-[#111411] border border-forest/40 rounded p-3 text-xs text-gray-200 focus:border-gold outline-none"
                >
                  <option value="seeds">Premium Oilseeds & Grains</option>
                  <option value="injera">Cryo-Frozen Teff Injera</option>
                </select>
              </div>

              {/* Volume */}
              <div>
                <label className="text-[10px] font-bold text-gold uppercase tracking-wider block mb-2">
                  3. Consignment Volume
                </label>
                <select
                  value={calcVolume}
                  onChange={(e) => setCalcVolume(e.target.value)}
                  className="w-full bg-[#111411] border border-forest/40 rounded p-3 text-xs text-gray-200 focus:border-gold outline-none"
                >
                  <option value="20ft">20ft Full Container (FCL)</option>
                  <option value="40ft">40ft Full Container (FCL)</option>
                  <option value="air">Fast Airway Freight Pallet</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full bg-forest hover:bg-forest-light text-white text-xs font-bold uppercase tracking-widest py-3.5 rounded transition-all duration-300 border border-gold/30"
                >
                  {lang === "en" ? "Analyze Logistic Framework" : "የማጓጓዣ ማዕቀፉን ይተንትኑ"}
                </button>
              </div>

            </form>

            {/* Results Display */}
            {calcResult ? (
              <div className="bg-[#111411] border-l-4 border-gold rounded p-6 space-y-4 animate-fade-in relative z-10">
                <div className="flex justify-between items-center border-b border-forest/20 pb-2">
                  <span className="text-[10px] font-bold tracking-widest text-gold uppercase">
                    ESTIMATED COMPLIANT EXPORT ROUTING
                  </span>
                  <span className="text-xs text-emerald-400 font-bold font-mono">FOB / CIF Available</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Expected Transit Time:</span>
                    <strong className="text-white text-sm">{calcResult.transitDays}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px] uppercase">Recommended Storage Temp:</span>
                    <strong className="text-white text-sm">{calcResult.temperature}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-400 block text-[10px] uppercase">Logistical Path Routing:</span>
                    <strong className="text-gold text-sm">{calcResult.route}</strong>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-400 block text-[10px] uppercase">International Certifications Enclosed:</span>
                    <span className="text-gray-300 text-xs block">{calcResult.certificate}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-forest/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-[11px] text-gray-400">
                    {lang === "en" 
                      ? "Would you like to import this specific simulated volume?" 
                      : "ይህን የተሰላውን መጠን ወደ እርስዎ ሀገር ማስገባት ይፈልጋሉ?"}
                  </p>
                  <button
                    onClick={applyCalcToForm}
                    className="bg-gold hover:bg-gold-light text-brand-charcoal text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded transition-all duration-300 hover:scale-[1.02]"
                  >
                    {lang === "en" ? "Apply to Inquiry Form" : "በመጠይቅ ፎርሙ ላይ ተግብር"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-forest/40 rounded p-6 text-center text-xs text-gray-400 flex flex-col items-center justify-center gap-2">
                <Compass className="w-8 h-8 text-gold/30 animate-spin" style={{ animationDuration: '8s' }} />
                <span>{lang === "en" ? "Awaiting parameter inputs. Click button to estimate trade logistics." : "መረጃ ያስገቡ እና ይጫኑ።"}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* IMPORT SOLUTIONS DEEP DIVE */}
      <section id="import" className="py-24 px-4 bg-white text-brand-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans font-bold tracking-widest text-gold uppercase inline-block mb-3">
              {lang === "en" ? "INWARD INDUSTRIAL & SOLAR SOLUTIONS" : "ከውጭ የሚገቡ የኢንዱስትሪ እና የሶላር መፍትሄዎች"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">
              {lang === "en" ? "Import Solutions" : "የማስመጣት መፍትሄዎች"}
            </h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="max-w-xl mx-auto text-gray-600 text-xs sm:text-sm leading-relaxed">
              {lang === "en"
                ? "Importing heavy systems, solar solutions, and precision-engineered cold storage hardware directly to developers and organizations in Ethiopia."
                : "ከፍተኛ ጥራት ያላቸውን የኢንዱስትሪ ማሽኖችን፣ የሶላር የውሃ ፓምፖችን እና የቀዝቃዛ ክፍል ዕቃዎችን በቀጥታ አስመጥተን እንተክላለን።"}
            </p>
          </div>

          {/* Three cards layout with scroll revealing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {importItems.map((item, idx) => (
              <ScrollReveal key={item.id} delay={idx * 150}>
                <div className="bg-brand-gray border border-gray-200 hover:border-gold rounded p-8 h-full flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-forest font-bold bg-forest/5 border border-forest/15 px-2.5 py-1 rounded inline-block mb-4">
                      {lang === "en" ? `SOLUTIONS DIVISION 0${idx + 1}` : `መለኪያ 0${idx + 1}`}
                    </span>
                    
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-2">
                      {lang === "en" ? item.title.en : item.title.am}
                    </h3>
                    
                    <p className="text-xs text-gray-500 italic mb-4">
                      "{lang === "en" ? item.intro.en : item.intro.am}"
                    </p>

                    <p className="text-gray-750 text-xs sm:text-sm leading-relaxed mb-6">
                      {lang === "en" ? item.description.en : item.description.am}
                    </p>

                    {/* Component specification blocks */}
                    <div className="space-y-3 mb-6 bg-white/65 p-4 border border-gray-150 rounded">
                      {item.specs.map((spec, specIdx) => (
                        <div key={specIdx} className="text-xs">
                          <span className="text-[10px] font-bold text-gray-400 block uppercase">
                            {lang === "en" ? spec.label.en : spec.label.am}
                          </span>
                          <span className="font-medium text-gray-800">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {item.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="text-[10px] font-semibold text-forest-dark bg-forest/10 px-2 py-0.5 rounded"
                        >
                          {lang === "en" ? tag.en : tag.am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={(e) => triggerEnquiry("Import Inquiry", lang === "en" ? item.title.en : item.title.am, e)}
                    className="border border-forest hover:bg-forest hover:text-white text-forest text-xs font-extrabold uppercase tracking-widest py-3.5 px-4 rounded transition-all duration-300 w-full text-center flex items-center justify-center gap-1"
                  >
                    <span>{lang === "en" ? "Request Import Terms" : "የገቢ ዕቃዎችን ማብራሪያ ጠይቅ"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (STRATEGIC STRENGTHS) */}
      <section id="solutions" className="py-24 px-4 bg-brand-gray text-brand-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans font-bold tracking-widest text-gold uppercase inline-block mb-3">
              {lang === "en" ? "STRATEGIC COMPETITIVE STRENGTHS" : "የኩባንያው ጥንካሬዎች"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">
              {lang === "en" ? "Why Trade with Greenland" : "ለምን ግሪንላንድን ይመርጣሉ?"}
            </h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="max-w-xl mx-auto text-gray-550 text-xs sm:text-sm leading-relaxed">
              {lang === "en"
                ? "We leverage reliable logistics execution, strict trade document handling, and localized agricultural quality checking."
                : "ታማኝ ሎጂስቲክስ፣ ህጋዊ የሰነድ ክሊራንስ እና የኢትዮጵያ ምርቶች ጥራት ላይ ዋስትና እንሰጣለን።"}
            </p>
          </div>

          {/* 2x2 Grid with scroll revealing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-5xl mx-auto">
            {[
              {
                icon: <Globe className="w-7 h-7 text-gold" />,
                title_en: "Global Commerce Networks",
                title_am: "ዓለም አቀፍ የንግድ መረብ",
                desc_en: "We run deeply established partner collaborations containing top commodity buyers and capital systems across Germany, Japan, UAE, and standard global diaspora channels.",
                desc_am: "በጀርመን፣ ጃፓን፣ ዱባይና በዓለም ዙሪያ ካሉ የኢትዮጵያ ዳያስፖራዎች ጋር ጠንካራ የገበያ ትስስር ፈጥረናል።"
              },
              {
                icon: <ShieldCheck className="w-7 h-7 text-gold" />,
                title_en: "Frictionless Trade Compliance",
                title_am: "ሙሉ ህጋዊ የንግድ ማዕቀፍ",
                desc_en: "All shipping processes and export-import actions strictly pass the Ethiopian Standards Agency, national central banks, and targeted custom phytosanitary frameworks.",
                desc_am: "የምናስመጣቸውና የምንልካቸው ምርቶች ሁሉ በኢትዮጵያ ደረጃዎች ባለስልጣን እና በብሔራዊ ባንክ መመሪያዎች የታመኑ ናቸው።"
              },
              {
                icon: <Cpu className="w-7 h-7 text-gold" />,
                title_en: "End-to-End Logistical Execution",
                title_am: "የተሟላ የሎጂስቲክስ ዝግጅት",
                desc_en: "From farmgate processing in Ethiopian highlands, cold packaging networks, phytosanitary clearance checks, up to direct destination delivery, we lead the chain.",
                desc_am: "የተፈጥሮ ሰብሎችን ከእርሻ በማምጣት እስከ መጨረሻው የባህር ማዶ ገዢ ድረስ በራሳችን ሎጂስቲክስ እንልካለን።"
              },
              {
                icon: <Award className="w-7 h-7 text-gold" />,
                title_en: "Informed Ethiopian Agency",
                title_am: "የአካባቢ ጠንካራ እውቀት",
                desc_en: "Based deeply out of Addis Ababa with strong regional networks. We understand local regulations, trade routes, banking systems, and agricultural potentials perfectly.",
                desc_am: "ዋና መቀመጫችን በአዲስ አበባ መሆኑ የአገራችንን የንግድና የባንክ መዋቅር ጠልቀን እንድንረዳ ያግዘናል።"
              }
            ].map((feature, idx) => (
              <ScrollReveal key={idx} delay={idx * 150}>
                <div className="bg-white border border-gray-150 p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4 h-full">
                  <div className="p-3 bg-[#1A5C2E]/5 rounded-lg border border-[#1A5C2E]/10 shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-forest mb-2">
                      {lang === "en" ? feature.title_en : feature.title_am}
                    </h3>
                    <p className="text-gray-650 text-xs sm:text-sm leading-relaxed">
                      {lang === "en" ? feature.desc_en : feature.desc_am}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Interactive Core Network Node Map */}
          <ScrollReveal delay={200}>
            <div className="mt-20 border border-gray-200 bg-white rounded-lg p-8 max-w-4xl mx-auto relative overflow-hidden shadow-sm">
              <h3 className="font-serif text-lg font-bold text-forest text-center mb-6">
                {lang === "en" ? "Greenland Business Group Network Core" : "የግሪንላንድ ቢዝነስ ግሩፕ የንግድ መስመር ካርታ"}
              </h3>
              <div className="w-[100%] h-48 bg-brand-charcoal rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-25">
                  <svg className="w-full h-full" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 400 100 Q 150 50 100 80" stroke="#C8972B" strokeWidth="2" strokeDasharray="3,3" />
                    <path d="M 400 100 Q 250 150 200 40" stroke="#C8972B" strokeWidth="2" strokeDasharray="3,3" />
                    <path d="M 400 100 Q 550 40 650 60" stroke="#C8972B" strokeWidth="2" strokeDasharray="3,3" />
                    <path d="M 400 100 Q 600 160 700 120" stroke="#C8972B" strokeWidth="2" strokeDasharray="3,3" />
                    <path d="M 400 100 Q 500 50 480 30" stroke="#1A5C2E" strokeWidth="2.5" />
                  </svg>
                </div>

                {/* Glowing Hub anchor dots */}
                <div className="absolute left-[50%] top-[40%] text-center">
                  <div className="w-4 h-4 bg-gold rounded-full animate-ping absolute -left-1 -top-1 opacity-75"></div>
                  <div className="w-2.5 h-2.5 bg-gold rounded-full relative z-10 border border-brand-charcoal"></div>
                  <span className="text-[10px] text-white block mt-2 font-black tracking-widest font-mono uppercase bg-forest/80 px-1.5 py-0.5 rounded border border-gold/30">
                    {lang === "en" ? "ADDIS ABABA (HUB)" : "አዲስ አበባ (መቀመጫ)"}
                  </span>
                </div>

                {/* Destination nodes */}
                <div className="absolute left-[12%] top-[35%] flex flex-col items-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-[9px] text-[#A5771A] font-bold tracking-wider font-mono uppercase mt-1">North America</span>
                </div>

                <div className="absolute left-[24%] top-[15%] flex flex-col items-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-[9px] text-[#A5771A] font-bold tracking-wider font-mono uppercase mt-1">Europe</span>
                </div>

                <div className="absolute right-[16%] top-[25%] flex flex-col items-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-[9px] text-[#A5771A] font-bold tracking-wider font-mono uppercase mt-1">Middle East</span>
                </div>

                <div className="absolute right-[8%] top-[55%] flex flex-col items-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span className="text-[9px] text-[#A5771A] font-bold tracking-wider font-mono uppercase mt-1">Asia-Pacific</span>
                </div>
              </div>
              <p className="text-center text-[11px] text-gray-500 font-sans mt-4">
                {lang === "en" 
                  ? "Consistently clearing logistics routes between our domestic storage depots and global destination harbors."
                  : "በሀገር ውስጥ ዘመናዊ መጋዘኖቻችን እና በተቀባይ ወደቦች መካከል ያለውን የጭነት መስመር በየቀኑ እናጸዳለን።"}
              </p>
            </div>
          </ScrollReveal>

          {/* INTERACTIVE EXPANSION COMPONENT: CERTIFICATIONS VIEWER DRAWER */}
          <ScrollReveal delay={150}>
            <div className="mt-8 bg-white border border-gray-150 rounded-lg p-6 max-w-4xl mx-auto shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-forest">
                    {lang === "en" ? "Verify Greenland Global Certifications" : "የግሪንላንድ የጥራት ምስክር ወረቀቶች"}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {lang === "en" ? "Click any verified certification seal to view compliance standards and references." : "መስፈርቶቹን ለማየት ከታች ያሉትን የዕፅዋትና ማሽን ማስረጃዎች ይጫኑ።"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded inline-flex items-center gap-1">
                    <Check className="w-3 h-3" /> ISO 9001:2015 Approved
                  </span>
                </div>
              </div>

              {/* Grid of Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    id: "phytosanitary",
                    title: "Phytosanitary Safety",
                    authority: "Ethiopian Ministry of Agriculture",
                    framework: "Zero-fumigation chemical trace, 100% natural highland protection indices. Meets EFSA (European Food Safety Authority) thresholds."
                  },
                  {
                    id: "standards",
                    title: "Industrial Standards",
                    authority: "Ethiopian Standards Agency (ESA)",
                    framework: "Certified machinery import guidelines, electric transformer safety grids, solar pump multi-stage pressure checks."
                  },
                  {
                    id: "chamber",
                    title: "Chamber Registry",
                    authority: "Addis Ababa Chamber of Commerce",
                    framework: "Active verified gold exporter register. Long-standing international financial letter-of-credit security clearances."
                  }
                ].map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => setActiveCert(activeCert === cert.id ? null : cert.id)}
                    className={`p-4 rounded border text-left transition-all ${
                      activeCert === cert.id ? "border-gold bg-forest/5 shadow-inner" : "border-gray-250 bg-brand-gray hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-serif text-sm font-bold text-forest">{cert.title}</span>
                      <BookOpen className={`w-4 h-4 text-gold ${activeCert === cert.id ? "opacity-100" : "opacity-40"}`} />
                    </div>
                    <span className="text-[10px] font-bold block text-[#A5771A] mb-1">{cert.authority}</span>
                    <span className="text-[10px] text-gray-500 line-clamp-1">View target standards</span>

                    {/* Expandable framework block inside button */}
                    {activeCert === cert.id && (
                      <div className="mt-3 pt-3 border-t border-gold/20 text-[11px] text-gray-700 leading-normal animate-fade-in">
                        <p>{cert.framework}</p>
                        <span className="text-[9px] text-forest font-bold inline-flex items-center gap-0.5 mt-2">
                          Verified Official Record <Check className="w-3 h-3 text-gold" />
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" ref={contactSectionRef} className="py-24 px-4 bg-white text-brand-charcoal">
        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden shadow-2xl border border-gray-150">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left dark green panel */}
            <div className="lg:col-span-5 bg-forest-dark text-white p-10 flex flex-col justify-between relative">
              <div>
                <span className="text-xs font-sans font-bold tracking-widest text-[#E0B252] uppercase block mb-2">
                  {lang === "en" ? "COMMUNICATE WITH US" : "ቀጥታ የንግድ ግንኙነት"}
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mb-6">
                  {lang === "en" ? "Get In Touch" : "እኛን ያግኙን"}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8">
                  {lang === "en"
                    ? "Whether you are an international buyer, machinery importer, investor, or logistics transport partner — we want to hear from you. Enter your details to coordinate terms."
                    : "የውጭ ሀገር ገዢ፣ አስመጪ፣ አልሚ ባለሀብት ወይም የሎጂስቲክስ አጋር ከሆኑ እባክዎን ከታች ያለውን ፎርም በመጠቀም ዝርዝርዎን ይላኩልን።"}
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gold font-bold">{lang === "en" ? "HQ LOCATION" : "ቢሮአችን"}</h4>
                      <p className="text-xs text-gray-200 leading-relaxed">
                        Bole Grace Plaza, Room 302,<br />
                        Bole, Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gold font-bold">{lang === "en" ? "TELEPHONE DIRECT LINE" : "የስልክ መስመር"}</h4>
                      <p className="text-xs text-gray-200">+251 11 663 8787</p>
                      <p className="text-xs text-gray-400 mt-0.5">+251 91 123 4567 (International desk)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gold font-bold">{lang === "en" ? "ELECTRONIC MAIL" : "ኢሜል አድራሻ"}</h4>
                      <p className="text-xs text-gray-200">info@greenlandbg.com</p>
                      <p className="text-xs text-gray-400">trade@greenlandbg.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gold font-bold">{lang === "en" ? "DESK WORKING HOURS" : "አገልግሎት ሰዓታት"}</h4>
                      <p className="text-xs text-gray-200">Mon–Fri: 8:00 AM – 6:00 PM EAT</p>
                      <p className="text-xs text-gray-400">Saturday: By Prior Appointment Only</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/15 pt-8 mt-12 text-center lg:text-left">
                <span className="text-[10px] tracking-widest text-[#E0B252] font-semibold uppercase">
                  Greenland Business Group
                </span>
                <p className="text-[9px] text-gray-400 mt-1">
                  Coordinating regional commodities since 2011.
                </p>
              </div>
            </div>

            {/* Right clean contact form */}
            <div className="lg:col-span-7 p-10 bg-brand-gray relative">
              {formSubmitted ? (
                /* Interactive Success transmission overlay */
                <div className="h-full flex flex-col justify-center items-center text-center py-12 animate-fade-in" id="form-success-overlay">
                  <div className="w-16 h-16 bg-[#1A5C2E]/10 rounded-full border border-gold flex items-center justify-center mb-6 animate-pulse">
                    <Check className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-forest mb-2">
                    {lang === "en" ? "Transmission Initiated" : "ፎርሙ ተዘጋጅቷል"}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
                    {lang === "en"
                      ? `Thank you, ${formData.fullName}. Your corporate inquiry regarding ${formData.subject} has been structured into your email client.`
                      : `እናመሰግናለን ${formData.fullName}፣ ስለ ${formData.subject} የያዙት መጠይቅ ተዘጋጅቶ በኢሜል መላኪያዎ በኩል ለመላክ ዝግጁ ሆኗል።`}
                  </p>
                  
                  {/* Summary receipt box */}
                  <div className="w-full bg-white border border-gray-200 rounded p-5 text-left mb-8 max-w-md text-xs space-y-2">
                    <div className="border-b border-gray-100 pb-2 mb-2 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                      INQUIRY SLIP RECEIPT
                    </div>
                    <div><span className="text-gray-400">FullName:</span> {formData.fullName}</div>
                    <div><span className="text-gray-400">Organization:</span> {formData.companyName || "Personal Buyer"}</div>
                    <div><span className="text-gray-400">Email:</span> {formData.email}</div>
                    <div><span className="text-gray-400">Contact Phone:</span> {formData.phone || "None Listed"}</div>
                    <div><span className="text-gray-400">Target Line:</span> <span className="text-forest font-semibold">{formData.subject}</span></div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="bg-forest hover:bg-forest-light text-white text-xs font-bold tracking-widest uppercase py-3.5 px-6 rounded transition-all shadow"
                  >
                    {lang === "en" ? "Send Another Message" : "ሌላ መልክት ላክ"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5" id="inquiry-form">
                  <div className="border-b border-gray-200 pb-2 mb-4">
                    <h4 className="text-xs font-semibold text-forest uppercase tracking-widest">
                      {lang === "en" ? "DIGITAL REQUISITION LOG" : "ዲጂታል መጠይቅ ማዕከል"}
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {lang === "en"
                        ? "Submit trade requirements below. Our desk responds within 24 business hours."
                        : "እባክዎን ከታች ጠቃሚ መረጃዎችን ያስገቡ። በ24 ሰዓታት ውስጥ ምላሽ እንሰጣለን።"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-600 block uppercase mb-1">
                        {lang === "en" ? "Full Name *" : "ሙሉ ስም *"}
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g. Haile Melaku"
                        className="w-full bg-white border border-gray-250 rounded px-4 py-3 text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none text-brand-charcoal"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-600 block uppercase mb-1">
                        {lang === "en" ? "Company Name" : "የድርጅት ስም"}
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Company Ltd."
                        className="w-full bg-white border border-gray-250 rounded px-4 py-3 text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none text-brand-charcoal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-600 block uppercase mb-1">
                        {lang === "en" ? "Email Address *" : "ኢሜል አድራሻ *"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="haile@example.com"
                        className="w-full bg-white border border-gray-250 rounded px-4 py-3 text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none text-brand-charcoal"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-600 block uppercase mb-1">
                        {lang === "en" ? "Phone Number" : "ስልክ ቁጥር"}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+251 XX XXX XXXX"
                        className="w-full bg-white border border-gray-250 rounded px-4 py-3 text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none text-[#1b1c1b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-600 block uppercase mb-1">
                      {lang === "en" ? "Inquiry Matter *" : "የመጠይቅ አርዕስት *"}
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-250 rounded px-4 py-3 text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none text-[#1b1c1b] appearance-none"
                      >
                        <option value="Export Inquiry">Export Inquiry — Premium Oilseeds & Grains / Teff Injera</option>
                        <option value="Import Inquiry">Import Inquiry — Machinery & Solar Pumps</option>
                        <option value="Partnership">Corporate Partnership Desks</option>
                        <option value="Other">General Corporate Support / Logistics</option>
                      </select>
                      {/* Custom dropdown indicator block */}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-550 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-600 block uppercase mb-1">
                      {lang === "en" ? "Inquiry Specification Message *" : "ዝርዝር መልእክት *"}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder={
                        lang === "en"
                          ? "Please specify any requirements regarding destination ports, trade volume, temperature indicators, or timing constraints."
                          : "እባክዎን ማሸጊያዎችን፣ የጭነት ወደቦችን ወይም የናሙና ጥያቄ መስፈርቶችን እዚህ ያብራሩ።"
                      }
                      className="w-full bg-white border border-gray-250 rounded px-4 py-3 text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none text-[#1b1c1b]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-brand-charcoal text-xs font-black uppercase tracking-widest py-4 rounded transition-all duration-300 shadow hover:shadow-gold/10"
                  >
                    {lang === "en" ? "Send Trade Inquiry" : "የንግድ መጠይቁን ላክ"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0c120d] text-white border-t border-forest/30">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Col 1 Brand logo + text */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <a href="#home" onClick={(e) => scrollToId("home", e)} className="flex flex-col mb-4 cursor-pointer">
                  <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none">
                    GREENLAND
                  </span>
                  <span className="text-[9px] font-sans font-bold tracking-[0.25em] text-gold mt-1">
                    BUSINESS GROUP
                  </span>
                </a>
                <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
                  {lang === "en"
                    ? "Connecting premium Ethiopian agricultural exports and custom industrial machinery lines smoothly across target hubs in Europe, Asia, and North America."
                    : "ከፍተኛ ጥራት ያላቸውን የግብርና ሰብል ኤክስፖርት ምርቶችን ከባህር ማዶ ማሽነሪ እና ሶላር ፓምፕ አስመጪ መስመሮች ጋር ፍጹም በሆነ መልኩ እናገናኛለን።"}
                </p>
              </div>
              <div className="mt-8 text-[11px] text-gray-500">
                <p>© 2025 Greenland Business Group. Addis Ababa, Ethiopia.</p>
                <p className="mt-1 text-[9px] text-[#C8972B]/60 tracking-wider">REGISTRATION NO: KK/AA/14/2223/2003</p>
              </div>
            </div>

            {/* Col 2 Quick Links */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-sans font-bold tracking-widest text-gold uppercase mb-5">
                {lang === "en" ? "CORPORATE NAVIGATION" : "የስራ ገጾች ዳሰሳ"}
              </h4>
              <ul className="space-y-2.5 text-xs">
                {[
                  { label_en: "Home Base", label_am: "መነሻ ገጽ", id: "home" },
                  { label_en: "Who We Are", label_am: "ስለ እኛ", id: "about" },
                  { label_en: "Export Products", label_am: "የኤክስፖርት ምርቶች", id: "export" },
                  { label_en: "Import Solutions", label_am: "የማስመጣት መፍትሄዎች", id: "import" },
                  { label_en: "Trade Strengths", label_am: "የስራ ጥንካሬዎች", id: "solutions" },
                  { label_en: "Submit Requisition", label_am: "ያግኙን", id: "contact" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => scrollToId(link.id, e)}
                      className="text-gray-400 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 text-gold/60 group-hover:translate-x-0.5 transition-transform" />
                      <span>{lang === "en" ? link.label_en : link.label_am}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 Contact details & socials */}
            <div className="md:col-span-4 select-all">
              <h4 className="text-xs font-sans font-bold tracking-widest text-gold uppercase mb-5">
                {lang === "en" ? "HEAD OFFICE CONNECT" : "የዋናው መስሪያ ቤት አድራሻ"}
              </h4>
              <ul className="space-y-3.5 text-xs text-gray-400 font-sans">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Bole Grace Plaza, Room 302, Addis Ababa, Ethiopia</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <span>+251 11 663 8787 / +251 91 123 4567</span>
                </li>
                <li className="flex items-center gap-2 font-mono">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <span>info@greenlandbg.com</span>
                </li>
              </ul>

              {/* Social Channels */}
              <div className="mt-6">
                <div className="text-[10px] font-sans font-semibold tracking-wider text-gold/70 uppercase mb-3">
                  {lang === "en" ? "STAY IN TOUCH" : "የማህበራዊ ሚዲያ ሰርጦች"}
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer referrer"
                    className="p-2 bg-[#1A251B] text-gray-300 hover:text-gold hover:bg-[#203122] rounded transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer referrer"
                    className="p-2 bg-[#1A251B] text-gray-300 hover:text-gold hover:bg-[#203122] rounded transition-colors"
                    aria-label="Facebook Page"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Gold divider bar with copyright */}
          <div className="mt-16 pt-8 border-t border-[#A5771A]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-400">
            <div>
              <span>{lang === "en" ? "Bridging Ethiopian agricultural and industrial excellence globally." : "የኢትዮጵያን የግብርና እና የኢንዱስትሪ ልህቀት በታማኝነት ለዓለም ማቅረብ።"}</span>
            </div>
            <div className="flex gap-4">
              <a href="#about" onClick={(e) => scrollToId("about", e)} className="hover:text-gold transition-colors">{lang === "en" ? "Compliance Frameworks" : "የህግ ማዕቀፎች"}</a>
              <span>·</span>
              <a href="#contact" onClick={(e) => scrollToId("contact", e)} className="hover:text-gold transition-colors">{lang === "en" ? "Port Terminals" : "የመርከብ ወደቦች"}</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
