import { selectedFilters } from "$store/components/search/SelectedFilters.tsx";
import { useEffect } from "preact/hooks";

export interface Props {
  rootId: string;
  buttonId: string;
}

export function buildParams() {
  const url = new URL(window.location.href);
  const existingParams = new URLSearchParams(url.search);
  const keysToRemove = [];
  const qValue = existingParams.get("q");
  const sortValue = existingParams.get("sort");

  if (qValue) {
    existingParams.set("q", qValue);
  }

  for (const [key, value] of existingParams.entries()) {
    if (
      key !== "q" &&
      !selectedFilters.peek().some((filter) =>
        filter.label === value && `type_tags[${filter.type}][]` === key
      )
    ) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => {
    existingParams.delete(key);
  });

  if (sortValue) {
    existingParams.set("sort", sortValue);
  }

  selectedFilters.peek().forEach(({ type, label }) => {
    const selectLabel = type !== "property2" ? label.toLowerCase() : label;
    if (existingParams.has(`type_tags[${type}][]`, selectLabel)) return;

    existingParams.append(`type_tags[${type}][]`, selectLabel);
  });

  url.search = existingParams.toString();

  if (window.location.href !== url.href) {
    return url.href;
  }
}

function setup({ buttonId }: Props) {
  const applyButton = document.getElementById(buttonId);

  applyButton?.addEventListener("click", () => {
    const url = buildParams();
    if (url) {
      applyButton.querySelector("span")?.classList.add("loading");
      window.location.href = url;
    }
  });
}

function ApplyFilters({ rootId, buttonId }: Props) {
  useEffect(() => {
    setup({ rootId, buttonId });
  }, [rootId, buttonId]);

  return <div data-apply-range-filters-controller-js />;
}

export default ApplyFilters;
