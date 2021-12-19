import { Button, Paper, TextField, Typography } from "@mui/material";

import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";

import useField from "../hooks/useField";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { signIn } from "../utils/firebase";

const Login = () => {
  const user = useLoggedInUser();

  const [email, setEmail, usernameProps] = useField("email", true);
  const [password, setPassword, passwordProps] = useField("password", true);
  const [submitError, setSubmitError] = useState<string>();

  if (user) {
    return <Navigate to="/editProducts" />;
  }

  return (
    <Paper
      component="form"
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();
        try {
          await signIn(email, password);
        } catch (err) {
          setSubmitError(
            (err as { message?: string })?.message ?? "Unknown error occurred"
          );
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" component="h2" textAlign="center" mb={3}>
        Prihlásenie
      </Typography>
      <br />
      <TextField
        sx={{ width: 300 }}
        label="Email"
        {...usernameProps}
        type="email"
      />
      <TextField
        sx={{ mt: 5, width: 300 }}
        label="Heslo"
        {...passwordProps}
        type="password"
      />

      <Button sx={{ my: 5 }} type="submit" variant="contained">
        Prihlásiť sa
      </Button>

      {submitError && (
        <Typography
          variant="caption"
          textAlign="right"
          sx={{ color: "error.main", mt: 5 }}
        >
          {submitError}
        </Typography>
      )}
    </Paper>
  );
};

export default Login;
