'use client';

import { AlertTriangle, DicesIcon, UserIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Container } from '~/components/Container';
import { NavTabs } from '~/components/NavTabs';
import { RequestsTable } from '~/components/RequestsTable';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent } from '~/components/ui/tabs';
import { useRequests } from '~/hooks/useRequests';

const Prove = dynamic(
  () => import('~/components/Prove').then((module) => module.Prove),
  { ssr: false }
);

export default function DashboardPage() {
  const { data } = useRequests();

  return (
    <Container className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button size="sm" asChild>
          <Link href="/operator">Operator Signup</Link>
        </Button>
      </div>
      <Prove
        private_key={
          '0x01c8bdf6686d4c8ba09db5f15ffee3c470a5e0ff54d6fbac3a548f9a666977'
        }
        message_hash={'0'}
        public_key={
          '0x15d76b9641dc1e52de6f9530a4161f077c348b1329efaeb0e052f13b5bf1ce49'
        }
        useProof={(proof) => console.log(proof)}
      />
      <Tabs defaultValue="overview" className="space-y-4">
        <NavTabs />
        <TabsContent value="overview" className="space-y-4">
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
                <CardTitle className="text-sm font-medium">
                  Open Requests
                </CardTitle>
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
          <RequestsTable requests={data.requests} />
        </TabsContent>
        <TabsContent value="operator" className="space-y-4">
          <div>asdfg</div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
