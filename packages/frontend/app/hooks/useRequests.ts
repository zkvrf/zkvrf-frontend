import request, { type RequestDocument } from 'graphql-request';
import useSWR from 'swr';
import { Address } from 'viem';

export interface Request {
  operator: {
    id: string;
  };
  request: {
    requestId: bigint;
    requester: Address;
    minBlockConfirmations: number;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: string;
  };
  fulfillment: {
    randomness: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
  } | null;
}

interface Operator {
  id: string;
}

const fetcher = (query: RequestDocument) => {
  return request<{ requests: Request[]; operators: Operator[] }>(
    'https://api.studio.thegraph.com/query/7022/zkvrf-scroll-mainnet/version/latest',
    query
  );
};

export function useRequests() {
  return useSWR(
    `{
      requests(first: 1000) {
        operator {
          id
        }
        request {
          requestId
          requester
          minBlockConfirmations
          blockNumber
          blockTimestamp
          transactionHash
        }
        fulfillment {
          randomness
          blockNumber
          blockTimestamp
        }
      }
      operators(first: 1000) {
        id
      }
    }`,
    fetcher,
    {
      fallbackData: { requests: [], operators: [] },
    }
  );
}
