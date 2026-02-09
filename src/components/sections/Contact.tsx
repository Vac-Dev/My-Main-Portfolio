import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Map, MapControls, MapMarker, MarkerContent, useMap } from "@/components/ui/map";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

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

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsLoading(true);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );

      toast.success("Message sent successfully!");
      formRef.current.reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">Contact</h2>
      <Separator className="my-4" />

      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        Have a question or want to work together? Fill out the form below and I'll get
        back to you as soon as possible.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="user_name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <Input
              id="user_name"
              name="user_name"
              placeholder="Your name"
              required
              className="bg-background"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="user_email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <Input
              id="user_email"
              name="user_email"
              type="email"
              placeholder="your@email.com"
              required
              className="bg-background"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-foreground">
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            placeholder="What is this about?"
            required
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message..."
            rows={6}
            required
            className="resize-none bg-background"
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>

      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <div className="h-[280px] w-full">
          <Map center={MENLYN_CENTER} zoom={10} className="h-full w-full">
            <MapRadiusCircle />
            <MapLocationMarker />
            <MapControls />
          </Map>
        </div>
      </div>
    </section>
  );
}
