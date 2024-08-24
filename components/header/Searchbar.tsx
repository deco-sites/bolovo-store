import Searchbar, {
  Props as SearchbarProps,
} from "$store/components/search/Searchbar.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import FieldOfSearch from "deco-sites/bolovo-store/components/search/FieldOfSearch.tsx";

export interface Props {
  searchbar?: SearchbarProps;
}

function SearchbarModal({ searchbar }: Props) {
  const { displaySearchPopup } = useUI();

  if (!searchbar) {
    return null;
  }

  return (
    <FieldOfSearch
      loading="lazy"
      open={displaySearchPopup.value}
      onClose={() => displaySearchPopup.value = false}
    >
      <div class="relative border-b border-black bg-white">
        <Searchbar {...searchbar} />
      </div>
    </FieldOfSearch>
  );
}

export default SearchbarModal;
