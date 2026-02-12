// app/garden/page.tsx
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import BouquetOnly from "../../components/bouquet/BouquetOnly";

export default async function AllBouquetsPage() {
  const { data, error } = await supabase
    .from("bouquets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return <div className="text-center p-6">Error fetching bouquets.</div>;
  }

  return (
    <div className="text-center p-6">
      <Link href="/">
        <Image
          src="/digibouquet.png"
          alt="digibouquet"
          width={200}
          height={80}
          className="object-cover mx-auto my-10"
          priority
        />
      </Link>

      <h2 className="text-md uppercase mb-4">OUR GARDEN</h2>
      <p className="text-sm opacity-50 mb-10">Thanks for stopping by!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {data.map((bouquet) => (
          <div key={bouquet.id} className="flex flex-col items-center">
            <div className="mb-4">
              <BouquetOnly bouquet={bouquet} />
            </div>
            <p className="text-sm text-gray-500">
              {new Date(bouquet.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
