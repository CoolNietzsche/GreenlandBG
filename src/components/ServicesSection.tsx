import React from "react";
import {
  ShieldCheck,
  FileText,
  Truck,
  Briefcase,
  Activity,
  Clock,
  Wheat,
  Phone,
  BookOpen
} from "lucide-react";

interface ServiceProps {
  lang: "en" | "am";
}

const servicesData = [
  {
    id: 1,
    icon: <ShieldCheck className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "Quality Controlling", am: "የጥራት ቁጥጥር" },
    desc: {
      en: "Our team personally inspects goods at the warehouse for quality before every shipment.",
      am: "የኩባንያችን ባለሙያዎች እያንዳንዱን እቃ ከመጫኑ በፊት በጥራት መጋዘን ደረጃው ሙሉ በሙሉ መሟላቱን ያረጋግጣሉ።"
    }
  },
  {
    id: 2,
    icon: <FileText className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "Export Documentation", am: "የኤክስፖርት ሰነዶች ዝግጅት" },
    desc: {
      en: "Full preparation of export documents per Incoterms 2020, UCP600, and URC522 standards.",
      am: "በዓለም አቀፉ Incoterms 2020 ፣ UCP600 እና URC522 ሕጎች መሠረት የኤክስፖርት ሰነዶችን በተሟላ ሁኔታ ማዘጋጀት።"
    }
  },
  {
    id: 3,
    icon: <Truck className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "Freight, Air Forwarding & Logistics", am: "የአየር፣ ባህርና የየብስ ሎጂስቲክስ" },
    desc: {
      en: "Air freight, ocean freight, ground transport, customs clearance, and warehouse distribution — fully managed.",
      am: "የአየር በረራ፣ የባህር ወለል፣ የብስ ትራንስፖርት፣ የጉምሩክ ክሊራንስ እና የሎጂስቲክስ ስርጭት - ሙሉ በሙሉ የተደራጀ።"
    }
  },
  {
    id: 4,
    icon: <Briefcase className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "Bank Services", am: "የባንክና የክፍያ አገልግሎት" },
    desc: {
      en: "Timely LC openings, payment settlements, and pre-shipment export loan facilitation through our banking partners.",
      am: "ፈጣን የኤልሲ (LC) መክፈቻ፣ አስተማማኝ የክፍያ ዝግጅቶች እና ከመጫን በፊት ለእርዳታ የሚሆኑ ኤክስፖርት ብድሮችን ማመቻቸት።"
    }
  },
  {
    id: 5,
    icon: <Activity className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "Laboratory Equipment & Testing", am: "የላቦራቶሪ ምርመራ" },
    desc: {
      en: "In-house quantity testing for pulses and oilseeds, plus coffee cupping and quality reporting.",
      am: "ለቅባት እህሎችና ለጥራጥሬዎች የሀገር ውስጥ ሙሉ የላቦራቶሪ ደረጃ ማረጋገጫ እንዲሁም ለቡና ልዩ የጥራት ኩባያ ዘገባ ማዘጋጀት።"
    }
  },
  {
    id: 6,
    icon: <Clock className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "On-Time Shipment", am: "በሰዓቱ ማድረስ" },
    desc: {
      en: "No procrastination — container booking and vessel scheduling handled rapidly and reliably.",
      am: "ያለ ምንም መዘግየት - ኮንቴይነር ማስያዝ እና የመርከብ ቀጠሮዎችን በከፍተኛ ፍጥነት እና አስተማማኝነት ማጠናቀቅ።"
    }
  },
  {
    id: 7,
    icon: <Wheat className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "Selecting Suitable Warehouses & Cleaning Facilities", am: "የመጋዘንና ማጽጃ ተቋማት ምርጫ" },
    desc: {
      en: "We supervise warehouse conditions and cleaning equipment to protect raw material and finished product quality.",
      am: "የምርቱን ንፅህና ለመጠበቅ ዘመናዊ የመጋዘን ሁኔታዎችን እና የጥራት ማጽጃ ማሽኖችን እኛ ራሳችን እንቆጣጠራለን።"
    }
  },
  {
    id: 8,
    icon: <Phone className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "Excellent Communication", am: "ምርጥ ግንኙነት" },
    desc: {
      en: "Daily updates via WhatsApp, email, and direct calls — buyers are never left waiting.",
      am: "በየቀኑ በዋትስአፕ፣ በኢሜል እና በስልክ ጥሪዎች ፈጣን መረጃ መስጠት - ገዢዎቻችን መቼም መናፈቅ የለባቸውም።"
    }
  },
  {
    id: 9,
    icon: <BookOpen className="w-6 h-6 text-[#C8972B]" />,
    title: { en: "Consulting & Training Services", am: "የምክርና የሥልጠና አገልግሎት" },
    desc: {
      en: "We consult new exporters and provide training on contract farming, export procedures, and quality systems.",
      am: "ለአዳዲስ ላኪዎች በውል እርሻ፣ በኤክስፖርት ሂደቶች እና በጥራት ቁጥጥር ስርዓት ላይ ሰፊ ምክርና ስልጠና እንሰጣለን።"
    }
  }
];

export function ServicesSection({ lang }: ServiceProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {servicesData.map((service) => (
        <div
          key={service.id}
          className="bg-white border border-gray-150 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
        >
          <div>
            <div className="p-3 bg-[#1A5C2E]/5 rounded-lg border border-[#1A5C2E]/10 shrink-0 w-max mb-5 group-hover:bg-[#1A5C2E]/10 transition-colors">
              {service.icon}
            </div>
            <h4 className="font-serif text-lg font-bold text-[#1A5C2E] mb-2">
              {lang === "en" ? service.title.en : service.title.am}
            </h4>
            <p className="text-gray-650 text-xs sm:text-sm leading-relaxed">
              {lang === "en" ? service.desc.en : service.desc.am}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ServicesSection;
