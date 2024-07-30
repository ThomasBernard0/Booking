import React from "react";
import "./Currency.css";
import { FormattedNumber, IntlProvider } from "react-intl";

type Props = {
  price: number;
};

export default function Currency({ price }: Props) {
  return (
    <IntlProvider locale="fr">
      <span className="formatted-number">
        <FormattedNumber value={price / 100} style="currency" currency="EUR" />{" "}
      </span>
    </IntlProvider>
  );
}
