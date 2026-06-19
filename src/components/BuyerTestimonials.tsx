import React from "react";
import { Mail, MessageSquare, Quote } from "lucide-react";

interface TestimonialsProps {
  lang: "en" | "am";
}

const testimonialsData = [
  {
    sender: "Eric Feng",
    company: "China Sinopharm",
    date: "Dec 3, 2020",
    dateAm: "ህዳር 24, 2013",
    message: {
      en: "We have a very good start to cooperation. We are satisfied with the quality of your goods — five containers, first contract. We hope to establish long-term cooperation and mutual understanding.",
      am: "የስራ ትብብራችንን እጅግ በጣም በጥሩ ሁኔታ ጀምረናል። በመጀመሪያው ውላችን ባገኘናቸው አምስት ኮንቴይነሮች የዕቃዎቻችሁ ጥራት እጅግ ረክተናል። የረጅም ጊዜ ትብብር እና የጋራ መግባባት ለመመስረት ተስፋ እናደርጋለን።"
    }
  },
  {
    sender: "Lichuan",
    company: "China Citexic Corporation",
    date: "Dec 26, 2022",
    dateAm: "ታህሳስ 17, 2015",
    message: {
      en: "Soybean contract signed and confirmed. We will open the LC according to the contract and look forward to coordinating delivery.",
      am: "የአኩሪ አተር ግዢ ውል ተፈርሞና ተረጋግጧል። በውሉ መሰረት ኤልሲውን (L/C) የምንከፍት ሲሆን፣ ርክክቡን በጋራ ለማስተባበር በጉጉት እንጠባበቃለን።"
    }
  }
];

export function BuyerTestimonials({ lang }: TestimonialsProps) {
  return (
    <div>
      <div className="text-center mb-12">
        <span className="text-xs font-sans font-bold tracking-widest text-[#C8972B] uppercase inline-block mb-3">
          {lang === "en" ? "VERIFIED BUYER CORRESPONDENCE" : "የገዢዎች ምስክርነቶች እና ደብዳቤዎች"}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A5C2E] tracking-tight">
          {lang === "en" ? "Buyer Testimonials" : "እኛን የመረጡ የገዢ ምስክርነቶች"}
        </h3>
        <p className="text-xs text-gray-550 mt-1 max-w-sm mx-auto">
          {lang === "en"
            ? "Real, documented feedback received from international trade counterparties."
            : "ከዓለም አቀፍ የንግድ አጋሮቻችን የተገኙ እውነተኛ የኢሜል ምስክርነቶች።"}
        </p>
        <div className="w-12 h-0.5 bg-[#C8972B] mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {testimonialsData.map((test, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Design accents */}
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Quote className="w-20 h-20 text-[#1A5C2E]" />
            </div>

            <div className="space-y-4">
              {/* Email Client Styled Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1A5C2E]/10 rounded-full flex items-center justify-center border border-gold/30">
                    <Mail className="w-4 h-4 text-[#C8972B]" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-sans font-semibold uppercase tracking-wider">
                      {lang === "en" ? "Sender Desk" : "ላኪ"}
                    </span>
                    <strong className="text-gray-900 text-sm font-serif">
                      {test.sender}
                    </strong>
                    <span className="text-gray-500 text-xs block">
                      {test.company}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-mono">
                    {lang === "en" ? "Date Received:" : "የደረሰበት ቀን:"}
                  </span>
                  <span className="text-gray-600 text-xs font-semibold">
                    {lang === "en" ? test.date : test.dateAm}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div className="text-gray-700 text-xs sm:text-sm leading-relaxed italic z-10 relative">
                "{lang === "en" ? test.message.en : test.message.am}"
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-[10px] text-emerald-700 font-bold tracking-wide uppercase">
              <MessageSquare className="w-3.5 h-3.5 text-[#C8972B]" />
              <span>{lang === "en" ? "Verified Trade Relation" : "የተረጋገጠ የንግድ አጋር"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerTestimonials;
