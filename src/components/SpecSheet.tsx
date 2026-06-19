import React from "react";
import { Check } from "lucide-react";

interface SpecItem {
  label: { en: string; am: string };
  value: { en: string; am: string };
}

interface ProductSpec {
  id: string;
  name: { en: string; am: string };
  category: { en: string; am: string };
  specs: SpecItem[];
}

interface SpecSheetProps {
  lang: "en" | "am";
}

const productsData: ProductSpec[] = [
  {
    id: "seeds_oilseeds",
    name: {
      en: "Premium Oilseeds (Ethiopian Mustard / Niger-type Oilseed)",
      am: "ሰናፍጭ እና መካከለኛ የቅባት እህሎች"
    },
    category: { en: "Oilseeds", am: "የቅባት እህሎች" },
    specs: [
      { label: { en: "Quality", am: "ጥራት" }, value: { en: "Sortex machine cleaned", am: "በሶርቴክስ ማሽን የጸዳ" } },
      { label: { en: "Purity", am: "ንፅህና" }, value: { en: "98.5% min", am: "ቢያንስ 98.5%" } },
      { label: { en: "Admixture", am: "ባዕድ ነገር" }, value: { en: "1.5% max", am: "ቢበዛ 1.5%" } },
      { label: { en: "Oil Content", am: "የዘይት መጠን" }, value: { en: "34% min", am: "ቢያንስ 34%" } },
      { label: { en: "Moisture", am: "እርጥበት" }, value: { en: "7% max", am: "ቢበዛ 7%" } },
      { label: { en: "FFA", am: "ነጻ ፋቲ አሲድ (FFA)" }, value: { en: "2% max", am: "ቢበዛ 2%" } },
      { label: { en: "Grade & Purity Status", am: "የደረጃ ሁኔታ" }, value: { en: "Free from dead/alive insects or weevils, fit for human consumption / bird feed grade available", am: "ከሕያው/ከሞተ ነፍሳት የጸዳ፣ ለሰው ልጅ ፍጆታ የሚውል / የወፍ መኖ የሚሆንም ይገኛል" } },
      { label: { en: "Packaging", am: "ማሸጊያ" }, value: { en: "25kg/50kg PP bags or per buyer requirement", am: "ድርብ 25ኪ.ግ/50ኪ.ግ ፒፒ ከረጢት ወይም በገዢ ፍላጎት" } }
    ]
  },
  {
    id: "sesame_humera",
    name: {
      en: "Sesame Seeds (Humera Type)",
      am: "የሰሊጥ ፍሬ (ሁመራ አይነት)"
    },
    category: { en: "Premium Oilseeds", am: "ምርጥ የቅባት እህሎች" },
    specs: [
      { label: { en: "Quality", am: "ጥራት" }, value: { en: "Sortex machine cleaned", am: "በሶርቴክስ ማሽን የጸዳ" } },
      { label: { en: "Purity", am: "ንፅህና" }, value: { en: "99% min", am: "ቢያንስ 99%" } },
      { label: { en: "Admixture", am: "ባዕድ ነገር" }, value: { en: "1% max", am: "ቢበዛ 1%" } },
      { label: { en: "Oil Content", am: "የዘይት መጠን" }, value: { en: "50% min", am: "ቢያንስ 50%" } },
      { label: { en: "Moisture", am: "እርጥበት" }, value: { en: "7% max", am: "ቢበዛ 7%" } },
      { label: { en: "FFA", am: "ነጻ ፋቲ አሲድ (FFA)" }, value: { en: "2% max", am: "ቢበዛ 2%" } }
    ]
  },
  {
    id: "sesame_wollega",
    name: {
      en: "Sesame Seeds (Wollega Type)",
      am: "የሰሊጥ ፍሬ (ወለጋ አይነት)"
    },
    category: { en: "Premium Oilseeds", am: "ምርጥ የቅባት እህሎች" },
    specs: [
      { label: { en: "Quality", am: "ጥራት" }, value: { en: "Machine cleaned", am: "በማሽን የጸዳ" } },
      { label: { en: "Purity", am: "ንፅህና" }, value: { en: "98.5% min", am: "ቢያንስ 98.5%" } },
      { label: { en: "Admixture", am: "ባዕድ ነገር" }, value: { en: "1.5% max", am: "ቢበዛ 1.5%" } },
      { label: { en: "Oil Content", am: "የዘይት መጠን" }, value: { en: "52% min", am: "ቢያንስ 52%" } },
      { label: { en: "Moisture", am: "እርጥበት" }, value: { en: "7% max", am: "ቢበዛ 7%" } },
      { label: { en: "FFA", am: "ነጻ ፋቲ አሲድ (FFA)" }, value: { en: "2% max", am: "ቢበዛ 2%" } }
    ]
  },
  {
    id: "pulses_red_kidney",
    name: {
      en: "Pulses — Red Kidney Beans (Gojam Type)",
      am: "ጥራጥሬዎች — ቀይ ቦሎቄ (የጎጃም አይነት)"
    },
    category: { en: "Pulses & Beans", am: "ጥራጥሬዎችና ጥራጥሬ ሰብሎች" },
    specs: [
      { label: { en: "Quality", am: "ጥራት" }, value: { en: "Sortex machine cleaned + HPS", am: "በሶርቴክስ እና በእጅ የተመረጠ ክሊንድ" } },
      { label: { en: "Purity", am: "ንፅህና" }, value: { en: "98% min", am: "ቢያንስ 98%" } },
      { label: { en: "Admixture", am: "ባዕድ ነገር" }, value: { en: "2% max", am: "ቢበዛ 2%" } },
      { label: { en: "Moisture", am: "እርጥበት" }, value: { en: "14% max", am: "ቢበዛ 14%" } },
      { label: { en: "Bean Count", am: "ፍሬ ብዛት" }, value: { en: "415 beans / 100g", am: "415 ፍሬዎች በአንድ 100 ግራም" } },
      { label: { en: "Treatment", am: "ጥበቃ" }, value: { en: "Fumigated prior to shipment", am: "ከመጫኑ በፊት የጭስ ህክምና የተደረገለት" } }
    ]
  },
  {
    id: "pulses_other",
    name: {
      en: "Pulses — White Pea Beans / Soybeans / Desi-Chick Peas",
      am: "ጥራጥሬዎች — ነጭ አተር / አኩሪ አተር / ደሲ ሽምብራ"
    },
    category: { en: "Pulses & Beans", am: "ጥራጥሬዎችና ጥራጥሬ ሰብሎች" },
    specs: [
      { label: { en: "Quality", am: "ጥራት" }, value: { en: "Machine cleaned", am: "በማሽን የጸዳ" } },
      { label: { en: "Purity", am: "ንፅህና" }, value: { en: "97% - 98% min", am: "97% - 98% ቢያንስ" } },
      { label: { en: "Moisture", am: "እርጥበት" }, value: { en: "12% - 14% max", am: "12% - 14% ቢበዛ" } },
      { label: { en: "Grade & Safety", am: "ደረጃና ንፅህና" }, value: { en: "Fumigated prior to shipment, fit for human consumption", am: "ከመጫኑ በፊት የጭስ ህክምና የተደረገለት፣ ለሰው ምግብነት የተስማማ" } }
    ]
  },
  {
    id: "arabica_coffee",
    name: {
      en: "Arabica Coffee Beans",
      am: "የአረቢካ ቡና ፍሬ"
    },
    category: { en: "Coffee & Spices", am: "ቡና እና ቅመማ ቅመሞች" },
    specs: [
      { label: { en: "Washed Grade", am: "የታጠበ ቡና" }, value: { en: "Sidamo Gr-1 & Gr-2, Yirgachefe Gr-1 & Gr-2", am: "ሲዳሞ Gr-1 እና Gr-2፣ ይርጋጨፌ Gr-1 እና Gr-2" } },
      { label: { en: "Unwashed / Natural", am: "ያልታጠበ / ተፈጥሯዊ" }, value: { en: "Nekempt Gr-4 & Gr-5, Djimma Gr-4 & Gr-5, Sidamo & Yirgachefe Gr-1", am: "ነቀምት Gr-4 እና Gr-5፣ ጅማ Gr-4 እና Gr-5፣ ሲዳሞ እና ይርጋጨፌ Gr-1" } }
    ]
  },
  {
    id: "spices_turmeric",
    name: {
      en: "Spices (Turmeric & Black Cumin)",
      am: "ቅመማ ቅመሞች (እርድ እና ጥቁር አዝሙድ)"
    },
    category: { en: "Coffee & Spices", am: "ቡና እና ቅመማ ቅመሞች" },
    specs: [
      { label: { en: "Turmeric Specifications", am: "የእርድ ዝርዝር" }, value: { en: "Whole finger size, double polished, well-dried, Moisture 12% max", am: "ሙሉ ጣት መጠን፣ ድርብ የተወለወለ፣ በሚገባ የደረቀ፣ እርጥበት ቢበዛ 12%" } },
      { label: { en: "Black Cumin Specifications", am: "የጥቁር አዝሙድ ዝርዝር" }, value: { en: "Purity 98% max, Admixture 2% min, Gluten-free, Lactose-free", am: "ንፅህና 98% ከፍተኛ፣ ባዕድ ነገር 2% ዝቅተኛ፣ ከግሉተን እና ላክቶስ ነጻ" } }
    ]
  },
  {
    id: "injera_export",
    name: {
      en: "Injera (Export Grade)",
      am: "የጤፍ እንጀራ (ለላኪ ምርት)"
    },
    category: { en: "Specialty Foods", am: "ልዩ ምግቦች" },
    specs: [
      { label: { en: "Base Grain", am: "ዋና እህል" }, value: { en: "100% Ethiopian Teff", am: "100% እውነተኛ የኢትዮጵያ ጤፍ" } },
      { label: { en: "Formats Available", am: "የሚቀርብበት ሁኔታ" }, value: { en: "Fresh (vacuum-sealed), Frozen, Dehydrated", am: "ትኩስ (በቫኪዩም የታሸገ)፣ በረዶ የተደረገ፣ የደረቀ" } },
      { label: { en: "Shelf Life", am: "የመቆያ ጊዜ" }, value: { en: "Up to 12 months (dehydrated)", am: "እስከ 12 ወራት (ለደረቀው እንጀራ)" } },
      { label: { en: "Packaging", am: "ማሸጊያ" }, value: { en: "Retail-ready and bulk wholesale", am: "ለችርቻሮ የተዘጋጀ እና በጅምላ" } }
    ]
  }
];

