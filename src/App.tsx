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
  ArrowUpRight
} from "lucide-react";

// Types for structural safety
interface Stat {
  label: string;
  value: string;
}

interface SectorCard {
  id: string;
  title: string;
  amharicTitle?: string;
  icon: React.ReactNode;
  body: string;
  badge: string;
}

interface ExportItem {
  id: string;
  title: string;
  amharicTitle?: string;
  intro: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
}

interface ImportItem {
  id: string;
  title: string;
  intro: string;
  description: string;
  tags: string[];
  specs: { label: string; value: string }[];
}

export default function App() {
  // Navigation & UI States
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

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
    setFormData((prev) => ({
      ...prev,
      subject: subject,
      message: `Dear Greenland Business Group International Trade Team,\n\nWe are highly interested in acquiring information, specifications, and pricing terms regarding your product line: "${productName}". Please send us your current catalog, phytosanitary/industrial quality frameworks, minimum order quantities (MOQ), and trade compliance terms.\n\nBest regards,`
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

  // Business Lines Data
  const sectorCards: SectorCard[] = [
    {
      id: "seeds",
      title: "Seeds & Tiratere",
      amharicTitle: "ቲራቴሬ",
      icon: <Wheat className="w-6 h-6 text-gold" />,
      body: "We export premium Ethiopian agricultural seeds including mustard seed – thoroughly cleaned, graded, and certified for international buyers in Europe, the Gulf, and Asia.",
      badge: "AGRI EXPORT"
    },
    {
      id: "injera",
      title: "Injera Export",
      amharicTitle: "እንጀራ",
      icon: <Layers className="w-6 h-6 text-gold animate-pulse" />,
      body: "Authentic teff injera – in both frozen and dehydrated formats – supplying Ethiopian diaspora markets and premier global food retailers across three continents.",
      badge: "SPECIALTY COLD-PROOF"
    },
    {
      id: "machinery",
      title: "Machinery & Electrical",
      icon: <Cpu className="w-6 h-6 text-gold" />,
      body: "Importing state-of-the-art industrial, agricultural processing tools, and heavy electrical components from certified manufacturers across Germany, China, and the UAE.",
      badge: "HEAVY INDUSTRIES"
    },
    {
      id: "cold-chain",
      title: "Cold Chain Solutions",
      icon: <Snowflake className="w-6 h-6 text-gold" />,
      body: "Providing advanced cold storage facility configurations, climate-controlled reefers, and comprehensive logistics to enable perishables and floricultural shipping.",
      badge: "SUPPLY CHAIN"
    },
    {
      id: "solar-pumps",
      title: "Heavy Duty Solar Pumps",
      icon: <Sun className="w-6 h-6 text-gold" />,
      body: "High-yield, fuel-free solar-powered pumps ranging from 5HP to over 100HP+, engineered specifically to support Ethiopia's agricultural irrigators and off-grid setups.",
      badge: "SOLAR ECOSYSTEMS"
    }
  ];

  // Deep dive product exports
  const exportItems: ExportItem[] = [
    {
      id: "seeds-tiratere",
      title: "Premium Seeds & Tiratere",
      amharicTitle: "የኢትዮጵያ ቲራቴሬ",
      intro: "Harvested from the pure volcanic highlands of Gojjam, Gondar, and Wollo.",
      description: "Ethiopia stands as one of the world's most pristine gene-pools for high-oil agricultural commodities. Our specialty Ethiopian Mustard Seed (Tiratere) undergoes precise triple-pass mechanical aspiration, gravity-separation, and sizing. Sourced through cooperative partnerships directly from smallholder farmers, each batch and freight container is loaded under rigorous sanitary supervisor checkpoints.",
      specs: [
        { label: "Country of Origin", value: "Ethiopia" },
        { label: "Purity Level", value: "99.5% Minimum" },
        { label: "Oil Content", value: "42% - 47% Range" },
        { label: "Moisture Content", value: "Max 7%" },
        { label: "MOQ", value: "19 Metric Tons (1x 20ft FCL)" },
        { label: "Standard Packaging", value: "50kg Composite PP Bags" }
      ],
      features: [
        "Certified Phytosanitary Inspection Reports with every bill of lading",
        "Direct highland provenance tracking (Gojjam & Gondar agricultural zones)",
        "Zero Chemical Post-Harvest Treatment - completely authentic raw grade"
      ]
    },
    {
      id: "injera-export",
      title: "Authentic Teff Injera",
      amharicTitle: "የተረጋገጠ ጤፍ እንጀራ",
      intro: "Traditional baking heritage merged with state-of-the-art cold preservation.",
      description: "Baked daily in custom, modern sanitation-focused facilities in Addis Ababa, our injera uses 100% genuine red and white teff flour (the ancient Ethiopian supergrain). Through immediate post-bake flash dehydration or cryogenic freezing, we preserve the critical carbonation-pocket structure ('Ayn') and genuine sourdough tang. Highly demanded by specialty stores and restaurants globally.",
      specs: [
        { label: "Teff Composition", value: "100% True Pure Teff" },
        { label: "Available Formats", value: "Dehydrated, Frozen Vacuum, Fresh Air-freight" },
        { label: "Rehydration Speed", value: "45 Seconds Steam Re-activation" },
        { label: "Bulk Storage Temp", value: "-18°C Cryo-frozen" },
        { label: "Diaspora Markets Served", value: "North America, Western Europe, Middle East" },
        { label: "Certifications", value: "Phytosanitary & FDA Registration Eligible" }
      ],
      features: [
        "Baked by master culinary artisans using traditional stone griddles",
        "Zero synthetic acidifiers, gluten fillers, or chemical leavening agents",
        "Pioneering multi-layered protective film prevents fracturing during transit"
      ]
    }
  ];

  // Deep dive import lines
  const importItems: ImportItem[] = [
    {
      id: "industrial-machinery",
      title: "Industrial & Electrical Systems",
      intro: "Supplying the hardware for Ethiopia's industrial progression.",
      description: "Importing directly from premier, ISO-certified makers across Germany, Japan, China, and the United Arab Emirates. We manage everything from Letter of Credit (LC) facilitation, custom clearances to transit transport.",
      tags: ["Agricultural Processing", "3-Phase Generators", "Tension Line Insulators", "Packaging Systems"],
      specs: [
        { label: "Origin Brands", value: "European, Japanese & Top-Tier Chinese" },
        { label: "Target Sectors", value: "Agriprocessing, Construction, Energy" },
        { label: "Compliance Scope", value: "Ethiopian Standards Agency (ESA) Compliant" }
      ]
    },
    {
      id: "cold-chain-networks",
      title: "Integrated Cold Chain Distribution",
      intro: "Counteracting post-harvest losses and safeguarding pharmaceuticals.",
      description: "Our heavy modular cold chain infrastructure is built bespoke for Ethiopia's specific transit conditions. Combining refrigeration systems with digital telemetry lets exporters track cold shelf-life indicators perfectly.",
      tags: ["Walk-in Modular Cold Rooms", "Digital Telemetry Control", "Reefers & Containers", "Horticulture Depots"],
      specs: [
        { label: "Insulation Class", value: "PU Panels 100mm to 150mm Thickness" },
        { label: "Compressor Units", value: "High-Efficiency Copeland / Bitzer Systems" },
        { label: "Thermal Range", value: "Operating range from +15°C down to -25°C" }
      ]
    },
    {
      id: "solar-irrigation",
      title: "Agricultural Solar Water Pumps",
      intro: "Delivering reliable off-grid water lifting systems at zero runtime fuel costs.",
      description: "High head, multi-stage stainless steel submersible solar pumps engineered for medium and large-scale agricultural schemes. These systems draw water efficiently under modern agricultural and community projects across Ethiopia.",
      tags: ["Helical Submersible", "Dual-Axis Solar Panels", "Automated Irrigation Controllers", "100% Fuel-Free"],
      specs: [
        { label: "Power Ratings", value: "Bespoke packages ranging from 5HP to 100HP+" },
        { label: "Max Head Capacity", value: "Up to 350 Meters Vertical Lift" },
        { label: "Wet-End Structure", value: "AISI 304/316 Corrosion-Resistant Stainless Steel" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-charcoal text-gray-100 font-sans selection:bg-gold selection:text-brand-charcoal">
      {/* TOP INFO BAR */}
      <div className="w-full bg-[#111411] border-b border-[#222822] text-[11px] font-sans text-gray-400 py-2 px-4 shadow-sm z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+251 11 663 8787</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Mail className="w-3.5 h-3.5 text-gold" />
              <span>info@greenlandbg.com</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>Bole Grace Plaza, Addis Ababa, Ethiopia</span>
            </span>
            <span className="hidden md:inline text-gray-600">|</span>
            <span className="hidden md:inline uppercase text-[9px] font-bold tracking-widest text-[#C8972B] px-1.5 py-0.5 border border-[#C8972B]/30 rounded">
              GMT+3 EAT
            </span>
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
              { label: "Home", id: "home" },
              { label: "About", id: "about" },
              { label: "Export", id: "export" },
              { label: "Import", id: "import" },
              { label: "Solutions", id: "solutions" },
              { label: "Contact", id: "contact" }
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
                {link.label}
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
              ENQUIRE NOW
            </a>
          </nav>

          {/* Mobile Hamburg Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 rounded hover:bg-white/10 transition-colors focus:outline-none"
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

        <nav className="flex flex-col gap-8 text-center text-lg font-serif font-medium tracking-wide">
          {[
            { label: "Home Base", id: "home" },
            { label: "Corporate About", id: "about" },
            { label: "Agricultural Exports", id: "export" },
            { label: "Industrial Imports", id: "import" },
            { label: "Strategic Solutions", id: "solutions" },
            { label: "Reach Our Desk", id: "contact" }
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToId(link.id, e)}
              className={`hover:text-gold transition-colors block text-2xl py-1 ${
                activeSection === link.id ? "text-gold border-b border-gold/40" : "text-gray-300"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <a
              href="tel:+251116638787"
              className="text-xs text-gray-400 hover:text-gold flex items-center justify-center gap-2"
            >
              <Phone className="w-4.5 h-4.5 text-gold" />
              <span>+251 11 663 8787</span>
            </a>
            <a
              href="mailto:info@greenlandbg.com"
              className="text-xs text-gray-400 hover:text-gold flex items-center justify-center gap-2"
            >
              <Mail className="w-4.5 h-4.5 text-gold" />
              <span>info@greenlandbg.com</span>
            </a>
          </div>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative h-[calc(100vh-80px)] min-h-[65vh] flex flex-col justify-center items-center forest-grid-pattern text-white overflow-hidden px-4"
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

        <div className="max-w-4xl mx-auto text-center z-10 relative flex flex-col justify-center items-center">
          {/* Eyebrow and aesthetic gold marker */}
          <div className="flex items-center gap-3 mb-6" data-aos="fade-up">
            <div className="w-8 h-[1px] bg-gold"></div>
            <span className="text-xs font-sans font-semibold tracking-widest text-[#C8972B] uppercase">
              ETHIOPIAN ROOTS | GLOBAL OUTPOSTS
            </span>
            <div className="w-8 h-[1px] bg-gold"></div>
          </div>

          <h1
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08] max-w-3xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Connecting Ethiopia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
              to Global Markets
            </span>
          </h1>

          <p
            className="font-sans text-sm sm:text-lg max-w-2xl text-gray-300 leading-relaxed mb-10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Premium agricultural exports and industrial imports — trusted by buyers and suppliers across three continents. Bridging Ethiopian trade with unmatched reliability.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <a
              href="#what-we-do"
              onClick={(e) => scrollToId("what-we-do", e)}
              className="bg-gold hover:bg-gold-light text-brand-charcoal text-xs font-black uppercase tracking-widest px-8 py-4 rounded shadow-lg hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
            >
              Explore Our Products
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToId("contact", e)}
              className="border border-white/40 hover:border-gold hover:text-gold text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded backdrop-blur-sm transition-all w-full sm:w-auto text-center"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Floating Quick Stats Bar in Bottom Section */}
        <div className="w-full absolute bottom-8 left-0 px-4 z-10 hidden sm:block">
          <div className="max-w-4xl mx-auto py-5 px-8 rounded bg-[#11140F]/90 border border-[#26351F]/40 backdrop-blur-md flex justify-between items-center text-center shadow-lg">
            {[
              { value: "5", label: "PRODUCT SECTOR LINES" },
              { value: "3+", label: "CONTINENTS SERVED" },
              { value: "Addis Ababa", label: "GLOBAL HEADQUARTERS" }
            ].map((stat, idx) => (
              <div key={idx} className="flex-1 px-4 relative last:border-r-0 border-r border-[#26351F]/40">
                <div className="font-serif text-2xl font-bold text-gold">{stat.value}</div>
                <div className="text-[9px] font-sans text-gray-400 tracking-widest uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll down animated indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 sm:opacity-40 animate-bounce">
          <span className="text-[9px] uppercase tracking-wider text-white">Scroll Down</span>
          <ArrowRight className="w-4 h-4 text-gold rotate-90" />
        </div>
      </section>

      {/* SECTOR OVERVIEW */}
      <section id="what-we-do" className="py-24 px-4 bg-brand-charcoal relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans font-semibold tracking-widest text-gold uppercase inline-block mb-3">
              DIVISIONS OF OPERATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              What We Do
            </h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="max-w-xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
              We align our services with international compliance while ensuring the logistics engine coordinates trade smoothly.
            </p>
          </div>

          {/* 5 Icon Cards Responsive Grid (3 on top row, 2 under it on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {sectorCards.slice(0, 3).map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#191D1A] rounded p-8 border border-forest/20 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-[#242A25] rounded-lg group-hover:bg-forest/30 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest text-gold/80 px-2 py-0.5 rounded bg-brand-charcoal/40 border border-gold/10">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.amharicTitle && (
                      <span className="font-sans text-xs text-gold/70 font-normal">
                        ({item.amharicTitle})
                      </span>
                    )}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.body}
                  </p>
                </div>

                <a
                  href="#export"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(item.id.includes("seeds") || item.id.includes("injera") ? "export" : "import");
                  }}
                  className="inline-flex items-center gap-1 text-gold text-xs font-semibold hover:text-gold-light mt-auto"
                >
                  <span>Explore specifications</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl mx-auto">
            {sectorCards.slice(3, 5).map((item) => (
              <div
                key={item.id}
                className="bg-[#191D1A] rounded p-8 border border-forest/20 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-[#242A25] rounded-lg group-hover:bg-forest/30 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[9.5px] font-mono tracking-widest text-gold/80 px-2 py-0.5 rounded bg-brand-charcoal/40 border border-gold/10">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span>{item.title}</span>
                    {item.amharicTitle && (
                      <span className="font-sans text-xs text-gold/70 font-normal">
                        ({item.amharicTitle})
                      </span>
                    )}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.body}
                  </p>
                </div>

                <a
                  href="#import"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId("import");
                  }}
                  className="inline-flex items-center gap-1 text-gold text-xs font-semibold hover:text-gold-light mt-auto"
                >
                  <span>Explore specifications</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-4 bg-white text-brand-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7" data-aos="fade-right">
              <span className="text-xs font-sans font-bold tracking-widest text-gold uppercase block mb-3">
                WHO WE ARE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-6 leading-tight">
                An Ethiopian Trading Company Built on Trust
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed font-sans mb-8">
                <p>
                  Greenland Business Group is a privately held Ethiopian import and export company dedicated to building high-value trade connections between Ethiopia and the world.
                </p>
                <p>
                  From sourcing premium agricultural commodities like seeds, tiratere, and injera for global buyers — to importing the industrial machinery, cold chain infrastructure, and solar energy solutions that Ethiopia's growing economy demands — we operate with precision, compliance, and long-term partnerships at our core.
                </p>
                <p>
                  Based in Addis Ababa, we work with verified suppliers and buyers across Europe, the Middle East, Asia, and the Americas.
                </p>
              </div>

              {/* Three Core Values Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-200 pt-8">
                {[
                  {
                    title: "Integrity",
                    desc: "Transparent in every transaction and compliance framework."
                  },
                  {
                    title: "Quality",
                    desc: "Rigorous standards checked thoroughly from harvest to dock load."
                  },
                  {
                    title: "Partnership",
                    desc: "Committed to establishing long-term, mutually generative trade networks."
                  }
                ].map((val, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="flex items-center gap-1.5 font-bold text-xs text-forest uppercase mb-1">
                      <span className="text-gold">✦</span>
                      <span>{val.title}</span>
                    </span>
                    <span className="text-gray-500 text-[11px] leading-relaxed">
                      {val.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Abstract Architectural Shape Column */}
            <div className="lg:col-span-5 relative" data-aos="fade-left">
              <div className="aspect-square bg-forest relative rounded p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                {/* Background abstract decoration code lines */}
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
                    Our mandate is deep, reliable supply-chain bridging. We respect Ethiopian agricultural heritage while servicing international markets with precision.
                  </p>
                </div>

                <div className="relative z-10 flex justify-between items-end border-t border-white/20 pt-6">
                  <div>
                    <div className="text-white text-xs font-bold tracking-widest uppercase">Addis Ababa Head Office</div>
                    <div className="text-gold text-[10px] uppercase font-sans mt-0.5">Greenland Management Board</div>
                  </div>
                  <Globe className="w-8 h-8 text-gold/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPORT PRODUCTS DEEP DIVE */}
      <section id="export" className="py-24 px-4 bg-forest-dark text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans font-semibold tracking-widest text-gold uppercase inline-block mb-3">
              OUTWARD AGRICULTURAL EXPORTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Export Products
            </h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="max-w-xl mx-auto text-gray-300 text-xs sm:text-sm leading-relaxed">
              We clean, sort, pass and package high-value agricultural commodities according to international phytosanitary specs.
            </p>
          </div>

          {/* Two large cards side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {exportItems.map((item) => (
              <div
                key={item.id}
                id={item.id === "seeds-tiratere" ? "seeds" : "injera"}
                className="bg-[#12311A] border-l-4 border-gold rounded-r-lg p-8 lg:p-10 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-sans font-extrabold tracking-widest text-gold uppercase bg-[#184223] px-3 py-1 rounded">
                      GREENLAND COMMODITY LINE
                    </span>
                    <span className="font-sans text-xs text-gold font-medium px-2 py-0.5 border border-gold/30 rounded bg-forest/20">
                      {item.amharicTitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-gold-light italic mb-6">
                    "{item.intro}"
                  </p>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8">
                    {item.description}
                  </p>

                  {/* Specification Table */}
                  <div className="border-t border-white/10 pt-6 mb-8">
                    <h4 className="text-[10px] font-sans font-bold tracking-widest text-gold uppercase mb-4">
                      LOGISTICS & SPECIFICATIONS FRAMEWORK:
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {item.specs.map((spec, idx) => (
                        <div key={idx} className="border-b border-white/5 pb-2">
                          <span className="text-[10px] font-mono text-gray-400 block uppercase">
                            {spec.label}
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certified bullet features */}
                  <div className="mb-8">
                    <h4 className="text-[10px] font-sans font-bold tracking-widest text-[#E0B252] uppercase mb-3">
                      Core Value Features:
                    </h4>
                    <ul className="space-y-2.5">
                      {item.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={(e) => triggerEnquiry("Export Inquiry", item.title, e)}
                  className="bg-gold hover:bg-gold-light text-brand-charcoal text-xs font-black uppercase tracking-widest py-4 px-6 rounded transition-all duration-300 w-full text-center shadow-md flex items-center justify-center gap-1"
                >
                  <span>Enquire Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPORT SOLUTIONS DEEP DIVE */}
      <section id="import" className="py-24 px-4 bg-white text-brand-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans font-bold tracking-widest text-gold uppercase inline-block mb-3">
              INWARD INDUSTRIAL & SOLAR SOLUTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">
              Import Solutions
            </h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="max-w-xl mx-auto text-gray-600 text-xs sm:text-sm leading-relaxed">
              Importing heavy systems, solar solutions, and precision-engineered cold storage hardware directly to local developers in Addis Ababa.
            </p>
          </div>

          {/* Three cards layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {importItems.map((item, idx) => (
              <div
                key={item.id}
                className="bg-brand-gray border border-gray-200 hover:border-gold rounded p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-forest font-bold bg-forest/5 border border-forest/15 px-2.5 py-1 rounded inline-block mb-4">
                    SOLUTIONS DIVISION 0{idx + 1}
                  </span>
                  
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-gray-500 italic mb-4">
                    {item.intro}
                  </p>

                  <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Component specification blocks */}
                  <div className="space-y-3 mb-6 bg-white/60 p-4 border border-gray-150 rounded">
                    {item.specs.map((spec, specIdx) => (
                      <div key={specIdx} className="text-xs">
                        <span className="text-[10px] font-bold text-gray-400 block uppercase">{spec.label}</span>
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
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => triggerEnquiry("Import Inquiry", item.title, e)}
                  className="border border-forest hover:bg-forest hover:text-white text-forest text-xs font-extrabold uppercase tracking-widest py-3.5 px-4 rounded transition-all duration-300 w-full text-center flex items-center justify-center gap-1"
                >
                  <span>Request Import Terms</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="solutions" className="py-24 px-4 bg-brand-gray text-brand-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-sans font-bold tracking-widest text-gold uppercase inline-block mb-3">
              STRATEGIC COMPETITIVE STRENGTHS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest mb-4">
              Why Trade with Greenland
            </h2>
            <div className="w-24 h-0.5 bg-gold mx-auto mb-4"></div>
            <p className="max-w-xl mx-auto text-gray-500 text-xs sm:text-sm leading-relaxed">
              We leverage reliable logistics execution, strict trade document handling, and localized agricultural tracking.
            </p>
          </div>

          {/* 2x2 Grid with high border definition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-5xl mx-auto">
            {[
              {
                icon: <Globe className="w-7 h-7 text-gold" />,
                title: "Global Commerce Networks",
                desc: "We run deeply established partner collaborations containing top commodity buyers and capital systems across Germany, Japan, UAE, and standard global diaspora channels."
              },
              {
                icon: <ShieldCheck className="w-7 h-7 text-gold" />,
                title: "Frictionless Trade Compliance",
                desc: "All shipping processes and export-import actions strictly pass the Ethiopian Standards Agency, national central banks, and targeted custom phytosanitary frameworks."
              },
              {
                icon: <Cpu className="w-7 h-7 text-gold" />,
                title: "End-to-End Logistical Execution",
                desc: "From farmgate processing in Ethiopian highlands, cold packaging networks, phytosanitary clearance checks, up to direct destination delivery, we lead the chain."
              },
              {
                icon: <Award className="w-7 h-7 text-gold" />,
                title: "Informed Ethiopian Agency",
                desc: "Based deeply out of Addis Ababa with strong regional networks. We understand local regulations, trade routes, banking systems, and agricultural potentials perfectly."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-150 p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4"
              >
                <div className="p-3 bg-[#1A5C2E]/5 rounded-lg border border-[#1A5C2E]/10 shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-forest mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Abstract global maps visualization block */}
          <div className="mt-20 border border-gray-200 bg-white rounded-lg p-8 max-w-4xl mx-auto relative overflow-hidden shadow-sm">
            <h3 className="font-serif text-lg font-bold text-forest text-center mb-6">
              Greenland Business Group Network Core
            </h3>
            <div className="w-[100%] h-48 bg-brand-charcoal rounded flex items-center justify-center relative overflow-hidden">
              {/* Custom styled absolute mini SVG representing Addis Ababa trade node connections */}
              <div className="absolute inset-0 opacity-25">
                <svg className="w-full h-full" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 400 100 Q 150 50 100 80" stroke="#C8972B" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 400 100 Q 250 150 200 40" stroke="#C8972B" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 400 100 Q 550 40 650 60" stroke="#C8972B" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 400 100 Q 600 160 700 120" stroke="#C8972B" strokeWidth="2" strokeDasharray="3,3" />
                  <path d="M 400 100 Q 500 50 480 30" stroke="#1A5C2E" strokeWidth="2.5" />
                </svg>
              </div>

              {/* Glowing anchor dots */}
              <div className="absolute left-[50%] top-[40%] text-center">
                <div className="w-4 h-4 bg-gold rounded-full animate-ping absolute -left-1 -top-1 opacity-75"></div>
                <div className="w-2.5 h-2.5 bg-gold rounded-full relative z-10 border border-brand-charcoal"></div>
                <span className="text-[10px] text-white block mt-2 font-black tracking-widest font-mono uppercase bg-forest/80 px-1.5 py-0.5 rounded border border-gold/30">
                  ADDIS ABABA (HUB)
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
              Consistently clearing logistics routes between our domestic storage depots and global destination harbors.
            </p>
          </div>
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
                  COMMUNICATE WITH US
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mb-6">
                  Get In Touch
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-8">
                  Whether you are an international buyer, machinery importer, investor, or logistics transport partner — we want to hear from you. Enter your details to coordinate terms.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gold font-bold">HQ LOCATION</h4>
                      <p className="text-xs text-gray-200 leading-relaxed">
                        Bole Grace Plaza, Room 302,<br />
                        Bole, Addis Ababa, Ethiopia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5! " />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gold font-bold">TELEPHONE DIRECT LINE</h4>
                      <p className="text-xs text-gray-200">+251 11 663 8787</p>
                      <p className="text-xs text-gray-400 mt-0.5">+251 91 123 4567 (International desk)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gold font-bold">ELECTRONIC CORRESPONDENCE</h4>
                      <p className="text-xs text-gray-200">info@greenlandbg.com</p>
                      <p className="text-xs text-gray-400">trade@greenlandbg.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[11px] uppercase tracking-wider text-gold font-bold">DESK WORKING HOURS</h4>
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
                <div className="h-full flex flex-col justify-center items-center text-center py-12" id="form-success-overlay">
                  <div className="w-16 h-16 bg-[#1A5C2E]/10 rounded-full border border-gold flex items-center justify-center mb-6 animate-pulse">
                    <Check className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-forest mb-2">
                    Transmission Initiated
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
                    Thank you, <strong className="text-brand-charcoal">{formData.fullName}</strong>. Your corporate inquiry regarding <strong>{formData.subject}</strong> has been translated into your email client.
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
                    Send Another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5" id="inquiry-form">
                  <div className="border-b border-gray-200 pb-2 mb-4">
                    <h4 className="text-xs font-semibold text-forest uppercase tracking-widest">
                      DIGITAL REQUISITION LOG
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Submit trade requirements below. Our desk responds within 24 business hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-600 block uppercase mb-1">
                        Full Name *
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
                        Company Name
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
                        Email Address *
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
                        Phone Number
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
                      Inquiry Matter *
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white border border-gray-250 rounded px-4 py-3 text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none text-[#1b1c1b] appearance-none"
                      >
                        <option value="Export Inquiry">Export Inquiry — Seeds & Injera</option>
                        <option value="Import Inquiry">Import Inquiry — Machinery & Solar Pumps</option>
                        <option value="Partnership">Corporate Partnership Desks</option>
                        <option value="Other">General Corporate Support / Logistics</option>
                      </select>
                      {/* Cust custom arrow icon */}
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        ▼
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-600 block uppercase mb-1">
                      Inquiry Specification Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="Please delineate clear specifications regarding container quantities, destination freight terminals, desired phytosanitary checks, or scheduling requirements."
                      className="w-full bg-white border border-gray-250 rounded px-4 py-3 text-xs focus:border-gold focus:ring-1 focus:ring-gold outline-none text-[#1b1c1b]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-light text-brand-charcoal text-xs font-black uppercase tracking-widest py-4 rounded transition-all duration-300 shadow hover:shadow-gold/10"
                  >
                    Send Trade Inquiry
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
                  Connecting premium Ethiopian agricultural exports and custom industrial machinery lines smoothly across target hubs in Europe, Asia, and North America.
                </p>
              </div>
              <div className="mt-8 text-[11px] text-gray-550">
                <p>© 2025 Greenland Business Group. Addis Ababa, Ethiopia.</p>
                <p className="mt-1 text-[9px] text-[#C8972B]/60 tracking-wider">REGISTRATION NO: KK/AA/14/2223/2003</p>
              </div>
            </div>

            {/* Col 2 Quick Links */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-sans font-bold tracking-widest text-gold uppercase mb-5">
                CORPORATE NAVIGATION
              </h4>
              <ul className="space-y-2.5 text-xs">
                {[
                  { label: "Home Base", id: "home" },
                  { label: "Who We Are", id: "about" },
                  { label: "Export Products", id: "export" },
                  { label: "Import Solutions", id: "import" },
                  { label: "Trade Strengths", id: "solutions" },
                  { label: "Submit Requisition", id: "contact" }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => scrollToId(link.id, e)}
                      className="text-gray-400 hover:text-gold transition-colors inline-flex items-center gap-1 group"
                    >
                      <ChevronRight className="w-3 h-3 text-gold/60 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 Contact details & socials */}
            <div className="md:col-span-4 select-all">
              <h4 className="text-xs font-sans font-bold tracking-widest text-gold uppercase mb-5">
                HEAD OFFICE CONNECT
              </h4>
              <ul className="space-y-3.5 text-xs text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span>Bole Grace Plaza, Room 302, Addis Ababa, Ethiopia</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <span>+251 11 663 8787 / +251 91 123 4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <span>info@greenlandbg.com</span>
                </li>
              </ul>

              {/* Social Channels */}
              <div className="mt-6">
                <div className="text-[10px] font-sans font-semibold tracking-wider text-gold/70 uppercase mb-3">
                  STAY IN TOUCH
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
          <div className="mt-16 pt-8 border-t border-[#A5771A]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-gray-550">
            <div>
              <span>Bridging Ethiopian agricultural and industrial excellence globally.</span>
            </div>
            <div className="flex gap-4">
              <a href="#about" onClick={(e) => scrollToId("about", e)} className="hover:text-gold transition-colors">Compliance Frameworks</a>
              <span>·</span>
              <a href="#contact" onClick={(e) => scrollToId("contact", e)} className="hover:text-gold transition-colors">Port Terminals</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
