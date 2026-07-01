// Canonical @cloudflare/kumo React Meter.
import { Meter } from '@cloudflare/kumo/components/meter';

export default function KumoMeter() {
  return (
    <>
      <Meter label="Storage used" value={65} max={100} min={0} />
      <Meter label="API requests" value={40} max={100} min={0} />
    </>
  );
}
