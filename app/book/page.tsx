"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle, Clock, ArrowLeft, Check, Sparkles, Share2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { useAnalysis } from "@/context/analysis-context";

const TIME_PREFERENCES = [
  { id: "morning", label: "Morning", time: "9:00 – 12:00" },
  { id: "afternoon", label: "Afternoon", time: "12:00 – 17:00" },
  { id: "evening", label: "Evening", time: "17:00 – 20:00" },
  { id: "any", label: "Any Time", time: "Flexible" },
];

const CLINIC_PHONE = "34603847323";
const MAX_NOTES_LENGTH = 200;

export default function BookPage() {
  const router = useRouter();
  const { analysis, selectedTreatments } = useAnalysis();
  const [timePreference, setTimePreference] = useState("any");
  const [notes, setNotes] = useState("");
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (!analysis) {
      router.replace("/");
    }
  }, [analysis, router]);

  if (!analysis) return null;

  const treatmentNames = analysis.recommendations
    .filter((t) => selectedTreatments.includes(t.id))
    .map((t) => t.name);

  const defaultTreatments = treatmentNames.length > 0
    ? treatmentNames
    : analysis.recommendations.slice(0, 2).map((t) => t.name);

  const generateWhatsAppMessage = () => {
    const treatments = defaultTreatments.join(", ");
    const time = TIME_PREFERENCES.find((t) => t.id === timePreference)?.label || "Any Time";
    return `Hi BeautyBody! 👋

I just completed my AI Skin Analysis on your website.
My results: Overall Score ${analysis.overallScore}/100 | Skin Age: ${analysis.skinAge}

I'm interested in:
• ${treatments.replace(/, /g, "
• ")}

My preferred time: ${time}
${notes ? `Notes: ${notes}` : ""}

I'd love to book a free consultation. Thank you! ✨`;
  };

  const handleBook = () => {
    const message = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${CLINIC_PHONE}?text=${message}`, "_blank");
    setBooked(true);
  };

  const handleShare = async () => {
    const shareData = {
      title: "My BeautyBody Skin Analysis",
      text: `I just got my skin analyzed! Score: ${analysis.overallScore}/100. Check out BeautyBody AI Skin Expert.`,
      url: window.location.origin,
    };
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    }
  };

  if (booked) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center safe-area-x">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-score-excellent/10 flex items-center justify-center mx-auto mb-6 border border-score-excellent/20">
            <Check className="w-10 h-10 text-score-excellent" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl text-white mb-3">Message Sent!</h1>
          <p className="text-white/55 text-base max-w-xs mx-auto leading-relaxed">
            A BeautyBody specialist will review your analysis and reply within 2 hours.
          </p>
        </motion.div>

        <GlassCard className="p-6 mb-6 text-left">
          <h3 className="text-white font-medium mb-4 text-sm">What happens next?</h3>
          <div className="space-y-4">
            {[
              { num: "1", text: "Our team reviews your skin analysis results" },
              { num: "2", text: "We suggest available consultation slots via WhatsApp" },
              { num: "3", text: "You visit the clinic for your personalized treatment plan" },
            ].map((step) => (
              <div key={step.num} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-champagne-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-champagne-500/10">
                  <span className="text-champagne-400 text-xs font-bold">{step.num}</span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-3">
          <Button variant="secondary" className="w-full" onClick={handleShare}>
            <Share2 className="mr-2 h-5 w-5" />
            Share With a Friend
          </Button>
          <Link href="/report">
            <Button variant="ghost" className="w-full">
              <CalendarDays className="mr-2 h-5 w-5" />
              View Your Report
            </Button>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="w-full text-white/40">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-24 safe-area-x">
      <div className="no-print flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-14 h-14 rounded-2xl bg-champagne-500/10 flex items-center justify-center mx-auto mb-4 border border-champagne-500/10">
          <MessageCircle className="w-7 h-7 text-champagne-400" strokeWidth={1.5} />
        </div>
        <h1 className="font-display text-2xl text-white mb-2">Book Your Consultation</h1>
        <p className="text-white/45 text-sm max-w-xs mx-auto">
          Connect with a BeautyBody specialist via WhatsApp to discuss your personalized plan.
        </p>
      </motion.div>

      {/* Analysis Summary */}
      <GlassCard className="p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-champagne-400" strokeWidth={1.5} />
          <h3 className="text-white font-medium text-sm">Your Analysis Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-xl bg-white/5">
            <p className="text-white/35 text-[10px] uppercase tracking-wider mb-1">Overall Score</p>
            <p className="text-white font-bold text-lg tabular-nums">{analysis.overallScore}/100</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5">
            <p className="text-white/35 text-[10px] uppercase tracking-wider mb-1">Skin Age</p>
            <p className="text-white font-bold text-lg tabular-nums">{analysis.skinAge}</p>
          </div>
        </div>
        {defaultTreatments.length > 0 && (
          <div className="mt-4">
            <p className="text-white/35 text-[10px] uppercase tracking-wider mb-2">Interested treatments:</p>
            <div className="flex flex-wrap gap-2">
              {defaultTreatments.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-champagne-500/8 text-champagne-400 border border-champagne-500/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </GlassCard>

      {/* Time Preference */}
      <div className="mb-6">
        <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Preferred Time</h3>
        <div className="grid grid-cols-2 gap-2.5">
          {TIME_PREFERENCES.map((time) => (
            <button
              key={time.id}
              onClick={() => setTimePreference(time.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 min-h-[44px] ${
                timePreference === time.id
                  ? "border-champagne-500/30 bg-champagne-500/[0.05] shadow-[0_0_16px_rgba(201,169,110,0.06)]"
                  : "border-white/5 bg-white/[0.015] hover:bg-white/[0.03]"
              }`}
            >
              <p className="text-white text-sm font-medium">{time.label}</p>
              <p className="text-white/35 text-xs mt-1">{time.time}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider">Additional Notes</h3>
          <span className="text-white/20 text-[10px]">{notes.length}/{MAX_NOTES_LENGTH}</span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value.slice(0, MAX_NOTES_LENGTH))}
          placeholder="e.g., First-time client, sensitive skin, specific concerns..."
          className="w-full bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-champagne-400/40 resize-none h-24 transition-colors"
        />
      </div>

      {/* WhatsApp CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button onClick={handleBook} glow size="lg" className="w-full">
          <MessageCircle className="mr-2 h-5 w-5" />
          Send WhatsApp Message
        </Button>
        <p className="text-center text-white/25 text-xs mt-3">
          Opens WhatsApp with a pre-filled message to +34 603 847 323
        </p>
      </motion.div>
    </div>
  );
}
