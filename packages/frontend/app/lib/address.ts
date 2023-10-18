import { Address, getAddress } from 'viem';

export function formatAddress(address?: Address) {
  if (!address) return null;

  const niceAddress = getAddress(address);

  return `${niceAddress.slice(0, 6)}…${niceAddress.slice(-4)}`;
}
