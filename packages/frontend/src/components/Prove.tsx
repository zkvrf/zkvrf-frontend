'use client';

import { circuit } from './circuit';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { Noir } from '@noir-lang/noir_js';
import { useEffect, useState } from 'react';

export function Prove(input: {
  private_key: string;
  public_key: string;
  message_hash: string;
  useProof: (proof: Uint8Array) => void;
}) {
  const [noir, setNoir] = useState<Noir | null>(null);

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

  const initNoir = async () => {
    const backend = new BarretenbergBackend(circuit);
    const noir = new Noir(circuit, backend);
    setNoir(noir);
  };

  useEffect(() => {
    initNoir();
  }, []);

  return (
    <div className="border" onClick={calculateProof}>
      Calculate Proof
    </div>
  );
}
