// app/stages/ShareBouquet.tsx
"use client";

import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import Bouquet from "../bouquet/Bouquet";
import { useBouquet } from "../../context/BouquetContext";
import type { Bouquet as BouquetType } from "@/types/bouquet";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default function ShareBouquet() {
  const { bouquet } = useBouquet();

  // Helper function to get flower dimensions based on size
  const getFlowerDimensions = (size: string) => {
    switch (size) {
      case "small":
        return 80;
      case "large":
        return 160;
      default:
        return 120; // medium
    }
  };

  const router = useRouter();

  const handleCreateBouquet = async (bouquet: BouquetType) => {
    const short_id = nanoid(8);

    // ✅ Safely normalize greenery to boolean (fixes "2" error + TS compile)
    const rawGreenery: unknown = bouquet.greenery;
    const cleanGreenery =
      rawGreenery === true ||
      rawGreenery === "true" ||
      rawGreenery === 1 ||
      rawGreenery === "1";

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from("bouquets")
      .insert([
        {
          short_id: short_id,
          mode: bouquet.mode,
          flowers: bouquet.flowers,
          letter: bouquet.letter,
          timestamp: bouquet.timestamp,
          greenery: cleanGreenery, // 👈 now guaranteed boolean
          flowerOrder: bouquet.flowerOrder,
        },
      ])
      .select(); // returns inserted row(s)

    if (error || !data || data.length === 0) {
      console.error("Error creating bouquet:", error);
      return;
    }

    const bouquetId = data[0].id;
    router.push(`/bouquet/${bouquetId}`);
  };

  return (
    <div className="text-center">
      <h2 className="text-md uppercase text-center mb-10">SEND THE BOUQUET</h2>

      <Bouquet bouquet={bouquet} />
      <button
        onClick={() => {
          console.log("Sending bouquet");
          handleCreateBouquet(bouquet);
        }}
        className="uppercase text-white bg-black px-5 py-3"
      >
        CREATE SHAREABLE LINK
      </button>
    </div>
  );
}
