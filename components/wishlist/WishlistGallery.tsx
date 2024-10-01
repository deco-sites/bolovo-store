import { Product } from "apps/commerce/types.ts";
import SearchResult, { loader, Props } from "../search/SearchResultMenu.tsx";
import { SectionProps } from "deco/mod.ts";
function WishlistGallery(props: Props) {
  const isEmpty = !props.page || props.page.products.length === 0;
  if (isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">
            Your wishlist is empty
          </span>
          <span>
            Log in and add items to your wishlist for later. They will show up
            here
          </span>
        </div>
      </div>
    );
  }
  return (
    <SearchResult
      {...props as SectionProps<typeof loader> & {
        colorVariant: {
          [productName: string]: Product[];
        };
      }}
    />
  );
}
export default WishlistGallery;
