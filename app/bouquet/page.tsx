"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BouquetProvider } from "../../context/BouquetContext";
import BouquetCreationFlow from "../../components/bouquet/BouquetCreationFlow";

function BouquetContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "mono";

  return (
    <BouquetProvider mode={mode}>
      <BouquetCreationFlow />
    </BouquetProvider>
  );
}

// Main component that provides the context
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BouquetContent />
    </Suspense>
  );
}
