// app/garden/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import BouquetOnly from "../../components/bouquet/BouquetOnly";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface Bouquet {
  id: string;
  created_at: string;
  [key: string]: any;
}

export default function AllBouquetsPage() {
  const [data, setData] = useState<Bouquet[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBouquets = async () => {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data, error } = await supabase
          .from("bouquets")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setData(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBouquets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error fetching bouquets: {error}</div>;
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

      {/* Page title */}
      <h2 className="text-md uppercase mb-4 ">OUR GARDEN</h2>
      <p className="text-sm opacity-50 mb-10">Thanks for stopping by!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {data.map((bouquet) => (
          //   <Link href={`/bouquet/${bouquet.id}`} key={bouquet.id}>
          <div>
            <div>
              <BouquetOnly bouquet={bouquet} />
            </div>
            <p className="text-sm text-gray-500 m-10">
              {new Date(bouquet.created_at).toLocaleDateString()}
            </p>
          </div>

          //   </Link>
        ))}
      </div>
    </div>
  );
}
