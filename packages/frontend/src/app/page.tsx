'use client';

import { AlertTriangle, DicesIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';
import { Container } from '~/components/Container';
import { Randomness } from '~/components/Randomness';
import { RequestsTable } from '~/components/RequestsTable';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { useRequests } from '~/hooks/useRequests';

export default function DashboardPage() {
  const { data, mutate: refresh } = useRequests();

  return (
    <Container className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-serif text-3xl font-medium tracking-tight">
          Dashboard
        </h2>
        <Button size="sm" asChild>
          <Link href="/operator">Operator</Link>
        </Button>
      </div>
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
        onSuccess={() => {
          setTimeout(() => {
            refresh();
          }, 2000);
        }}
      />
      <Separator />
      <RequestsTable
        requests={data.requests.sort((r1, r2) =>
          BigInt(r1.request.requestId) > BigInt(r2.request.requestId) ? -1 : 1
        )}
        onRefresh={() =>
          setTimeout(() => {
            refresh();
          }, 2000)
        }
      />
    </Container>
  );
}
