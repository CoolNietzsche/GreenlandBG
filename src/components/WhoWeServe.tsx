import React from "react";
import { Users } from "lucide-react";

interface WhoWeServeProps {
  lang: "en" | "am";
}

const serveItems = [
  { en: "Global Food & Beverage Manufacturers", am: "ዓለም አቀፍ የምግብ እና የመጠጥ አምራቾች" },
  { en: "Specialty Food Importers", am: "ልዩ ምግቦች አስመጪዎች" },
  { en: "Traders", am: "ነጋዴዎች እና ደላላዎች" },
  { en: "Wholesalers / Distributors", am: "አጠቃላይ ጅምላ አከፋፋዮች" },
  { en: "End-Users", am: "የመጨረሻ ተጠቃሚዎች" },
  { en: "Retailers & E-commerce Platforms", am: "የችርቻሮ እና የኢ-ኮሜርስ ድርጅቶች" }
];

export function WhoWeServe({ lang }: WhoWeServeProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2 text-gold shrink-0">
          <Users className="w-5 h-5" />
          <span className="font-serif font-bold text-sm tracking-wide uppercase">
            {lang === "en" ? "Who We Serve:" : "እኛ የምናገለግላቸው ማህበረሰቦች:"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {serveItems.map((item, idx) => (
            <span
              key={idx}
              className="text-xs font-semibold bg-white/10 text-white px-3.5 py-1.5 rounded-full border border-white/5 shadow-sm transition-all hover:bg-gold hover:text-[#1A5C2E]"
            >
              {lang === "en" ? item.en : item.am}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhoWeServe;
