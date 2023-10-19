export const zkvrfABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'verifier_',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'blockHashHistorian_',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'operatorPublicKey',
        type: 'bytes32',
      },
    ],
    name: 'OperatorRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'operatorPublicKey',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'randomness',
        type: 'uint256',
      },
    ],
    name: 'RandomnessFulfilled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'operatorPublicKey',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'minBlockConfirmations',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'callbackGasLimit',
        type: 'uint32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
    ],
    name: 'RandomnessRequested',
    type: 'event',
  },
  {
    inputs: [],
    name: 'P',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'blockHashHistorian',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'operatorPublicKey',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'blockNumber',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'minBlockConfirmations',
            type: 'uint16',
          },
          {
            internalType: 'uint32',
            name: 'callbackGasLimit',
            type: 'uint32',
          },
          {
            internalType: 'address',
            name: 'requester',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256',
          },
        ],
        internalType: 'struct ZKVRF.VRFRequest',
        name: 'request',
        type: 'tuple',
      },
      {
        internalType: 'bytes32[2]',
        name: 'signature',
        type: 'bytes32[2]',
      },
      {
        internalType: 'bytes',
        name: 'snarkProof',
        type: 'bytes',
      },
    ],
    name: 'fulfillRandomness',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'lastOperator',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'maxPageSize',
        type: 'uint256',
      },
    ],
    name: 'getOperators',
    outputs: [
      {
        internalType: 'bytes32[]',
        name: 'out',
        type: 'bytes32[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOperatorsCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256',
      },
    ],
    name: 'hashSeedToField',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'hash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'operatorPublicKey',
        type: 'bytes32',
      },
    ],
    name: 'isOperator',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextRequestId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'randomness',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'publicKey',
        type: 'bytes32',
      },
    ],
    name: 'registerOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'requester',
        type: 'address',
      },
    ],
    name: 'requestNonces',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'operatorPublicKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint16',
        name: 'minBlockConfirmations',
        type: 'uint16',
      },
      {
        internalType: 'uint32',
        name: 'callbackGasLimit',
        type: 'uint32',
      },
    ],
    name: 'requestRandomness',
    outputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256',
      },
    ],
    name: 'requests',
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
    inputs: [],
    name: 'verifier',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
