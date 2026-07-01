// Canonical @cloudflare/kumo React Switch — controlled state in the island.
import { useState } from 'react';
import { Switch } from '@cloudflare/kumo/components/switch';

export default function KumoSwitch() {
  const [enabled, setEnabled] = useState(true);
  const [motion, setMotion] = useState(false);
  return (
    <>
      <Switch label="Enable notifications" checked={enabled} onCheckedChange={setEnabled} />
      <Switch label="Reduced motion" checked={motion} onCheckedChange={setMotion} />
    </>
  );
}
