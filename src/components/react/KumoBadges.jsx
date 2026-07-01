// Canonical @cloudflare/kumo React Badge — real per-variant color classes.
import { Badge } from '@cloudflare/kumo/components/badge';

export default function KumoBadges() {
  return (
    <div className="demo-row" data-test="react-badges">
      <Badge variant="success">Stable</Badge>
      <Badge variant="error">Deprecated</Badge>
      <Badge variant="info">New</Badge>
      <Badge variant="warning">Beta</Badge>
      <Badge variant="purple">Experimental</Badge>
    </div>
  );
}
