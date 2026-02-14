// app/stages/ShareBouquet.tsx (or wherever it lives)
import Image from "next/image";
import { flowers } from "../../data/data";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import Bouquet from "../bouquet/Bouquet";
import { useBouquet } from "../../context/BouquetContext";
import type { Bouquet as BouquetType } from "@/types/bouquet";

export default function ShareBouquet() {
  const { bouquet } = useBouquet();

  const getFlowerDimensions = (size: string) => {
    switch (size) {
      case "small":
        return 80;
      case "large":
        return 160;
      default:
        return 120;
    }
  };

  const router = useRouter();

  const handleCreateBouquet = async (bouquet: BouquetType) => {
    const short_id = nanoid(8);

    // 🔒 Fix: Ensure greenery is a proper boolean
    const cleanGreenery =
      bouquet.greenery === true ||
      bouquet.greenery === "true" ||
      bouquet.greenery === 1 ||
      bouquet.greenery === "1";

    const { data, error } = await supabase
      .from("bouquets")
      .insert([
        {
          short_id: short_id,
          mode: bouquet.mode,
          flowers: bouquet.flowers,
          letter: bouquet.letter,
          timestamp: bouquet.timestamp,
          greenery: cleanGreenery, // ✅ Now always boolean
          flowerOrder: bouquet.flowerOrder,
        },
      ])
      .select();

    if (error || !data || data.length === 0) {
      console.error("Error creating bouquet:", error);
      return;
    }

    router.push(`/bouquet/${data[0].id}`);
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
