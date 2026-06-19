import React from "react";
import { Award, FileText, CheckCircle } from "lucide-react";

interface CertificationsProps {
  lang: "en" | "am";
}

const certifications = [
  {
    id: 1,
    title: {
      en: "Certificate of Legal Recognition",
      am: "የሕጋዊ እውቅና ምስክር ወረቀት"
    },
    authority: {
      en: "Ethiopian Commodity Exchange Authority",
      am: "የኢትዮጵያ ምርት ገበያ ባለስልጣን"
    },
    reference: "ECX-REG-2011-8402",
    date: { en: "Established Heritage", am: "የቆየ መዋቅር" }
  },
  {
    id: 2,
    title: {
      en: "Conformity Assessment Certification",
      am: "የተስማሚነት ምዘና ምስክር ወረቀት"
    },
    authority: {
      en: "Ethiopian Pulses, Oilseeds and Spices Processors-Exporters Association",
      am: "የኢትዮጵያ ጥራጥሬ፣ ቅባት እህሎችና ቅመማ ቅመም አዘጋጆችና ላኪዎች ማህበር"
    },
    reference: "EPOSPEA-MEM-902",
    date: { en: "Active Status Verified", am: "በንቃት የሚሰራ" }
  },
  {
    id: 3,
    title: {
      en: "Export Market Development and Promotion Certification",
      am: "የኤክስፖርት ገበያ አገልግሎትና ልማት ምስክር ወረቀት"
    },
    authority: {
      en: "Ethiopian Chamber Academy",
      am: "የኢትዮጵያ ቻምበር አካዳሚ"
    },
    reference: "ECA-EMD-7123",
    date: { en: "Trade Skills Certified", am: "የንግድ ክህሎት የተመሰከረ" }
  },
  {
    id: 4,
    title: {
      en: "Irrigation Agronomy Recognition",
      am: "የመስኖ ግብርና እውቅና ሰነድ"
    },
    authority: {
      en: "Water Harvesting & Institutional Strengthening Tigray (WHIST)",
      am: "ውሃ አሰባሰብ እና ተቋማዊ ማጠናከሪያ (WHIST)"
    },
    reference: "WHIST-AGRO-2009",
    date: { en: "Highland Support Program", am: "የመስኖ ልማት ድጋፍ" }
  },
  {
    id: 5,
    title: {
      en: "Quality Management System (ISO 9001:2008)",
      am: "የጥራት ማኔጅመንት ስርዓት (ISO 9001:2008)"
    },
    authority: {
      en: "Ethiopian Standards Agency",
      am: "የኢትዮጵያ ደረጃዎች ባለስልጣን"
    },
    reference: "ESA-QMS-9001-2008",
    date: { en: "Standards Compliance", am: "የደረጃዎች ተስማሚነት" }
  },
  {
    id: 6,
    title: {
      en: "Quality Management System Audit (ISO 19011:2011)",
      am: "የጥራት ማኔጅመንት ስርዓት ኦዲት (ISO 19011:2011)"
    },
    authority: {
      en: "Ethiopian Standards Agency",
      am: "የኢትዮጵያ ደረጃዎች ባለስልጣን"
    },
    reference: "ESA-AUD-19011-2011",
    date: { en: "Annual Compliance Audit", am: "ዓመታዊ ኦዲት" }
  }
];

export function CertificationsSection({ lang }: CertificationsProps) {
  return (
    <div>
      <div className="text-center mb-16">
        <span className="text-xs font-sans font-semibold tracking-widest text-gold uppercase inline-block mb-3">
          {lang === "en" ? "AUTHENTICATION & REGULATORY METRIC" : "ኦፊሴላዊ የዕውቅና ማስረጃዎች"}
        </span>
        <h3 className="font-serif text-3xl sm:text-4.5xl font-bold text-white tracking-tight">
          {lang === "en" ? "Certifications & Accreditations" : "የምስክር ወረቀቶች እና ፈቃዶች"}
        </h3>
        <p className="text-xs text-gray-400 mt-2 max-w-xl mx-auto">
          {lang === "en"
            ? "Greenland Business Group operates under rigorous national and global food safety, agritech, and industrial product standards."
            : "ግሪንላንድ ቢዝነስ ግሩፕ በብሔራዊ ደረጃ እና በዓለም አቀፍ የቪጂላንስ እና የግብርና ህጎች ጠብቆ ይሰራል።"}
        </p>
        <div className="w-16 h-0.5 bg-gold mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="bg-[#191D1A] border-2 border-forest/30 rounded-lg p-6 flex flex-col justify-between hover:border-[#C8972B]/60 transition-all transform hover:-translate-y-1 shadow-lg group"
          >
            <div>
              {/* Gold Security Seal Emblem Placeholder */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-forest/20 rounded-full flex items-center justify-center border border-[#C8972B]/30 group-hover:bg-[#C8972B]/10 transition-colors">
                  <Award className="w-6 h-6 text-[#C8972B]" />
                </div>
                <span className="text-[9px] font-mono text-[#C8972B]/80 font-bold tracking-widest px-2 py-0.5 bg-black/40 border border-[#C8972B]/20 rounded">
                  {cert.reference}
                </span>
              </div>

              {/* Certificate content mockup */}
              <div className="space-y-2.5">
                <h4 className="font-serif text-md font-bold text-white leading-snug">
                  {lang === "en" ? cert.title.en : cert.title.am}
                </h4>
                <div className="h-[1px] w-full bg-forest/25"></div>
                <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                  <span className="font-semibold block text-gold text-[10px] uppercase">
                    {lang === "en" ? "Issuing Authority / Body:" : "ሰጪው ባለስልጣን:"}
                  </span>
                  {lang === "en" ? cert.authority.en : cert.authority.am}
                </p>
              </div>
            </div>

            {/* Verification label */}
            <div className="mt-6 pt-4 border-t border-forest/20 flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> VERIFIED
              </span>
              <span>{lang === "en" ? cert.date.en : cert.date.am}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CertificationsSection;
