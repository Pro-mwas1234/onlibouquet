// app/bouquet/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import Bouquet from "../../../components/bouquet/Bouquet";
import Image from "next/image";
import Link from "next/link";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface BouquetData {
  id: string;
  [key: string]: any;
}

export default function BouquetPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<BouquetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBouquet = async () => {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        const { data, error } = await supabase
          .from("bouquets")
          .select()
          .eq("id", id)
          .single();

        if (error) throw error;
        setData(data || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBouquet();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>404 - Bouquet not found</div>;
  }

  return (
    <div className="text-center p-6 bg-[#F9F9EE]">
      {/* Logo/Branding */}
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
      <h2 className="text-lg mb-14 ">Hi, I made this bouquet for you!</h2>
      <Bouquet bouquet={data} />
      <p className="text-sm text-gray-500">
        made with Onlibouquet, a tool by{" "}
        <Link
          href="https://instagram.com/de._.hacker"
          className="text-sm underline text-gray-500 mt-2"
        >
          @Mwask
        </Link>
      </p>
      <Link href="/" className="text-sm underline text-gray-500 mt-2">
        make a bouquet now!
      </Link>
    </div>
  );
}
