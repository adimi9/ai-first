// pages/division/index.tsx or whatever your Division page is named
"use client";

import Image from "next/image";
import React from 'react';
import dynamic from 'next/dynamic'; // Import dynamic

// Dynamically import DivisionContent with ssr: false
const DynamicDivisionContent = dynamic(() => import('@/components/division-content'), {
  ssr: false, // This ensures the component is only rendered on the client side
  loading: () => (
    <div className="px-4">
      {/* Fallback for when the client-side component is loading */}
      <div className="max-w-6xl mx-auto p-6 text-center">
        Loading division details...
      </div>
    </div>
  ),
});

export default function Division() {
  return (
    <div>
      <div>
        <Image
          src="/banner.png"
          alt="Mountains that everybody love"
          width={1600}
          height={200}
          className="w-full"
          priority
        />
      </div>

      {/* Render the dynamically imported component */}
      <DynamicDivisionContent />
    </div>
  );
}
