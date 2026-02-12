// app/garden/page.tsx
import { supabase } from "@/lib/supabase";

export default async function TestGardenPage() {
  const { data, error } = await supabase
    .from("bouquets")
    .select("*")
    .order("created_at", { ascending: false });

  // Log to terminal (server-side) and browser console (if client component)
  console.log("Supabase response:", { data, error });

  if (error) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2 style={{ color: "red" }}>❌ Supabase Error</h2>
        <p><strong>Message:</strong> {error.message}</p>
        <p><strong>Code:</strong> {error.code}</p>
        <p><strong>Details:</strong> {error.details || "None"}</p>
        <p><strong>Hint:</strong> {error.hint || "None"}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2>⚠️ No Data</h2>
        <p>Supabase returned no data (data is null/undefined).</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h2>🌱 Garden is Empty</h2>
        <p>No bouquets found in the database.</p>
        <p>Try creating one first!</p>
      </div>
    );
  }

  // Success: show raw data
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>✅ Found {data.length} Bouquet(s)</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
