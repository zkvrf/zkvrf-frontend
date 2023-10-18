import { useState, useEffect } from 'react';

import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import circuit from '../lib/circuit.json';
import { Button } from './ui/button';

function Prove(input: { private_key: string, public_key: string, message_hash: string }) {
  const [proof, setProof] = useState<Uint8Array|null>();
  const [noir, setNoir] = useState<Noir | null>(null);

  const calculateProof = async () => {
    new Promise(async (resolve, reject) => {
      const proof = await noir!.generateFinalProof(input);
      console.log('Proof created: ', proof);
      setProof(proof);
      resolve(proof);
    });
  };

  const initNoir = async () => {
    const backend = new BarretenbergBackend(circuit as any);
    const noir = new Noir(circuit as any, backend);
    setNoir(noir);
  };

  useEffect(() => {
    initNoir();
  }, []);

  return (
    <>
      <Button onClick={calculateProof}>Calculate Proof</Button>
    </>
  );
}

export default Prove;