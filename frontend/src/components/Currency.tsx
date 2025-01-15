import React from "react";
import { FormattedNumber, IntlProvider } from "react-intl";
import { Typography } from "@mui/material";

type Props = {
  price: number;
};

export default function Currency({ price }: Props) {
  return (
    <IntlProvider locale="fr">
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        <FormattedNumber value={price / 100} style="currency" currency="EUR" />{" "}
      </Typography>
    </IntlProvider>
  );
}
