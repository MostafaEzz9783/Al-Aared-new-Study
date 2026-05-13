import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const cardMotion = {
  whileHover: { scale: 1.01, y: -2 },
  transition: { duration: 0.2, ease: "easeOut" },
};

function InsightColumn({ title, items, tone }) {
  const isOpportunity = tone === "opportunity";
  const Icon = isOpportunity ? CheckCircle2 : AlertTriangle;
  const accentColor = isOpportunity ? "#34d399" : "#f87171";
  const borderColor = isOpportunity ? "rgba(52, 211, 153, 0.35)" : "rgba(248, 113, 113, 0.35)";
  const backgroundColor = isOpportunity ? "rgba(20, 83, 45, 0.18)" : "rgba(127, 29, 29, 0.16)";
  const iconBackground = isOpportunity ? "rgba(52, 211, 153, 0.14)" : "rgba(248, 113, 113, 0.14)";

  return (
    <div className="rounded-2xl border p-4 sm:p-5" style={{ backgroundColor: "#121225", borderColor }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: iconBackground }}>
          <Icon size={17} style={{ color: accentColor }} />
        </div>
        <h4 className="text-sm font-black" style={{ color: "#f8fafc" }}>
          {title}
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <motion.div
            key={item}
            className="rounded-xl border px-4 py-3"
            style={{ backgroundColor, borderColor }}
            whileHover={cardMotion.whileHover}
            transition={cardMotion.transition}
          >
            <div className="flex items-start gap-2.5">
              <Icon size={15} style={{ color: accentColor, marginTop: 2 }} />
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#dbe4f0" }}>
                {item}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function OpportunitiesChallenges({ selectedModel, modelLabel, t }) {
  const language = t.meta.language;
  const content = selectedModel.opportunitiesChallenges;

  if (!content) {
    return null;
  }

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="rounded-2xl border p-4 sm:p-6 mb-6"
      style={{ backgroundColor: "#17172a", borderColor: "#2e2e3e" }}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={16} style={{ color: "#60a5fa" }} />
            <p className="text-xs font-semibold" style={{ color: "#8b8ba7" }}>
              {modelLabel}
            </p>
          </div>
          <h3 className="text-lg font-black" style={{ color: "#f0f0fa" }}>
            {t.financial.opportunitiesChallengesTitle}
          </h3>
          <p className="text-sm mt-2 max-w-2xl" style={{ color: "#a6a6c2" }}>
            {t.financial.opportunitiesChallengesSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <InsightColumn
          title={t.financial.opportunitiesTitle}
          items={content.opportunities[language]}
          tone="opportunity"
        />
        <InsightColumn
          title={t.financial.challengesTitle}
          items={content.challenges[language]}
          tone="challenge"
        />
      </div>
    </motion.div>
  );
}
