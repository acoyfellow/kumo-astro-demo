// Canonical @cloudflare/kumo React Field + Input, composed exactly as Kumo intends.
import { Field } from '@cloudflare/kumo/components/field';
import { Input } from '@cloudflare/kumo/components/input';
import { Button } from '@cloudflare/kumo/components/button';

export default function KumoForm() {
  return (
    <div className="demo-stack" data-test="react-form">
      <Field
        label="Work email"
        description="We'll only use this for release notes."
        required
      >
        <Input placeholder="you@example.com" />
      </Field>
      <Input placeholder="Search the docs…" />
      <div>
        <Button variant="primary">Subscribe</Button>
      </div>
    </div>
  );
}
