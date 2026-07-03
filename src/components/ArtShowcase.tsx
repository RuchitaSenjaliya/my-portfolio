"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Palette } from "lucide-react";
import Image from "next/image";

export default function ArtShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const artworks = [
    {
      id: "art-1",
      title: "Mandala Meditation No. 12",
      type: "Mandala Art",
      medium: "Ink on Textured Paper",
      description:
        "A precise, radially symmetrical geometric mandala, focusing on alignment and structural details. Radial symmetry reinforces visual balance.",
      image:
        "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=600&auto=format&fit=crop",
      heightClass: "h-[360px] md:h-[400px]", // Tall card
    },
    {
      id: "art-2",
      title: "Golden Sunset Wave",
      type: "Canvas Painting",
      medium: "Acrylic on Canvas",
      description:
        "A study of warm colors, sunset gradients, and fluid waves. Explores light contrast values.",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=600&auto=format&fit=crop",
      heightClass: "h-[220px] md:h-[260px]", // Short card
    },
    {
      id: "art-3",
      title: "Ocean Serenity at Night",
      type: "Canvas Painting",
      medium: "Acrylic on Canvas",
      description:
        "Deep blues and layered visual currents. Highlights glassmorphism textures and depth.",
      image:
        "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
      heightClass: "h-[280px] md:h-[320px]", // Medium card
    },
    {
      id: "art-4",
      title: "Cosmic Geometric Alignment",
      type: "Abstract Art",
      medium: "Mixed Media on Wood Panel",
      description:
        "Intersecting axes, concentric spheres, and triangles. Focuses on spatial layout coordinates.",
      image:
        "https://images.unsplash.com/photo-1507908708418-77143f545171?q=80&w=600&auto=format&fit=crop",
      heightClass: "h-[380px] md:h-[440px]", // Very Tall card
    },
    {
      id: "art-5",
      title: "Sacred Flower of Life",
      type: "Mandala Art",
      medium: "Gold Foil on Indigo Canvas",
      description:
        "A geometric pattern formed by overlapping circles. Visualizes complex mathematical proportion nodes.",
      image:
        "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=600&auto=format&fit=crop",
      heightClass: "h-[240px] md:h-[280px]", // Short card
    },
    {
      id: "art-6",
      title: "Nebula Harmony",
      type: "Canvas Painting",
      medium: "Alcohol Ink on Paper",
      description:
        "Flowing violet, magenta, and gold ink clouds. Integrates abstract color blending.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
      heightClass: "h-[320px] md:h-[380px]", // Medium-Tall card
    },
  ];

  return (
    <section
      id="art"
      ref={ref}
      className="py-24 bg-background relative overflow-hidden"
    >
      {/* Decorative backdrop gradients */}
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary border border-secondary/20 mb-4"
          >
            <Palette className="w-4 h-4 animate-bounce" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Canvas & Mandala Art Showcase
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
          >
            Where Code Meets Creativity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-foreground/70 text-sm sm:text-base leading-relaxed"
          >
            Geometric mandalas and fluid canvas designs. Hover over any frame in
            the masonry gallery to reveal details.
          </motion.p>
        </div>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 max-w-5xl mx-auto space-y-6">
          {artworks.map((art, idx) => (
            <motion.div
              key={art.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`break-inside-avoid w-full group relative rounded-3xl border border-card-border overflow-hidden bg-slate-900 flex items-center justify-center hover:border-secondary/40 hover:shadow-2xl transition-all duration-300 ${art.heightClass}`}
            >
              <Image
                src={art.image}
                alt={art.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />

              {/* Shadow Frame Overlay (Physical Canvas Frame Feeling) */}
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />

              {/* Hover-reveal Glassmorphic Info Card (fades/slides up) */}
              <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-6 text-white rounded-3xl">
                {/* Header info */}
                <div>
                  <span className="text-[8px] bg-secondary border border-secondary/35 text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {art.type}
                  </span>
                  <h3 className="text-base font-bold mt-4 tracking-tight leading-tight">
                    {art.title}
                  </h3>
                  <span className="text-[9px] text-secondary/85 font-semibold block mt-1">
                    {art.medium}
                  </span>
                  <p className="text-[11px] text-white/70 leading-normal mt-3">
                    {art.description}
                  </p>
                </div>

                {/* Footer info */}
                <div className="border-t border-white/10 pt-3 flex items-center justify-between text-[8px] font-bold uppercase tracking-wider text-white/40">
                  <span>Radially Aligned</span>
                  <span className="flex items-center gap-1 text-secondary">
                    <Sparkles className="w-3.5 h-3.5" /> Creative
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
