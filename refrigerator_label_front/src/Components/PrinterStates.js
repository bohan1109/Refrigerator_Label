import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import LabelPrinter from "../Assets/image/label_printer.jpg";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useTranslation } from "react-i18next";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const StyledBadgeError = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#d32f2f",
    color: "#d32f2f",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function PrinterStates(props) {
  const { t } = useTranslation();
  const [printerState, setPrinterState] = React.useState();

  if (props.printerState !== printerState) {
    setPrinterState(props.printerState);
  }

  return (
    <div>
      <Card sx={{ display: "flex", p: 1 }}>
        {printerState === "Device online" ? (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={LabelPrinter} />
          </StyledBadge>
        ) : (
          <StyledBadgeError
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={LabelPrinter} />
          </StyledBadgeError>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: "200px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            fontWeight="bold"
          >
            {t("Label machine status")}: {t(props.printerState)}
          </Typography>
        </Box>
      </Card>
    </div>
  );
}
