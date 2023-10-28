'use client';

import { NoirProver } from './NoirProver';

export function Prove({
  publicKey,
  privateKey,
  messageHash,
  onSuccess,
}: {
  publicKey: string;
  privateKey: string;
  messageHash: string;
  onSuccess?: (proof: Uint8Array) => void;
}) {

  return (
    <NoirProver
      inputs={{
        private_key: privateKey,
        public_key: publicKey,
        message_has: messageHash,
      }}
      onSuccess={onSuccess} />
  )
}
