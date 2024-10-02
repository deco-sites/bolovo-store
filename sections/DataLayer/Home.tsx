import { SendEventOnLoad } from "site/components/Analytics.tsx";

export default function Home() {
  return (
    <SendEventOnLoad
      event={{
        name: "acessou-home",
      }}
    />
  );
}
