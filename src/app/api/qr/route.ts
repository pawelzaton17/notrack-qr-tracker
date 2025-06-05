import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

function getQueryParam(url: string, param: string) {
  return new URL(url).searchParams.get(param);
}

export async function GET(request: Request) {
  const id = getQueryParam(request.url, "id");

  if (id) {
    const { data, error } = await supabase
      .from("scans")
      .select("count")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const count = data?.count ?? 0;
    return NextResponse.json({ id, count });
  } else {
    const { data, error } = await supabase
      .from("scans")
      .select("id, count");

    if (error) {
      console.error("Supabase GET all error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ scans: data ?? [] });
  }
}

export async function POST(request: Request) {
  const id = getQueryParam(request.url, "id") ?? "qr";

  const { data: existing, error: selectError } = await supabase
    .from("scans")
    .select("count")
    .eq("id", id)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    console.error("Supabase POST select error:", selectError);
    return NextResponse.json({ error: selectError.message }, { status: 500 });
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("scans")
      .update({ count: existing.count + 1 })
      .eq("id", id);

    if (updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 });
  } else {
    const { error: insertError } = await supabase
      .from("scans")
      .insert({ id, count: 1 });

    if (insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Skan zapisany!", id });
}

export async function PATCH(request: Request) {
  const id = getQueryParam(request.url, "id");
  if (!id) return NextResponse.json({ error: "Brak id" }, { status: 400 });

  const { count } = await request.json();

  const { error } = await supabase
    .from("scans")
    .update({ count })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Zresetowano" });
}