// components/DivisionContent.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import OKRDetail from "@/components/okr-details";
import React from 'react';

export default function DivisionContent() {
  const searchParams = useSearchParams();
  const divisionName = searchParams.get('name') || 'CMG - Corporate Comms';

  return (
    <div className="px-4">
      {/* The OKRDetail itself has max-w-6xl mx-auto p-6, which will center it
          within this new px-4 padded container. */}
      <OKRDetail divisionName={divisionName} />
    </div>
  );
}
