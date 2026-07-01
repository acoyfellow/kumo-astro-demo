// Canonical @cloudflare/kumo React Text.
import { Text } from '@cloudflare/kumo/components/text';

export default function KumoText() {
  return (
    <>
      <Text variant="heading1" as="h1">Title</Text>
      <Text variant="mono">code</Text>
      <Text>Body</Text>
    </>
  );
}
