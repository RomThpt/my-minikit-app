import type { Abi } from "viem";

// Base Sepolia Counter contract address provided by the user
export const COUNTER_ADDRESS =
  "0x3064Dd8E493D0Fbd582876DA73afc19C2E8F3484" as const;

// Minimal ABI for the Counter contract
export const counterAbi = [
  {
    type: "function",
    name: "number",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "setNumber",
    stateMutability: "nonpayable",
    inputs: [{ name: "newNumber", type: "uint256" }],
    outputs: [],
  },
  {
    type: "function",
    name: "increment",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
] as const satisfies Abi;
