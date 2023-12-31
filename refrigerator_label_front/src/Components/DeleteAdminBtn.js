import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "../Assets/image/Vector.png";
import { useTranslation } from "react-i18next";

const theme2 = createTheme({
  palette: {
    Button: {
      main: "#363F4E",
    },
    White: {
      main: "#ffff",
    },
  },
});

export default function DeleteAdminBtn(props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteAdmin = async () => {
    setBtnLoading(true);
    await props.handleDeleteAdmin(props.username);
    setOpen(false);
    setBtnLoading(false);
  };

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <div>
      <Button onClick={handleClickOpen} disableElevation>
        <Img src={DeleteIcon} />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="Diacontent">
          <div className="DTittle">
            <DialogTitle id="responsive-dialog-title">
              <Typography variant="boby2" sx={{ fontWeight: "700" }}>
                {t("Confirm to delete admin?")}
              </Typography>
            </DialogTitle>
          </div>
          <DialogActions>
            <div className="BtnGroup">
              <ThemeProvider theme={theme2}>
                <div className="BtnOK">
                  <LoadingButton
                    autoFocus
                    onClick={handleDeleteAdmin}
                    loading={btnLoading}
                    variant="contained"
                    color="Button"
                    style={{
                      maxWidth: "108px",
                      maxHeight: "36px",
                      minWidth: "108px",
                      minHeight: "36px",
                    }}
                  >
                    <Typography color="white">{t("Confirm")}</Typography>
                  </LoadingButton>
                </div>
                <div className="BtnNo">
                  <Button
                    onClick={handleClose}
                    autoFocus
                    variant="outlined"
                    color="Button"
                    style={{
                      maxWidth: "108px",
                      maxHeight: "36px",
                      minWidth: "108px",
                      minHeight: "36px",
                    }}
                  >
                    {t("Cancel")}
                  </Button>
                </div>
              </ThemeProvider>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
