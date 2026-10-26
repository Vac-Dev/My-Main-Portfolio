import { useEffect, useRef } from "react";
import { Map, MapControls, MapMarker, MarkerContent, useMap } from "@/components/ui/map";

const MENLYN_CENTER: [number, number] = [28.275, -25.783];
const RADIUS_KM = 15;

function circlePolygon(lng: number, lat: number, radiusKm: number, points = 64): [number, number][] {
  const coords: [number, number][] = [];
  const latDegPerKm = 1 / 111.32;
  const lngDegPerKm = 1 / (111.32 * Math.cos((lat * Math.PI) / 180));
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    coords.push([
      lng + radiusKm * lngDegPerKm * Math.cos(angle),
      lat + radiusKm * latDegPerKm * Math.sin(angle),
    ]);
  }
  return coords;
}

function MapLocationMarker() {
  return (
    <MapMarker longitude={MENLYN_CENTER[0]} latitude={MENLYN_CENTER[1]}>
      <MarkerContent className="flex h-3 w-3 items-center justify-center rounded-full bg-primary shadow-md ring-2 ring-background" />
    </MapMarker>
  );
}

function MapRadiusCircle() {
  const { map, isLoaded } = useMap();
  const addedRef = useRef(false);

  useEffect(() => {
    if (!isLoaded || !map || addedRef.current) return;
    const sourceId = "radius-circle-source";
    const layerId = "radius-circle-layer";
    const ringId = "radius-circle-ring";

    const coords = circlePolygon(MENLYN_CENTER[0], MENLYN_CENTER[1], RADIUS_KM);
    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: { type: "Polygon", coordinates: [coords] },
      },
    });
    map.addLayer({
      id: layerId,
      type: "fill",
      source: sourceId,
      paint: {
        "fill-color": "#3b82f6",
        "fill-opacity": 0.12,
      },
    });
    map.addLayer({
      id: ringId,
      type: "line",
      source: sourceId,
      paint: {
        "line-color": "#3b82f6",
        "line-width": 1.5,
        "line-opacity": 0.5,
      },
    });
    addedRef.current = true;
    return () => {
      try {
        if (map.getLayer(ringId)) map.removeLayer(ringId);
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {}
      addedRef.current = false;
    };
  }, [map, isLoaded]);

  return null;
}

export default function ContactMap() {
  return (
    <Map center={MENLYN_CENTER} zoom={10} className="h-full w-full">
      <MapRadiusCircle />
      <MapLocationMarker />
      <MapControls />
    </Map>
  );
}
