import { AlertTriangle, DicesIcon, UserIcon } from 'lucide-react';
import { Container } from '~/components/Container';
import { RequestsTable } from '~/components/RequestsTable';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { useRequests } from '~/hooks/useRequests';

export default function DashboardPage() {
  const { data } = useRequests();

  return (
    <Container className="space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            My Requests
          </TabsTrigger>
        </TabsList>
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
      </Tabs>
    </Container>
  );
}
