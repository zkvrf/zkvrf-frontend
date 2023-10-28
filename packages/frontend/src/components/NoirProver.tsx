'use client';

import { BarretenbergBackend } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import { useMemo } from "react";
import useSWR from "swr";
import { circuit } from "./circuit";
import { InputMap } from "@noir-lang/noirc_abi";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

export function NoirProver({
    inputs,
    onSuccess,
  }: {
    inputs: InputMap;
    onSuccess?: (proof: Uint8Array) => void;
  }) {
    const { isLoading, mutate: calculateProof } = useProver({
      inputs,
      onSuccess,
    });
  
    return (
      <Button
        className="w-full"
        disabled={isLoading}
        onClick={() => calculateProof()}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Calculate
        Proof
      </Button>
    );
  }

export function useProver({
    inputs,
    onSuccess,
  }: {
    inputs: InputMap;
    onSuccess?: (proof: Uint8Array) => void;
  }) {
    const noir = useMemo(() => {
      const backend = new BarretenbergBackend(circuit);
      return new Noir(circuit, backend);
    }, []);
  
    return useSWR(
      [inputs],
      async ([inputs]) => {
        const data = await noir.generateFinalProof(inputs);
  
        return data.proof;
      },
      {
        revalidateOnMount: false,
        onSuccess,
        onError(error) {
          console.error(error);
        },
      }
    );
  }