// Canonical @cloudflare/kumo React Button — imported straight from the package.
import { Button } from '@cloudflare/kumo/components/button';

export default function KumoButtons() {
  return (
    <>
      <Button variant="primary">Get started</Button>
      <Button variant="secondary">Docs</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </>
  );
}
