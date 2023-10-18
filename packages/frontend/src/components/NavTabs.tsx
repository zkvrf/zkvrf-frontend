import { TabsList, TabsTrigger } from '~/components/ui/tabs';

export function NavTabs() {
  return (
    <TabsList onSelect={console.log}>
      <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
      <TabsTrigger value="operator">My Requests</TabsTrigger>
    </TabsList>
  );
}
