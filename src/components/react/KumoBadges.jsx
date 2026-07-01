// Canonical @cloudflare/kumo React Badge — real per-variant color classes.
import { Badge } from '@cloudflare/kumo/components/badge';

export default function KumoBadges() {
  return (
    <>
      <Badge variant="success">Stable</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="error">Deprecated</Badge>
      <Badge variant="info">New</Badge>
      <Badge variant="purple">Experimental</Badge>
    </>
  );
}
