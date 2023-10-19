export const BlockHashHistorianABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'BlockHashNotAvailable',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InputLengthsMismatch',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'InvalidBlock',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    name: 'UnknownBlockHash',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'getBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'historicalBlockHashes',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'blockNumbers',
        type: 'uint256[]',
      },
      {
        internalType: 'bytes[]',
        name: 'blockHeaderRLPs',
        type: 'bytes[]',
      },
    ],
    name: 'recordOld',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'recordRecent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
