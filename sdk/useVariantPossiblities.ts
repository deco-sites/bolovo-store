import type {
  FilterToggleValue,
  ProductGroup,
  ProductLeaf,
  PropertyValue,
} from "apps/commerce/types.ts";
import { useOffer } from "./useOffer.ts";

export type Possibilities = Record<string, Record<string, string | undefined>>;

const hash = ({ name, value }: PropertyValue) => `${name}::${value}`;

const omit = new Set(["category", "cluster", "RefId"]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductLeaf,
): Possibilities => {
  const possibilities: Possibilities = {};
  const selectedSpecs = new Set(selected.additionalProperty?.map(hash));

  for (const variant of variants) {
    const { url, additionalProperty = [], productID } = variant;
    const isSelected = productID === selected.productID;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));

    for (let it = 0; it < specs.length; it++) {
      const name = specs[it].name!;
      const value = specs[it].value!;

      if (omit.has(name)) continue;

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      // First row is always selectable
      const isSelectable = it === 0 ||
        specs.every((s) => s.name === name || selectedSpecs.has(hash(s)));

      possibilities[name][value] = isSelected
        ? url
        : isSelectable
        ? possibilities[name][value] || url
        : possibilities[name][value];
    }
  }

  return possibilities;
};

export function compareSizes(a: FilterToggleValue, b: FilterToggleValue) {
  const sizeA = a.value.split(" ")[0];
  const sizeB = b.value.split(" ")[0];
  const sizeOrder = [
    "P",
    "P | S",
    "M",
    "M | M",
    "G",
    "G | L",
    "GG",
    "GG | XL",
    "XGG",
    "XGG | XXL",
  ];

  return sizeOrder.indexOf(sizeA) - sizeOrder.indexOf(sizeB);
}

export interface VariantAvailability {
  size?: string;
  id?: string;
  inStock?: boolean;
}

export function variantAvailability(
  { hasVariant }: ProductGroup,
) {
  const arrayVairants: VariantAvailability[] = [];

  if (hasVariant) {
    hasVariant.map((item) => {
      const { offers, productID, additionalProperty } = item;
      const { availability } = useOffer(offers);
      const index = additionalProperty?.find((prop) => prop.name === "Tamanho");

      if (index) {
        if (availability === "https://schema.org/InStock") {
          arrayVairants.push({
            size: index.value,
            inStock: true,
            id: productID,
          });
        } else {
          arrayVairants.push({
            size: index.value,
            inStock: false,
            id: productID,
          });
        }
      } else {
        if (availability === "https://schema.org/InStock") {
          arrayVairants.push({ inStock: true, id: productID });
        } else {
          arrayVairants.push({ inStock: false, id: productID });
        }
      }
    });
  }else{
    return null
  }
  return arrayVairants
}
