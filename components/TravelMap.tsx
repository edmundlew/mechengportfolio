'use client';

import { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, Line, Marker, ZoomableGroup } from 'react-simple-maps';

interface City {
    name: string;
    country: string;
    iso: string;
    coords: [number, number];
    visits: string[];
    flag?: string;
    home?: boolean;
}

interface TravelMapProps {
    cities: City[];
    summary: { countries: number; cities: number };
}

const GEO_URL = '/data/world-50m.json';

// The journey so far: Kuching → London (2023), London → San Francisco (2025)
const JOURNEY: { from: [number, number]; to: [number, number] }[] = [
    { from: [110.35, 1.55], to: [-0.12, 51.5] },
    { from: [-0.12, 51.5], to: [-122.42, 37.77] },
];

/** Simple house shape for the home marker, scaled by s. */
function housePath(s: number) {
    return [
        `M 0 ${-s}`,
        `L ${0.95 * s} ${-0.1 * s}`,
        `L ${0.55 * s} ${-0.1 * s}`,
        `L ${0.55 * s} ${0.85 * s}`,
        `L ${-0.55 * s} ${0.85 * s}`,
        `L ${-0.55 * s} ${-0.1 * s}`,
        `L ${-0.95 * s} ${-0.1 * s}`,
        'Z',
    ].join(' ');
}

/**
 * Show a single month per visit: "December 2025 – January 2026" → "December 2025",
 * "March–April 2025" → "March 2025". Non-date labels (e.g. Home) pass through.
 */
function formatVisit(visit: string) {
    const month = visit.match(
        /January|February|March|April|May|June|July|August|September|October|November|December/
    );
    const year = visit.match(/\d{4}/);
    return month && year ? `${month[0]} ${year[0]}` : visit;
}

export default function TravelMap({ cities, summary }: TravelMapProps) {
    const [hovered, setHovered] = useState<City | null>(null);
    const [selected, setSelected] = useState<City | null>(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const visitedIso = useMemo(() => new Set(cities.map((c) => Number(c.iso))), [cities]);

    // Shrink markers as the user zooms in so dense clusters (UK, Europe) stay readable
    const dotRadius = Math.max(1.1, 3 / Math.sqrt(zoom));

    return (
        <div
            className="relative w-full"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
        >
            {/* Stats strip */}
            <div className="flex items-center gap-6 mb-4 text-sm text-zinc-500">
                <span>
                    <span className="font-bold text-zinc-900 text-lg">{summary.countries}</span> countries
                </span>
                <span>
                    <span className="font-bold text-zinc-900 text-lg">{summary.cities}</span> cities
                </span>
                <span className="hidden sm:inline text-zinc-400 text-xs">Scroll to zoom · drag to pan · hover a dot</span>
            </div>

            <div className="rounded-3xl border border-zinc-100 bg-white shadow-sm overflow-hidden">
                <ComposableMap projection="geoEqualEarth" projectionConfig={{ scale: 160 }} style={{ width: '100%', height: 'auto' }}>
                    <ZoomableGroup
                        center={[15, 20]}
                        zoom={1}
                        minZoom={1}
                        maxZoom={16}
                        onMoveEnd={({ zoom: z }) => setZoom(z)}
                    >
                        <Geographies geography={GEO_URL}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const isVisited = visitedIso.has(Number(geo.id));
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={isVisited ? '#d4d4d8' : '#efeff1'}
                                            stroke="#ffffff"
                                            strokeWidth={0.4}
                                            style={{
                                                default: { outline: 'none' },
                                                hover: { outline: 'none', fill: isVisited ? '#c4c4ca' : '#e9e9eb' },
                                                pressed: { outline: 'none' },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                        {/* Flight-path arcs of the journey */}
                        <g className="flight-arc" aria-hidden>
                            {JOURNEY.map((leg, i) => (
                                <Line
                                    key={i}
                                    from={leg.from}
                                    to={leg.to}
                                    stroke="#0071e3"
                                    strokeWidth={1.1 / Math.sqrt(zoom)}
                                    strokeLinecap="round"
                                    fill="none"
                                    opacity={0.45}
                                />
                            ))}
                        </g>

                        {cities.map((city) => (
                            <Marker
                                key={city.name}
                                coordinates={city.coords}
                                onMouseEnter={() => setHovered(city)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => setSelected(selected?.name === city.name ? null : city)}
                            >
                                {city.home ? (
                                    <path
                                        d={housePath(dotRadius * 2.4 * (selected?.name === city.name ? 1.4 : 1))}
                                        fill="#18181b"
                                        stroke="#ffffff"
                                        strokeWidth={dotRadius * 0.4}
                                        strokeLinejoin="round"
                                        style={{ cursor: 'pointer' }}
                                    />
                                ) : (
                                    <circle
                                        r={dotRadius * (selected?.name === city.name ? 1.5 : 1)}
                                        fill={selected?.name === city.name ? '#005bb5' : '#0071e3'}
                                        stroke="#ffffff"
                                        strokeWidth={dotRadius * 0.35}
                                        style={{ cursor: 'pointer' }}
                                    />
                                )}
                            </Marker>
                        ))}
                    </ZoomableGroup>
                </ComposableMap>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 mt-3 text-xs text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                    <svg viewBox="-1.2 -1.2 2.4 2.4" className="w-2.5 h-2.5" aria-hidden>
                        <path d={housePath(1)} fill="#18181b" />
                    </svg>
                    Home
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0071e3]" /> Visited
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <svg viewBox="0 0 24 8" className="w-6 h-2" aria-hidden>
                        <path d="M0,4 H24" stroke="#0071e3" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                    </svg>
                    The journey
                </span>
            </div>

            {/* Hover tooltip (light) */}
            {hovered && (!selected || selected.name !== hovered.name) && (
                <div
                    className="absolute z-20 pointer-events-none bg-white/95 backdrop-blur-sm border border-zinc-200 rounded-xl shadow-xl px-3.5 py-2"
                    style={{
                        left: Math.min(mouse.x + 14, 9999),
                        top: mouse.y + 14,
                    }}
                >
                    <p className="font-semibold text-zinc-900 text-sm leading-tight whitespace-nowrap">
                        {hovered.flag} {hovered.name}
                    </p>
                    <p className="text-[0.65rem] text-zinc-400">click for details</p>
                </div>
            )}

            {/* Selected city card (pinned on click) */}
            {selected && (
                <div className="absolute z-30 top-16 right-3 md:right-5 bg-white/95 backdrop-blur-md border border-zinc-200 rounded-2xl shadow-2xl p-5 w-[240px] max-w-[calc(100%-1.5rem)]">
                    <button
                        onClick={() => setSelected(null)}
                        aria-label="Close"
                        className="absolute top-2.5 right-2.5 text-zinc-400 hover:text-zinc-900 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="text-3xl mb-2">{selected.flag}</div>
                    <p className="font-bold text-zinc-900 leading-tight">
                        {selected.name}
                        {selected.home && <span className="ml-1.5 text-[0.6rem] font-semibold uppercase tracking-widest text-emerald-600">Home</span>}
                    </p>
                    <p className="text-xs text-zinc-400 mb-3">{selected.country}</p>
                    <p className="text-[0.65rem] font-bold text-zinc-900 uppercase tracking-widest mb-1.5">
                        {selected.home ? 'Always' : selected.visits.length === 1 ? '1 visit' : `${selected.visits.length} visits`}
                    </p>
                    <ul className="text-xs text-zinc-600 space-y-1 max-h-36 overflow-y-auto pr-1">
                        {selected.visits.map((v) => (
                            <li key={v}>{formatVisit(v)}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
