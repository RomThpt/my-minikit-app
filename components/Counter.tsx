"use client";
import { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { COUNTER_ADDRESS, counterAbi } from "@/lib/counter";

export default function Counter() {
    const { chainId, isConnected } = useAccount();

    const { data: count, isLoading: isReading, refetch } = useReadContract({
        address: COUNTER_ADDRESS,
        abi: counterAbi,
        functionName: "number",
        chainId: baseSepolia.id,
        query: {
            refetchInterval: 5_000,
        },
    });

    const { writeContract, data: txHash, isPending, error: writeError } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash: txHash,
        confirmations: 1,
    });

    const [value, setValue] = useState<string>("");

    const canTransact = isConnected && chainId === baseSepolia.id;
    const wrongNetwork = isConnected && chainId !== baseSepolia.id;

    const countLabel = useMemo(() => {
        if (isReading) return "…";
        if (typeof count === "bigint") return count.toString();
        return String(count ?? "?");
    }, [count, isReading]);

    function onIncrement() {
        if (!canTransact) return;
        writeContract({
            address: COUNTER_ADDRESS,
            abi: counterAbi,
            functionName: "increment",
            chainId: baseSepolia.id,
        });
    }

    function onSet() {
        if (!canTransact) return;
        const n = BigInt(value || "0");
        writeContract({
            address: COUNTER_ADDRESS,
            abi: counterAbi,
            functionName: "setNumber",
            args: [n],
            chainId: baseSepolia.id,
        });
    }

    // Refresh after confirm
    useEffect(() => {
        if (isConfirmed) {
            refetch();
        }
    }, [isConfirmed, refetch]);

    return (
        <div style={{ display: "grid", gap: 12, maxWidth: 360, width: "100%" }}>
            <div style={{ fontSize: 14, opacity: 0.8 }}>
                Contract: <code>{COUNTER_ADDRESS}</code>
            </div>
            <div style={{ fontSize: 24 }}>
                Current count: <strong>{countLabel}</strong>
            </div>

            {wrongNetwork && (
                <div style={{ color: "#c00", fontSize: 14 }}>
                    Please switch to Base Sepolia to interact.
                </div>
            )}

            <div style={{ display: "flex", gap: 8 }}>
                <button
                    onClick={onIncrement}
                    disabled={!canTransact || isPending || isConfirming}
                    style={{ padding: "8px 12px" }}
                >
                    {isPending ? "Sending…" : isConfirming ? "Confirming…" : "Increment"}
                </button>

                <input
                    type="number"
                    min={0}
                    placeholder="Set number…"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    style={{ flex: 1, padding: "8px 12px" }}
                />
                <button
                    onClick={onSet}
                    disabled={!canTransact || isPending || isConfirming || value === ""}
                    style={{ padding: "8px 12px" }}
                >
                    Set
                </button>
            </div>

            {writeError && (
                <div style={{ color: "#c00", fontSize: 12 }}>
                    {writeError.message}
                </div>
            )}
            {txHash && (
                <a
                    href={`https://sepolia.basescan.org/tx/${txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 12 }}
                >
                    View on BaseScan ↗
                </a>
            )}
        </div>
    );
}
