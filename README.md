````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-onchain`](https://www.npmjs.com/package/create-onchain).

## Getting Started

First, install dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Counter on Base Sepolia

This app connects to a Counter contract deployed on Base Sepolia:

- Address: `0x3064Dd8E493D0Fbd582876DA73afc19C2E8F3484`
- Explorer: https://sepolia.basescan.org/address/0x3064Dd8E493D0Fbd582876DA73afc19C2E8F3484

How it works:

- Read current value via `number()`
- Increment via `increment()`
- Set to an arbitrary value via `setNumber(uint256)`

Requirements:

- A wallet connected to Base Sepolia with test ETH
- OnchainKit API key in `.env` as `NEXT_PUBLIC_ONCHAINKIT_API_KEY`

## Deployment

This app can be deployed to Vercel with these steps:

1. Fork/clone this repository
2. Create a new project on [Vercel](https://vercel.com)
3. Connect your repository
4. Set the following environment variables:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY` - Get from [OnchainKit](https://www.onchainkit.xyz/)
5. Deploy!

## Learn More

To learn more about OnchainKit, see our [documentation](https://docs.base.org/onchainkit).

To learn more about Next.js, see the [Next.js documentation](https://nextjs.org/docs).
````
