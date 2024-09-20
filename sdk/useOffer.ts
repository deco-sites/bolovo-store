import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (!acc) {
    return curr;
  }

  if (acc.price > curr.price) {
    return curr;
  }

  if (acc.price < curr.price) {
    return acc;
  }

  if (
    acc.billingDuration && curr.billingDuration &&
    acc.billingDuration < curr.billingDuration
  ) {
    return curr;
  }

  return acc;
};

const installmentToString = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
) => {
  const { billingDuration, billingIncrement, price } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  const withTaxes = sellingPrice < price;

  return `${billingDuration}x de R$ ${billingIncrement} ${
    withTaxes ? "com juros" : "sem juros"
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer = aggregateOffer?.offers[0];
  const offerIntl = aggregateOffer?.offers[1];
  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const listPriceIntl = offerIntl?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );
  const salePrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/SalePrice"
  );
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const installmenIntl = offerIntl?.priceSpecification.reduce(
    bestInstallment,
    null,
  );
  const seller = offer?.seller;
  const sellerIntl = offerIntl?.seller;
  const price = offer?.price;
  const priceIntl = offerIntl?.price;
  const availability = offer?.availability;
  const availabilityIntl = offerIntl?.availability;

  return {
    price,
    listPrice: listPrice?.price,
    salePrice: salePrice?.price,
    availability,
    seller,
    installments: installment && price
      ? installmentToString(installment, price)
      : null,
    priceIntl,
    listPriceIntl: listPriceIntl?.price,
    availabilityIntl,
    sellerIntl,
    installmentsIntl: installmenIntl && priceIntl
      ? installmentToString(installmenIntl, priceIntl)
      : null,
  };
};
