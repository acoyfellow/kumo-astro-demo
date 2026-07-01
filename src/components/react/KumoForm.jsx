// Canonical @cloudflare/kumo React Field + Input.
import { Field } from '@cloudflare/kumo/components/field';
import { Input } from '@cloudflare/kumo/components/input';

export default function KumoForm() {
  return (
    <>
      <Field label="Work email">
        <Input placeholder="you@example.com" />
      </Field>
      <Input placeholder="Search the docs…" />
    </>
  );
}
