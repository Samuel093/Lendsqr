// app/api/users/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // TODO: replace with DB call / real backend proxy
  const fake = {
    id,
    name: "Grace Effiom",
    username: "grace.e",
    email: "grace@gmail.com",
    phone: "07060780922",
    created_at: "2024-06-01T00:00:00Z",
    status: "active",
    bank: {
      bank_name: "Providus Bank",
      account_number: "1234567890",
      account_name: "Grace Effiom",
      bvn: "07060780922",
    },
    documents: [],
    loans: [],
    savings: [],
    meta: {
      last_active: "2025-01-12",
      ip: "127.0.0.1",
      device: "Chrome on Windows",
    },
  };

  return NextResponse.json(fake);
}
