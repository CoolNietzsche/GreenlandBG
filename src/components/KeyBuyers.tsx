import React from "react";
import { Globe, Shield } from "lucide-react";

interface KeyBuyersProps {
  lang: "en" | "am";
}

const buyersData = [
  {
    buyer: "Qingdao Accaname International Trading Co., Ltd",
    product: { en: "Red Kidney Beans", am: "ቀይ ቦሎቄ" },
    destination: { en: "China", am: "ቻይና" }
  },
  {
    buyer: "China Citexic Corporation",
    product: { en: "Soybeans", am: "አኩሪ አተር" },
    destination: { en: "China", am: "ቻይና" }
  },
  {
    buyer: "Leguminosos Intl SA / Artin Limited",
    product: { en: "Coffee Beans", am: "የቡና ፍሬ" },
    destination: { en: "El Salvador", am: "ኤል ሳልቫዶር" }
  },
  {
    buyer: "Molvizadah Sons General Trading LLC",
    product: { en: "White Pea Beans", am: "ነጭ አተር" },
    destination: { en: "Dubai, UAE", am: "ዱባይ (ዩኤኢ)" }
  },
  {
    buyer: "Pedon S.P.A",
    product: { en: "Soybeans", am: "አኩሪ አተር" },
    destination: { en: "Italy", am: "ጣልያን" }
  },
  {
    buyer: "Himatsing International Pte Ltd",
    product: { en: "Green Mung Beans", am: "ማሽላና ባቄላ" },
    destination: { en: "India", am: "ህንድ" }
  },
  {
    buyer: "Sinopharm Fortune Way Company",
    product: { en: "Coffee Beans", am: "የቡና ፍሬ" },
    destination: { en: "China", am: "ቻይና" }
  },
  {
    buyer: "Price Master General Trading LLC",
    product: { en: "Desi-Chick Peas", am: "ደሲ ሽምብራ" },
    destination: { en: "Dubai, UAE", am: "ዱባይ (ዩኤኢ)" }
  }
];

const partners = [
  { name: "Maersk", type: "Logistics" },
  { name: "DHL", type: "Logistics" },
  { name: "Hapag-Lloyd", type: "Logistics" },
  { name: "MSC", type: "Logistics" },
  { name: "Citi", type: "Banking" },
  { name: "Emirates NBD", type: "Banking" },
  { name: "FAB", type: "Banking" },
  { name: "Zemen Bank", type: "Ethiopian Bank" },
  { name: "Awash Bank", type: "Ethiopian Bank" },
  { name: "Bank of Abyssinia", type: "Ethiopian Bank" },
  { name: "PIL", type: "Logistics" },
  { name: "Oromia Bank", type: "Ethiopian Bank" }
];

export function KeyBuyers({ lang }: KeyBuyersProps) {
  return (
    <div className="space-y-16">
      {/* Buyers directory */}
      <div>
        <div className="text-center mb-10">
          <span className="text-xs font-sans font-semibold tracking-widest text-[#C8972B] uppercase inline-block mb-3">
            {lang === "en" ? "GLOBAL TRANSACTION REGISTER" : "የዓለም አቀፍ ትጥቅ መዝገብ"}
          </span>
          <h3 className="font-serif text-2xl sm:text-3.5xl font-bold text-white tracking-tight">
            {lang === "en" ? "Some of Our Key Buyers Across the Globe" : "በዓለም ዙሪያ ካሉ ቁልፍ ገዢዎቻችን በጥቂቱ"}
          </h3>
          <div className="w-16 h-0.5 bg-[#C8972B] mx-auto mt-3"></div>
        </div>

        {/* Responsive view: Hidden table on mobile, cards shown instead */}
        <div className="hidden md:block overflow-x-auto bg-[#191D1A]/60 border border-forest/20 rounded-lg shadow-xl">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#111411] border-b border-forest/20 text-[#C8972B] uppercase font-bold tracking-wider font-mono">
                <th className="py-4 px-6">{lang === "en" ? "Buyer / Client" : "ደንበኛ / ድርጅት"}</th>
                <th className="py-4 px-6">{lang === "en" ? "Product Sourced" : "የተገዛው ምርት"}</th>
                <th className="py-4 px-6">{lang === "en" ? "Destination Country" : "የመድረሻ ሀገር"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222822] text-gray-200">
              {buyersData.map((item, idx) => (
                <tr key={idx} className="hover:bg-forest/10 transition-colors">
                  <td className="py-4 px-6 font-semibold flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#C8972B]" />
                    {item.buyer}
                  </td>
                  <td className="py-4 px-6">{lang === "en" ? item.product.en : item.product.am}</td>
                  <td className="py-4 px-6 font-medium text-gold-light inline-flex items-center gap-1.5 mt-2.5">
                    <Globe className="w-3.5 h-3.5 text-[#C8972B]" />
                    {lang === "en" ? item.destination.en : item.destination.am}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-only stack layout */}
        <div className="md:hidden space-y-4">
          {buyersData.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#191D1A]/90 border border-forest/30 rounded p-5 space-y-2.5 shadow-md"
            >
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-[#C8972B] mt-0.5 shrink-0" />
                <span className="text-white font-bold text-sm block leading-tight">{item.buyer}</span>
              </div>
              <div className="h-[1px] w-full bg-forest/20"></div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">{lang === "en" ? "Product" : "ምርት"}</span>
                  <span className="text-gray-200 font-semibold">{lang === "en" ? item.product.en : item.product.am}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">{lang === "en" ? "Destination" : "መዳረሻ"}</span>
                  <span className="text-[#C8972B] font-semibold flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#C8972B]" />
                    {lang === "en" ? item.destination.en : item.destination.am}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network / Logistics & Banking Strip */}
      <div className="bg-[#111411]/80 rounded-lg p-8 border border-[#222822] text-center">
        <h4 className="text-[10px] font-sans font-extrabold tracking-widest text-[#C8972B] uppercase mb-6">
          {lang === "en" ? "PROVEN LOGISTICS, LIQUIDITY & BANKING PARTNERS" : "የሎጂስቲክስ፣ ፈሳሽነት እና የባንክ አጋሮች መረጃ"}
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#191D1A] border border-[#252C26] rounded text-center group hover:border-[#C8972B] transition-colors"
            >
              <div className="text-white font-bold text-xs tracking-wide">
                {partner.name}
              </div>
              <div className="text-[9px] text-[#C8972B]/60 font-mono mt-1 uppercase">
                {partner.type}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 mt-6 font-sans">
          {lang === "en"
            ? "We manage secure bank L/C transfers and fast container routes with globally approved agencies listed above."
            : "ከላይ በተዘረዘሩት ታማኝ አጋሮች አማካኝነት አስተማማኝ የባንክ እውቅና (L/C) እና የመርከብ ጭነት ሁኔታዎችን እናስተሳስራለን።"}
        </p>
      </div>
    </div>
  );
}

export default KeyBuyers;
