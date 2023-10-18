'use client';

import { AlertTriangle, DicesIcon } from 'lucide-react';
import { Container } from '~/components/Container';
import { NavTabs } from '~/components/NavTabs';
import { RequestsTable } from '~/components/RequestsTable';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent } from '~/components/ui/tabs';
import { useOperatorRequests } from '~/hooks/useRequests';

export default function OperatorPage() {
  const operator =
    '0x15d76b9641dc1e52de6f9530a4161f077c348b1329efaeb0e052f13b5bf1ce49';
  const { data } = useOperatorRequests({ operator });
  return (
    <Container className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Operator</h2>
      </div>
      <Tabs defaultValue="operator" className="space-y-4">
        <NavTabs />
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Your Total Requests
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
                  Your Open Requests
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
          </div>
          <Separator />
          <RequestsTable requests={data.requests} />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
