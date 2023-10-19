'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  AlertTriangle,
  DicesIcon,
  Loader2,
  UserIcon,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Hex } from 'viem';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { z } from 'zod';
import { ZKVRFGlobalConsumerABI } from '~/abis/ZKVRFGlobalConsumer';
import { Container } from '~/components/Container';
import { RequestsTable } from '~/components/RequestsTable';
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
import { Separator } from '~/components/ui/separator';
import { useToast } from '~/components/ui/use-toast';
import { useRequests } from '~/hooks/useRequests';
import { formatOperator } from '~/lib/address';
import { ZKVRF_CONSUMER_ADDRESS } from '~/lib/constants';

const Prove = dynamic(
  () => import('~/components/Prove').then((module) => module.Prove),
  { ssr: false }
);

export default function DashboardPage() {
  const { data, mutate: refresh } = useRequests();

  return (
    <Container className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button size="sm" asChild>
          <Link href="/operator">Operator</Link>
        </Button>
      </div>
      <Prove
        privateKey={
          '0x01c8bdf6686d4c8ba09db5f15ffee3c470a5e0ff54d6fbac3a548f9a666977'
        }
        messageHash={'0'}
        publicKey={
          '0x15d76b9641dc1e52de6f9530a4161f077c348b1329efaeb0e052f13b5bf1ce49'
        }
        onSuccess={console.log}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
            </CardTitle>
            <DicesIcon size="1rem" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.requests.length.toLocaleString('en-US')}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
            <AlertTriangle size="1rem" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.requests
                .filter((request) => !request.fulfillment)
                .length.toLocaleString('en-US')}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Registered Operators
            </CardTitle>
            <UserIcon size="1rem" className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.operators.length.toLocaleString('en-US')}
            </div>
          </CardContent>
        </Card>
      </div>
      <Separator />
      <Randomness
        operators={data.operators.map((operator) => operator.id)}
        onSuccess={() => {
          setTimeout(() => {
            refresh();
          }, 1000);
        }}
      />
      <Separator />
      <RequestsTable requests={data.requests} />
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

function Randomness({
  operators,
  onSuccess,
}: {
  operators: Hex[];
  onSuccess?: () => void;
}) {
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

  const { isLoading: isConfirming } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast({
        title: 'Random number requested successfully',
      });
      onSuccess?.();
    },
  });

  async function onSubmit() {
    await writeAsync?.();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Randomness</CardTitle>
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
                        {operators.map((operator) => (
                          <SelectItem
                            key={operator}
                            value={operator}
                            className="tabular-nums"
                          >
                            {formatOperator(operator)}
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
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="break-all">
                  {prepareError?.message ?? writeError?.message}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button disabled={form.formState.isSubmitting || isConfirming}>
              {isConfirming && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}{' '}
              🎲 I&apos;m feeling lucky
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
