import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

function getQueryParam(url: string, param: string) {
  return new URL(url).searchParams.get(param);
}

export async function GET(request: Request) {
  const id = getQueryParam(request.url, "id") ?? "qr";

  const { data, error } = await supabase
    .from("scans")
    .select("count")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const count = data?.count ?? 0;
  return NextResponse.json({ id, count });
}

export async function POST(request: Request) {
  const id = getQueryParam(request.url, "id") ?? "qr";

  const { data: existing, error: selectError } = await supabase
    .from("scans")
    .select("count")
    .eq("id", id)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
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
