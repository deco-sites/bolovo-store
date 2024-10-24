import { SendEventOnLoad } from "site/components/Analytics.tsx";

function Home() {
  return (
    <SendEventOnLoad
      event={{
        name: "acessou-home",
      }}
    />
  );
}

export default Home;
