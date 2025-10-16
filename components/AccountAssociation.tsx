"use client";

import { useState } from "react";
import { useWalletClient } from "wagmi";

export default function AccountAssociation() {
    const { data: walletClient } = useWalletClient();
    const [association, setAssociation] = useState<{ header: string; payload: string; signature: string } | null>(null);

    async function generateAssociation() {
        if (!walletClient) return;

        try {
            const message = JSON.stringify({
                name: "Base Counter",
                url: "https://my-minikit-app-dusky.vercel.app",
                address: walletClient.account.address,
                timestamp: Date.now(),
            });

            const signature = await walletClient.signMessage({ message });

            const association = {
                header: "Base Counter Association",
                payload: message,
                signature,
            };

            setAssociation(association);
            console.log("Add this to your minikit.config.ts accountAssociation:");
            console.log(JSON.stringify(association, null, 2));
        } catch (error) {
            console.error("Error generating association:", error);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>Generate Account Association</h2>
            <button onClick={generateAssociation}>
                Generate Association
            </button>
            {association && (
                <pre style={{ marginTop: "20px", padding: "10px", background: "#f5f5f5" }}>
                    {JSON.stringify(association, null, 2)}
                </pre>
            )}
        </div>
    );
}