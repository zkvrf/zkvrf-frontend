'use client';

import { circuit } from './circuit';
import { Button } from './ui/button';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import { useMemo } from 'react';

export function Prove(input: {
  private_key: string;
  public_key: string;
  message_hash: string;
  useProof: (proof: Uint8Array) => void;
}) {
  const noir = useMemo(() => {
    const backend = new BarretenbergBackend(circuit);
    return new Noir(circuit, backend);
  }, []);

  const calculateProof = async () => {
    console.log('Proof started');
    const proof = await noir!.generateFinalProof({
      private_key: input.private_key,
      public_key: input.public_key,
      message_hash: input.message_hash,
    });
    console.log('Proof created: ', proof);
    input.useProof(proof.proof);
  };

  return <Button onClick={calculateProof}>Calculate Proof</Button>;
}
