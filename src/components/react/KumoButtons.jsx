// Canonical @cloudflare/kumo React Button — imported straight from the package.
// No approximation: every class you inspect is emitted by Kumo itself.
import { Button } from '@cloudflare/kumo/components/button';

export default function KumoButtons() {
  return (
    <div className="demo-row" data-test="react-buttons">
      <Button variant="primary">Get started</Button>
      <Button variant="secondary">View source</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
