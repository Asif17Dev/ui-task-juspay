"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Progress } from "@/components/ui/progress"; // shadcn progress

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  {
    city: "New York",
    value: 72,
    label: "72K",
    coordinates: [-74.006, 40.7128],
  },
  {
    city: "San Francisco",
    value: 39,
    label: "39K",
    coordinates: [-122.4194, 37.7749],
  },
  {
    city: "Sydney",
    value: 25,
    label: "25K",
    coordinates: [151.2093, -33.8688],
  },
  {
    city: "Singapore",
    value: 61,
    label: "61K",
    coordinates: [103.8198, 1.3521],
  },
];

export function LocationMap() {
  return (
    <Card className="border-none bg-[#F7F9FB] dark:bg-[#FFFFFF0D]">
      <CardHeader>
        <CardTitle className="text-lg">Revenue by Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-40">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 120 }}
            width={800}
            height={400}
            className="w-full h-full"
          >
            {/* World map */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#E5ECF6",
                        stroke: "#FFFFFF",
                        strokeWidth: 0.5,
                      },
                      hover: { fill: "#CBD5E1" },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Markers */}
            {locations.map(({ city, coordinates, label }) => (
              <Marker key={city} coordinates={coordinates}>
                <circle r={6} fill="#2563EB" stroke="#fff" strokeWidth={2} />
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fill: "#111827",
                  }}
                >
                  {label}
                </text>
              </Marker>
            ))}
          </ComposableMap>
        </div>

        {/* Location list with progress */}
        <div className="space-y-4 mt-4">
          {locations.map((location) => (
            <div key={location.city}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">{location.city}</span>
                <span className="font-medium">{location.label}</span>
              </div>
              <Progress
                value={location.value}
                className="h-2 [&>div]:bg-[#A8C5DA]  dark:bg-[#5e5e5e66] bg-[#a8c5da5b]"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
