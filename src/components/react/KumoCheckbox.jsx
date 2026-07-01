// Canonical @cloudflare/kumo React Checkbox — controlled state in the island.
import { useState } from 'react';
import { Checkbox } from '@cloudflare/kumo/components/checkbox';

export default function KumoCheckbox() {
  const [terms, setTerms] = useState(true);
  const [notify, setNotify] = useState(false);
  return (
    <>
      <Checkbox label="Accept terms and conditions" checked={terms} onCheckedChange={setTerms} />
      <Checkbox label="Enable notifications" checked={notify} onCheckedChange={setNotify} />
    </>
  );
}
