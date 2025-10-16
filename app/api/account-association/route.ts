import { NextRequest } from "next/server";
import { generateAccountAssociation } from "@coinbase/onchainkit/tools/account-association";

export async function POST(request: NextRequest) {
  try {
    const association = await generateAccountAssociation({
      app: {
        name: "Base Counter",
        url: "https://my-minikit-app-dusky.vercel.app",
      },
      address: "0x22Ad46687fd77BF1E5BAE9ca95D55b03F6Da45C6",
    });

    return Response.json(association);
  } catch (error) {
    console.error("Error generating account association:", error);
    return Response.json(
      { error: "Failed to generate account association" },
      { status: 500 }
    );
  }
}
