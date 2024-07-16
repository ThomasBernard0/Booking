import React from "react";
import { FormattedNumber, IntlProvider } from "react-intl";

type Props = {
  price: number;
};

export default function Currency({ price }: Props) {
  return (
    <IntlProvider locale="fr">
      <FormattedNumber value={price / 100} style="currency" currency="EUR" />
    </IntlProvider>
  );
}