export function SpecSheet({ lang }: SpecSheetProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {productsData.map((prod) => (
        <div
          key={prod.id}
          className="bg-white border-l-4 border-[#1A5C2E] p-6 rounded-r shadow-lg relative flex flex-col justify-between hover:shadow-xl transition-shadow"
        >
          <div>
            <div className="mb-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#C8972B]">
                {lang === "en" ? prod.category.en : prod.category.am}
              </span>
            </div>
            
            <h4 className="font-serif text-lg font-bold text-[#1A5C2E] mb-4">
              {lang === "en" ? prod.name.en : prod.name.am}
            </h4>

            <ul className="space-y-3 mb-6">
              {prod.specs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                  <Check className="w-4 h-4 text-[#C8972B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1A5C2E] mr-1">
                      {lang === "en" ? item.label.en : item.label.am}:
                    </strong>
                    <span className="text-gray-800">
                      {lang === "en" ? item.value.en : item.value.am}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-100 pt-3 mt-auto">
            <p className="text-[10px] text-gray-500 italic">
              {lang === "en"
                ? "Specifications may vary slightly by harvest season — confirm current batch specs at time of order."
                : "ዝርዝር መግለጫዎች በአዝመራ ወቅት በትንሹ ሊለያዩ ይችላሉ - እባክዎን በሚያዝዙበት ወቅት አሁን ያለውን የምርት ስብጥር ያረጋግጡ።"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SpecSheet;
