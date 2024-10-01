import { SendEventOnLoad } from "deco-sites/bolovo-store/components/Analytics.tsx";

export default function Home() {
  return (
    <SendEventOnLoad
      event={{
        name: "acessou-home",
      }}
    />
  );
}
