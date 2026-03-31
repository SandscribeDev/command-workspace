import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface SiteMarker {
  id: string;
  name: string;
  coordinates: [number, number];
  workspace: string;
  status: "active" | "attention" | "idle";
  workers: number;
  activeTasks: number;
}

const markers: SiteMarker[] = [
  { id: "1", name: "Mombasa Site A", coordinates: [39.6682, -4.0435], workspace: "Charity Kenya", status: "active", workers: 8, activeTasks: 3 },
  { id: "2", name: "Nairobi Office", coordinates: [36.8219, -1.2921], workspace: "Charity Kenya", status: "attention", workers: 4, activeTasks: 5 },
  { id: "3", name: "Kisumu Borehole", coordinates: [34.7680, -0.0917], workspace: "Charity Kenya", status: "idle", workers: 2, activeTasks: 1 },
  { id: "4", name: "UK HQ", coordinates: [-0.1276, 51.5074], workspace: "FBA Business", status: "active", workers: 1, activeTasks: 2 },
  { id: "5", name: "Supplier Shenzhen", coordinates: [114.0579, 22.5431], workspace: "FBA Business", status: "active", workers: 0, activeTasks: 1 },
];

const statusColor: Record<string, string> = {
  active: "hsl(160, 84%, 39%)",
  attention: "hsl(38, 92%, 50%)",
  idle: "hsl(215, 16%, 47%)",
};

const GeoMapPage = () => {
  const [selected, setSelected] = useState<SiteMarker | null>(null);

  return (
    <DashboardLayout title="Geographic Map" subtitle="Operational sites">
      <div className="p-5 space-y-4 max-w-[1200px]">

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {/* Map */}
          <div className="lg:col-span-3 rounded-lg border border-border bg-card overflow-hidden" style={{ height: 500 }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 150 }}
              style={{ width: "100%", height: "100%" }}
            >
              <ZoomableGroup center={[30, 10]} zoom={1.5}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="hsl(240, 10%, 12%)"
                        stroke="hsl(240, 10%, 18%)"
                        strokeWidth={0.5}
                        style={{
                          hover: { fill: "hsl(240, 10%, 16%)" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {markers.map((marker) => (
                  <Marker
                    key={marker.id}
                    coordinates={marker.coordinates}
                    onClick={() => setSelected(marker)}
                    style={{ default: { cursor: "pointer" } }}
                  >
                    <circle r={6} fill={statusColor[marker.status]} opacity={0.9} stroke="hsl(240, 15%, 4%)" strokeWidth={2} />
                    <circle r={10} fill={statusColor[marker.status]} opacity={0.2} />
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>

          {/* Site list */}
          <div className="space-y-2">
            <h2 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-2">Sites</h2>
            {markers.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`w-full rounded-lg border p-3 text-left transition-colors ${
                  selected?.id === m.id
                    ? "border-primary bg-surface-hover"
                    : "border-border bg-card hover:bg-surface-hover"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: statusColor[m.status] }} />
                  <span className="text-data-sm font-medium text-foreground">{m.name}</span>
                </div>
                <div className="mt-1 flex gap-3 text-[11px] text-muted-foreground">
                  <span>{m.workers} workers</span>
                  <span>{m.activeTasks} tasks</span>
                </div>
                <span className="mt-1 inline-block rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{m.workspace}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: statusColor[selected.status] }} />
                  <h3 className="text-base font-semibold text-foreground">{selected.name}</h3>
                  <span className="rounded bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{selected.workspace}</span>
                </div>
                <button onClick={() => setSelected(null)} className="text-data-sm text-muted-foreground hover:text-foreground">Close</button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Workers</div>
                  <div className="mt-1 font-mono text-2xl font-semibold text-foreground">{selected.workers}</div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Active Tasks</div>
                  <div className="mt-1 font-mono text-2xl font-semibold text-foreground">{selected.activeTasks}</div>
                </div>
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Coordinates</div>
                  <div className="mt-1 font-mono text-data-sm text-muted-foreground">
                    {selected.coordinates[1].toFixed(2)}°, {selected.coordinates[0].toFixed(2)}°
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default GeoMapPage;
