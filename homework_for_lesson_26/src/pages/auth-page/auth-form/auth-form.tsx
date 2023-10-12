import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import "./style.css";

interface ISignForm {
  login: string;
  password: string;
}

export const AuthForm = () => {
  const { handleSubmit, control } = useForm<ISignForm>();
  const onSubmit: SubmitHandler<ISignForm> = (data) => console.log(data);
  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
        Вход
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom={true} className="subtitle">
        введите логин и пароль, чтобы получить доступ
      </Typography>
      <form className="formlogin" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          render={({ field }) => (
            <TextField
              label="Логин"
              placeholder="Введите имя пользователя"
              margin="normal"
              fullWidth={true}
              onChange={(event) => field.onChange(event)}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              margin="normal"
              fullWidth={true}
              onChange={(event) => field.onChange(event)}
              value={field.value}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth={true}
          sx={{ marginTop: 2 }}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};
