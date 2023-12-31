import * as React from "react";
import { Typography, Box, Paper, TextField, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Bar from "../Components/NavBar";
import axios from "../Axios.config.js";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";

const theme = createTheme({
  palette: {
    white: {
      main: "rgb(255,255,255)",
    },
    Button: {
      main: "#363F4E",
    },
  },
});

export default function RegisterPage() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const [btnLoading, setBtnLoading] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const [AlertText, setAlertText] = React.useState("");
  const [inputErrorU, setInputErrorU] = React.useState(false);
  const [inputErrorM, setInputErrorM] = React.useState(false);
  const [inputErrorP, setInputErrorP] = React.useState(false);
  const [inputErrorPA, setInputErrorPA] = React.useState(false);

  const [username, setUsername] = React.useState();
  const [mail, setMail] = React.useState();
  const [password, setPassword] = React.useState();
  const [passwordAgain, setPasswordAgain] = React.useState();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeMail = (e) => {
    setMail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordAgain = (e) => {
    setPasswordAgain(e.target.value);
  };

  //創建使用者功能
  const handleCreateAdmin = async (event) => {
    setInputErrorU(false);
    setInputErrorM(false);
    setInputErrorP(false);
    setInputErrorPA(false);
    event.preventDefault();
    let check = false;
    let alert_text = t("Please enter");

    if (!username) {
      setInputErrorU(true);
      alert_text += " " + t("Username");
      check = true;
    }
    if (!mail) {
      setInputErrorM(true);
      alert_text += " " + t("Email");
      check = true;
    }
    if (!password) {
      setInputErrorP(true);
      alert_text += " " + t("Password");
      check = true;
    }
    if (!passwordAgain) {
      setInputErrorPA(true);
      alert_text += " " + t("Confirm password");
      check = true;
    }
    //show
    if (check === true) {
      setHidden(false);
      setAlertText(alert_text + " " + t("!"));
      process.exit();
    } else if (password !== passwordAgain) {
      //not same
      setInputErrorP(true);
      setInputErrorPA(true);
      setAlertText(t("Two passwords aren't same !"));
      process.exit();
    }

    setBtnLoading(true);
    await axios
      .post(
        "/api/admin",
        {
          username: username,
          password: password,
          mail: mail,
        },
        {
          headers: { token: localStorage.getItem("login_token") },
        }
      )
      .then((response) => {
        navigate("/Admins");
      })
      .catch((error) => {
        setAlertText(t(error.response.data["message"]));
      });
    setBtnLoading(false);
  };

  return (
    <div>
      <Bar />
      <Paper
        sx={{
          width: "478px",
          height: "80%",
          minHeight: "470px",
          m: "20vh auto",
          display: "flex",
        }}
      >
        <Box
          component="form"
          onSubmit={handleCreateAdmin}
          noValidate
          sx={{ m: "auto" }}
        >
          <Box
            display="flex"
            justifyContent="center"
            sx={{ mx: "auto", my: "5%", width: "80%" }}
          >
            <Typography sx={{ fontSize: "36px", fontWeight: 700 }}>
              {t("Add admin")}
            </Typography>
          </Box>
          {!hidden ? (
            <Box sx={{ width: "90%", mx: "auto", my: "5%" }}>
              <Alert severity="error" className="Alert" show="false">
                <Typography
                  color="black"
                  variant="body2"
                  sx={{ fontWeight: 700 }}
                >
                  {AlertText}
                </Typography>
              </Alert>
            </Box>
          ) : null}
          <Box sx={{ width: "80%", m: "auto" }}>
            <TextField
              error={inputErrorU}
              size="small"
              fullWidth
              placeholder={t("Username")}
              onChange={onChangeUsername}
            />
            <TextField
              error={inputErrorM}
              size="small"
              fullWidth
              placeholder={t("Email")}
              type="email"
              onChange={onChangeMail}
              sx={{ mt: "11px" }}
            />
            <TextField
              error={inputErrorP}
              size="small"
              fullWidth
              placeholder={t("Password")}
              type="password"
              onChange={onChangePassword}
              sx={{ mt: "11px" }}
            />
            <TextField
              error={inputErrorPA}
              size="small"
              fullWidth
              placeholder={t("Confirm password")}
              type="password"
              onChange={onChangePasswordAgain}
              sx={{ mt: "11px" }}
            />
          </Box>
          <Box sx={{ width: "80%", mx: "auto", my: "5%" }}>
            <ThemeProvider theme={theme}>
              <LoadingButton
                loading={btnLoading}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ width: "100%", height: "100%" }}
                color="Button"
              >
                <Typography
                  sx={{ fontSize: "14px" }}
                  color="White"
                  className="Signup"
                >
                  {t("Register")}
                </Typography>
              </LoadingButton>
            </ThemeProvider>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
