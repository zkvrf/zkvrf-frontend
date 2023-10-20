'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Hex, decodeEventLog } from 'viem';
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { z } from 'zod';
import { zkvrfABI } from '~/abis/ZKVRF';
import { ZKVRFGlobalConsumerABI } from '~/abis/ZKVRFGlobalConsumer';
import { Container } from '~/components/Container';
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { ToastAction } from '~/components/ui/toast';
import { useToast } from '~/components/ui/use-toast';
import { useRequests } from '~/hooks/useRequests';
import { formatOperator } from '~/lib/address';
import { ZKVRF_CONSUMER_ADDRESS } from '~/lib/constants';

export default function OperatorPage() {
  return (
    <Container className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Request randomness
        </h2>
      </div>
      <Randomness />
    </Container>
  );
}

const formSchema = z.object({
  operatorPublicKey: z
    .string()
    .refine(
      (arg): arg is Hex => /^0x[0-9A-Fa-f]{64}$/.test(arg),
      'Not a valid operator key'
    ),
  minBlockConfirmations: z.number().int().positive().min(4),
  callbackGasLimit: z.number().int().positive().min(100000),
});

function Randomness() {
  const { chain } = useNetwork();
  const { data: requestsData, mutate: refresh } = useRequests();

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minBlockConfirmations: 4,
      callbackGasLimit: 100000,
    },
  });
  const operatorPublicKey = form.watch('operatorPublicKey');
  const minBlockConfirmations = form.watch('minBlockConfirmations');
  const callbackGasLimit = form.watch('callbackGasLimit');

  const { config, error: prepareError } = usePrepareContractWrite({
    abi: ZKVRFGlobalConsumerABI,
    address: ZKVRF_CONSUMER_ADDRESS,
    functionName: 'requestRandomness',
    args: [operatorPublicKey, minBlockConfirmations, callbackGasLimit],
    enabled: form.formState.isValid,
  });

  const { writeAsync, data, error: writeError } = useContractWrite(config);

  const {
    data: receipt,
    isSuccess,
    isLoading: isConfirming,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast({
        title: 'Random number requested successfully',
        action: (
          <ToastAction altText="Check transaction" asChild>
            <Link
              href={`${chain?.blockExplorers?.default.url}/tx/${data?.hash}`}
              target="_blank"
            >
              Check transaction
            </Link>
          </ToastAction>
        ),
      });
      form.reset();
      refresh();
    },
  });

  const requestId = useMemo(() => {
    if (!receipt?.logs[0]) return null;
    const event = decodeEventLog({
      abi: zkvrfABI,
      eventName: 'RandomnessRequested',
      data: receipt.logs[0].data,
      topics: receipt.logs[0].topics,
    });

    return event.args.requestId;
  }, [receipt]);

  const { data: randomNumber } = useContractRead({
    address: ZKVRF_CONSUMER_ADDRESS,
    abi: ZKVRFGlobalConsumerABI,
    functionName: 'fulfilments',
    args: [requestId!],
    enabled: !!requestId,
    watch: true,
  });

  async function onSubmit() {
    await writeAsync?.();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roll the dice</CardTitle>
        <CardDescription>Request a new random number!</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form className="contents" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <fieldset
              disabled={form.formState.isSubmitting || isConfirming}
              className="grid grid-cols-3 gap-4"
            >
              <FormField
                control={form.control}
                name="operatorPublicKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operator</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an operator" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {requestsData.operators.map((operator) => (
                          <SelectItem
                            key={operator.id}
                            value={operator.id}
                            className="tabular-nums"
                          >
                            {formatOperator(operator.id)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The Operator who should fulfill the request
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minBlockConfirmations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Block Confirmations</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      How long to wait for randomness. Longer is better.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="callbackGasLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Callback gas limit</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      How much gas to send to the callback.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            {(!!prepareError?.message || !!writeError?.message) && (
              <Alert className="max-h-40 overflow-auto" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="break-all">
                  {prepareError?.message ?? writeError?.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button disabled={form.formState.isSubmitting || isConfirming}>
              {isConfirming && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}{' '}
              🎲 I&apos;m feeling lucky
            </Button>
            {isSuccess && (
              <Button variant="outline" asChild>
                <Link href="/" target="_blank">
                  Check your request on the dashboard
                </Link>
              </Button>
            )}
          </CardFooter>
          {isSuccess && (
            <CardContent>
              {!randomNumber ? (
                <>
                  Waiting for random number from request {requestId?.toString()}
                  …
                </>
              ) : (
                <>
                  🎉 Your random number is{' '}
                  <code>{randomNumber.toString()}</code>
                </>
              )}
            </CardContent>
          )}
        </form>
      </Form>
    </Card>
  );
}
