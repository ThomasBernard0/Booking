import React from "react";
import {
  Button,
  Card,
  CircularProgress,
  keyframes,
  useTheme,
  useMediaQuery,
  Typography,
  Box,
} from "@mui/material";
import { useSlots } from "../queries";
import {
  formatDateToDDMMYYYY,
  formatDateToFrenchLocale,
  getHours,
} from "../utils/dateUtils";
import { Slot } from "../types/slot";

type Props = {
  dateSelected: Date | null;
  slotsSelected: {
    [key: string]: Slot;
  };
  setSlotsSelected: React.Dispatch<
    React.SetStateAction<{
      [key: string]: Slot;
    }>
  >;
  setOpenRecapModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const slideInHorizontal = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInVertical = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export default function Sidemenu({
  dateSelected,
  slotsSelected,
  setSlotsSelected,
  setOpenRecapModal,
}: Props) {
  const { slotsList, isLoading } = useSlots(dateSelected);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const addingSlots = (slot: Slot) => {
    const key = slot.startDate.toString();
    if (key in slotsSelected) {
      const newSchedule = { ...slotsSelected };
      delete newSchedule[key];
      setSlotsSelected(newSchedule);
    } else {
      setSlotsSelected({ ...slotsSelected, [key]: slot });
    }
  };
  return (
    <Card
      sx={{
        margin: "2rem",
        marginTop: "4rem",
        padding: "1rem",
        width: "calc(40vh - 20px)",
        height: "calc(100vh - 10rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transform: isSmallScreen ? "translateY(100%)" : "translateX(100%)",
        animation: `${
          isSmallScreen ? slideInVertical : slideInHorizontal
        } 1s forwards`,
      }}
    >
      <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {formatDateToFrenchLocale(dateSelected)}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
          height: "100%",
          overflow: "scroll",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          slotsList.map((slot, index) => {
            return (
              <Button
                key={formatDateToDDMMYYYY(dateSelected) + "-" + index}
                sx={{ width: "80%", height: "4rem" }}
                onClick={() => addingSlots(slot)}
                variant={
                  slot.startDate.toString() in slotsSelected
                    ? "contained"
                    : "outlined"
                }
                disabled={!slot.available}
              >
                {getHours(slot.startDate) + " - " + getHours(slot.endDate)}
              </Button>
            );
          })
        )}
      </Box>
      <Box
        sx={{
          mt: "1rem",
          mb: "2rem",
          height: "4rem",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <span>
          Créneau(x) sélectionné(s): {Object.keys(slotsSelected).length}
        </span>
        <Button
          sx={{
            height: "3rem",
          }}
          variant="contained"
          disabled={Object.keys(slotsSelected).length == 0}
          onClick={() => setOpenRecapModal(true)}
        >
          Payer
        </Button>
      </Box>
    </Card>
  );
}
