const ROOT_URL =
  process.env.NEXT_PUBLIC_URL || "https://my-minikit-app-dusky.vercel.app";

/**
 * MiniApp configuration object. Must follow the mini app manifest specification.
 *
 * @see {@link https://docs.base.org/mini-apps/features/manifest}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
  baseBuilder: {
    ownerAddress: "0x22Ad46687fd77BF1E5BAE9ca95D55b03F6Da45C6",
    allowedAddresses: [],
  },
  miniapp: {
    version: "1",
    name: "Base Counter",
    subtitle: "Simple counter on Base Sepolia",
    description:
      "A decentralized counter app that lets you increment and set values on Base Sepolia testnet.",
    screenshotUrls: [`${ROOT_URL}/screenshot.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "utility",
    tags: ["defi", "base", "counter", "demo"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Manage your counter on Base Sepolia",
    ogTitle: "Base Counter - Simple Counter dApp",
    ogDescription:
      "Interact with a smart contract counter on Base Sepolia testnet",
    ogImageUrl: `${ROOT_URL}/hero.png`,
  },
} as const;
