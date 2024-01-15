import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import { useEffect } from "preact/hooks";

export interface Props {
  rootId: string;
  buttonId: string;
}

function buildParams(rootElement: HTMLElement) {
  const url = new URL(window.location.href);
  const existingParams = new URLSearchParams(url.search);

  for (const [key, value] of url.searchParams.entries()) {
    if (
      !selectedFilters.peek().some((filter) =>
        filter.label == value && `type_tags[${filter.type}][]` == key
      )
    ) {
      url.searchParams.delete(key);
    }
  }

  url.search = existingParams.toString();
  selectedFilters.value.forEach(({ type, label }) => {
    const selectLabel = type != "property2" ? label.toLowerCase() : label;
    if (url.searchParams.has(`type_tags[${type}][]`, selectLabel)) return;

    url.searchParams.append(`type_tags[${type}][]`, selectLabel);
  });

  return url.href;
}

function setup({ rootId, buttonId }: Props) {
  const root = document.getElementById(rootId);
  const applyButton = document.getElementById(buttonId);

  applyButton?.addEventListener("click", () => {
    const url = buildParams(root!);
    if (url) {
      applyButton.querySelector("span")?.classList.add("loading");
      window.location.href = url;
    }
  });
}

function ApplyRangeFilters({ rootId, buttonId }: Props) {
  useEffect(() => {
    setup({ rootId, buttonId });
  }, [rootId, buttonId]);

  return <div data-apply-range-filters-controller-js />;
}

export default ApplyRangeFilters;
