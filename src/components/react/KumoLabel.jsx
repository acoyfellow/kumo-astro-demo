// Canonical @cloudflare/kumo React Label.
import { Label } from '@cloudflare/kumo/components/label';

export default function KumoLabel() {
  return (
    <>
      <Label>Work email</Label>
      <Label showOptional>Middle Name</Label>
    </>
  );
}
