import { generateAccountAssociation } from "@coinbase/onchainkit/account-association";

const APP_NAME = "Base Counter";
const APP_URL = "https://my-minikit-app-dusky.vercel.app";

async function main() {
  try {
    const association = await generateAccountAssociation({
      app: {
        name: APP_NAME,
        url: APP_URL,
      },
      address: "0x22Ad46687fd77BF1E5BAE9ca95D55b03F6Da45C6",
    });

    console.log("Add this to your minikit.config.ts accountAssociation:");
    console.log(JSON.stringify(association, null, 2));
  } catch (error) {
    console.error("Error generating account association:", error);
  }
}

main();
