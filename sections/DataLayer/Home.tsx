import { SendEventOnLoad } from "deco-sites/bolovo-store/components/Analytics.tsx";

export function Home() {
  return (
    <SendEventOnLoad
      event={{
        name: "acessou-home",
      }}
    />
  );
}
