"use client"

import { useState, useEffect } from 'react';

import { Noir } from '@noir-lang/noir_js';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import circuit from './circuit.json';

function Prove(input: { private_key: string, public_key: string, message_hash: string, useProof: (proof: Uint8Array) => void }) {
    const [noir, setNoir] = useState<Noir | null>(null);

    const calculateProof = async () => {
        console.log("Proof started")
        const proof = await noir!.generateFinalProof({
            private_key: input.private_key,
            public_key: input.public_key,
            message_hash: input.message_hash
        });
        console.log('Proof created: ', proof);
        input.useProof(proof);
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
        <div className="border" onClick={calculateProof}>Calculate Proof</div>
    );
}

export default Prove;