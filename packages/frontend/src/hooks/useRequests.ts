import request, { type RequestDocument, Variables } from 'graphql-request';
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

const fetcher = ([query, variables]: [RequestDocument, Variables]) => {
  return request<{ requests: Request[]; operators: Operator[] }>(
    'https://api.studio.thegraph.com/query/7022/zkvrf-scroll-mainnet/version/latest',
    query,
    variables
  );
};

export function useRequests() {
  return useSWR(
    [
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
    ],
    fetcher,
    {
      fallbackData: { requests: [], operators: [] },
    }
  );
}

export function useOperatorRequests({ operator }: { operator: string }) {
  return useSWR(
    [
      `query Requests($operator: String) {
        requests(first: 1000, where: {operator: $operator}) {
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
      { operator },
    ],
    fetcher,
    {
      fallbackData: { requests: [], operators: [] },
    }
  );
}
