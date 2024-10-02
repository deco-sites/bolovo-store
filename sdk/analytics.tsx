import { ExtendedEvents } from "site/components/Analytics.tsx";

export const sendEvent = <E extends ExtendedEvents>(event: E) =>
  window.DECO.events.dispatch(event);
