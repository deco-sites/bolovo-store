import { ExtendedEvents } from "deco-sites/bolovo-store/components/Analytics.tsx";

export const sendEvent = <E extends ExtendedEvents>(event: E) =>
  window.DECO.events.dispatch(event);
