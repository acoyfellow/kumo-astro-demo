// Canonical @cloudflare/kumo React Tabs — controlled state in the island.
import { useState } from 'react';
import { Tabs } from '@cloudflare/kumo/components/tabs';

const tabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Usage', value: 'usage' },
  { label: 'API', value: 'api' },
];

export default function KumoTabs() {
  const [value, setValue] = useState('overview');
  return <Tabs tabs={tabs} value={value} onValueChange={setValue} />;
}
