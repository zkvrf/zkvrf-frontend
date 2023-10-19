'use client';

import { Prove } from './Prove';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useToast } from './ui/use-toast';
import { DialogDescription } from '@radix-ui/react-dialog';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { AlertCircle, ChevronDown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import useSWR from 'swr';
import { useLocalStorage } from 'usehooks-ts';
import { Hex, zeroAddress } from 'viem';
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { BlockHashHistorianABI } from '~/abis/BlockHashHistorian';
import { zkvrfABI } from '~/abis/ZKVRF';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Input } from '~/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { Request } from '~/hooks/useRequests';
import { formatAddress, formatOperator } from '~/lib/address';
import { ZKVRF_ADDRESS } from '~/lib/constants';
import { poseidon } from '~/lib/poseidon';

const columnHelper = createColumnHelper<Request>();

export const columns = [
  columnHelper.accessor((row) => row.request.requestId, {
    id: 'ID',
    header: 'ID',
    cell: (info) => info.getValue().toString(),
  }),
  columnHelper.accessor((row) => row.request.requester, {
    id: 'requester',
    header: 'Requester',
    cell: (info) => formatAddress(info.getValue()),
  }),
  columnHelper.accessor((row) => row.operator.id, {
    id: 'operator',
    header: 'Operator',
    cell: (info) => formatOperator(info.getValue()),
  }),
  columnHelper.accessor((row) => row.fulfillment, {
    id: 'status',
    header: 'Status',
    cell: (info) => (info.getValue() ? 'Fulfilled' : 'Open'),
  }),
  columnHelper.accessor((row) => row.request.blockTimestamp, {
    id: 'Requested At',
    header: 'Requested At',
    cell: (info) =>
      new Date(Number(info.getValue()) * 1000).toLocaleString('en-US'),
  }),
  columnHelper.accessor((row) => row.fulfillment?.blockTimestamp, {
    id: 'Fulfilled At',
    header: 'Fulfilled At',
    cell: (info) =>
      info.getValue() !== undefined
        ? new Date(Number(info.getValue()) * 1000).toLocaleString('en-US')
        : '–',
  }),
  columnHelper.accessor((row) => row.operator.id, {
    id: 'Fulfill Request',
    //header: 'Fulfilled At',
    cell: (info) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const operatorPublicKey = info.table.options.meta?.operatorPublicKey as
        | Hex
        | undefined;
      if (
        operatorPublicKey &&
        info.getValue().toLowerCase() === operatorPublicKey.toLowerCase()
      ) {
        return <FullfillRandomnessFlow request={info.row.original} />;
      }

      return null;
    },
  }),
];

export function RequestsTable({ requests }: { requests: Request[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [operator] = useLocalStorage<Hex | null>('operator', null);

  const { data: operatorPublicKey } = useSWR(operator, (privateKey) =>
    poseidon([BigInt(privateKey)])
  );

  const table = useReactTable({
    data: requests,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      operatorPublicKey,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Filter IDs..."
          value={(table.getColumn('ID')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('ID')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function FullfillRandomnessFlow({ request }: { request: Request }) {
  const [operator] = useLocalStorage<Hex | null>('operator', null);

  if (!operator) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Fulfill</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fulfill randomness request</DialogTitle>
          <DialogDescription>
            Generate a verifiable random number and post it to the blockchain
          </DialogDescription>
        </DialogHeader>
        <FullfillRandomnessFlowContent request={request} operator={operator} />
      </DialogContent>
    </Dialog>
  );
}

function FullfillRandomnessFlowContent({
  request,
  operator,
}: {
  request: Request;
  operator: Hex;
}) {
  const { toast } = useToast();
  const [proof, setProof] = useState<Uint8Array>();

  const { data: operatorPublicKey, isLoading } = useSWR(
    operator,
    (privateKey) => poseidon([BigInt(privateKey)])
  );

  const { data: blockHashHistorianAddress } = useContractRead({
    abi: zkvrfABI,
    address: ZKVRF_ADDRESS,
    functionName: 'blockHashHistorian',
  });

  // const { data: blockHash } = useContractRead({
  //   abi: BlockHashHistorianABI,
  //   address: blockHashHistorianAddress,
  //   functionName: 'getBlockHash',
  //   args: [request.request.blockNumber],
  // });

  const blockHash =
    '0xaa59cb2fb1920b31ea53d4f1ebc1842325314f7a06dff126cdf4a9c7150f0a0f';

  console.log({ blockHashHistorianAddress, blockHash });

  const { data: messageHash } = useContractRead({
    abi: zkvrfABI,
    address: ZKVRF_ADDRESS,
    functionName: 'hashSeedToField',
    args: [request.request.requester, blockHash!, request.request.nonce],
    enabled: !!blockHash,
  });

  const { data: signature } = useSWR([messageHash], async () => {
    if (!operator || !messageHash) return null;

    return [
      await poseidon([operator, await poseidon([operator, messageHash, 0])]),
      await poseidon([operator, await poseidon([operator, messageHash, 1])]),
    ] as const;
  });

  const { config, error: prepareError } = usePrepareContractWrite({
    abi: zkvrfABI,
    address: ZKVRF_ADDRESS,
    functionName: 'fulfillRandomness',
    args: [
      request.request.requestId,
      {
        operatorPublicKey: request.operator.id,
        blockNumber: request.request.blockNumber,
        minBlockConfirmations: request.request.minBlockConfirmations,
        callbackGasLimit: request.request.callbackGasLimit,
        requester: request.request.requester,
        nonce: request.request.nonce,
      },
      signature!,
      proof ? `0x${Buffer.from(proof).toString('hex')}` : zeroAddress,
    ],
    enabled: !!proof && !!messageHash && !!signature,
  });

  const {
    write,
    data,
    isLoading: isWriting,
    error: writeError,
  } = useContractWrite(config);

  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast({
        title: 'Fulfillment complete',
      });
    },
  });

  if (!!proof && !!messageHash && !!signature) {
    return (
      <>
        {(!!prepareError?.message || !!writeError?.message) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className="break-all">
              {prepareError?.message ?? writeError?.message}
            </AlertDescription>
          </Alert>
        )}
        <DialogFooter>
          <Button disabled={isWriting || isConfirming} onClick={write}>
            {isConfirming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{' '}
            Send fulfillment transaction
          </Button>
        </DialogFooter>
      </>
    );
  }

  return (
    <>
      <p>Generating the proof will take a few seconds</p>
      <DialogFooter>
        {isLoading || !messageHash ? (
          <Button className="w-full" disabled>
            Loading…
          </Button>
        ) : (
          <Prove
            publicKey={operatorPublicKey!}
            privateKey={operator}
            messageHash={messageHash}
            onSuccess={setProof}
          />
        )}
      </DialogFooter>
    </>
  );
}
