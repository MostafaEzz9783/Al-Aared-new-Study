import { ExternalLink, MapPin } from "lucide-react";
import projectData from "@/data/projectData";

export default function PropertyOverview({ t, language }) {
  const currentLanguage = language === "en" ? "en" : "ar";

  const inventoryHighlights = projectData.inventoryHighlights.map((item) => ({
    ...item,
    label: item.label[currentLanguage],
    note: item.note[currentLanguage],
  }));

  const inventoryTable = projectData.inventoryTable.map((item) => ({
    type: item.type[currentLanguage],
    count: item.count,
    use: item.use[currentLanguage],
  }));

  return (
    <div className="py-8 space-y-6">
      <div
        className="rounded-2xl p-8 border"
        style={{ backgroundColor: "#0f0f1a", borderColor: "#1e1e2e" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label={t.property.totalUnitsLabel}
            value={String(projectData.executiveUnits)}
            unit={`${projectData.executiveUnits} x ${projectData.executiveUnitType[currentLanguage]}`}
            color="#60a5fa"
          />
          <StatCard
            label={t.property.modelLabel}
            value={projectData.modelValue[currentLanguage]}
            unit={projectData.modelSubtext[currentLanguage]}
            color="#a78bfa"
          />
          <StatCard
            label={t.property.locationLabel}
            value={projectData.location[currentLanguage]}
            unit={projectData.locationSubtext[currentLanguage]}
            color="#34d399"
          />
        </div>
      </div>

      <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}>
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: "#eff6ff" }}
          >
            <MapPin size={18} style={{ color: "#60a5fa" }} />
          </div>
          <div>
            <h3 className="font-bold text-base mb-1" style={{ color: "#111827" }}>
              {t.property.locationTitle}
            </h3>
            <p style={{ color: "#6b7280" }} className="text-sm leading-relaxed">
              {projectData.overviewDescription[currentLanguage]}
            </p>
            <a
              href={projectData.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold"
              style={{ color: "#2563eb" }}
            >
              <ExternalLink size={14} />
              {t.property.mapButton}
            </a>
          </div>
        </div>
      </div>

      <div className="rounded-2xl p-6 border" style={{ backgroundColor: "#f9fafb", borderColor: "#e5e7eb" }}>
        <h3 className="font-bold text-base mb-5" style={{ color: "#111827" }}>
          {t.property.inventoryTitle}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
          {inventoryHighlights.map((item) => (
            <div key={item.label} className="rounded-xl border p-4" style={{ backgroundColor: "#ffffff", borderColor: "#e5e7eb" }}>
              <p className="text-2xl font-black mb-1" style={{ color: "#0f172a" }}>
                {item.count}
              </p>
              <p className="text-sm font-semibold mb-1" style={{ color: "#111827" }}>
                {item.label}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "#6b7280" }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-xl border" style={{ borderColor: "#e5e7eb" }}>
          <table className="min-w-full text-sm">
            <thead style={{ backgroundColor: "#eff6ff" }}>
              <tr>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "#1f2937" }}>
                  {t.property.inventoryType}
                </th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "#1f2937" }}>
                  {t.property.inventoryCount}
                </th>
                <th className="px-4 py-3 text-left font-semibold" style={{ color: "#1f2937" }}>
                  {t.property.inventoryUse}
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryTable.map((row) => (
                <tr
                  key={row.type}
                  className="border-t transition-colors duration-200 hover:bg-blue-50/70"
                  style={{ borderColor: "#e5e7eb" }}
                >
                  <td className="px-4 py-3" style={{ color: "#111827" }}>
                    {row.type}
                  </td>
                  <td className="px-4 py-3 font-bold" style={{ color: "#2563eb" }}>
                    {row.count}
                  </td>
                  <td className="px-4 py-3" style={{ color: "#6b7280" }}>
                    {row.use}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit, color }) {
  return (
    <div className="rounded-xl p-5 text-center" style={{ backgroundColor: "#1e1e2e" }}>
      <p className="text-xs font-medium mb-2" style={{ color: "#8b8ba7" }}>
        {label}
      </p>
      <p className="text-2xl sm:text-3xl font-black mb-1 leading-tight" style={{ color }}>
        {value}
      </p>
      <p className="text-xs" style={{ color: "#8b8ba7" }}>
        {unit}
      </p>
    </div>
  );
}
