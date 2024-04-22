import { Head } from "$fresh/runtime.ts";

export default function ScriptTestAB() {
  return (
    <Head>
      <script
        id="ab-test-script"
        src={"/live/invoke/deco-sites/bolovo-store/loaders/decoAbTestScript.ts"}
      />
    </Head>
  );
}
