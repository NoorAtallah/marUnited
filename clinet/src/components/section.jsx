'use client';

import {FullScreenScrollFX } from "@/components/hero";

export default function Home() {
  const sections = [
    {
      leftLabel: "Mineral Rich",
      title: "Dead Sea Mud Mask",
      rightLabel: "Purifying",
      background: "https://images.pexels.com/photos/3738388/pexels-photo-3738388.jpeg",
    },
    {
      leftLabel: "Hydrating",
      title: "Salt Scrub",
      rightLabel: "Exfoliating",
      background: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg",
    },
    {
      leftLabel: "Nourishing",
      title: "Mineral Body Cream",
      rightLabel: "Rejuvenating",
      background: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
    },
    {
      leftLabel: "Therapeutic",
      title: "Bath Salts",
      rightLabel: "Relaxing",
      background: "https://images.pexels.com/photos/4046304/pexels-photo-4046304.jpeg",
    },
  ];

  return (
    <div>
      <FullScreenScrollFX 
        sections={sections}
        header={
          <>
            <div>Pure Dead Sea</div>
            <div>Minerals</div>
          </>
        }
        footer={<div>Naturally Beautiful</div>}
        showProgress={true}
        colors={{
          text: "#2d2d2d",
          overlay: "rgba(203,194,215,0.3)",
          pageBg: "#F6F4F7",
          stageBg: "#cbc2d7",
        }}
      />
    </div>
  );
}