import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFormState,
} from "react-hook-form";
import "./style.css";

interface ISignForm {
  login: string;
  password: string;
}

export const AuthForm = () => {
  const { handleSubmit, control } = useForm<ISignForm>();
  const { errors } = useFormState({ control });

  const onSubmit: SubmitHandler<ISignForm> = (data) => console.log(data);
  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
        Вход
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className="subtitle"
      >
        введите логин и пароль, чтобы получить доступ
      </Typography>
      <form className="formlogin" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          rules={{
            required: "Не указано имя",
            validate: (value: string) => {
              if (!value.match(/^(?=.*[a-zA-Z0-9]).{5,20}$/)) {
                return "Некорректное имя [a-z, A-Z, 0-9 от 5 до 20]";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <TextField
              label="Логин"
              placeholder="Введите имя пользователя"
              margin="normal"
              fullWidth={true}
              onChange={(event) => field.onChange(event)}
              value={field.value}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Не указан пароль",
            validate: (value: string) => {
              if (
                !value.match(
                  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/
                )
              ) {
                return "Некорректный пароль [a-z, 0-9, спецсимволы - минимум 8]";
              }
              return true;
            },
          }}
          render={({ field }) => (
            <TextField
              label="Пароль"
              type="password"
              placeholder="Введите пароль"
              margin="normal"
              fullWidth={true}
              onChange={(event) => field.onChange(event)}
              value={field.value}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
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
