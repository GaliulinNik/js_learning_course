import React from "react";
import "./styles.css";
import { AuthForm } from "./auth-form";
import logo from "../../logo-75-wh.png";

export const AuthPage: React.FC = () => {
  return (
    <div className="auth-page">
      <AuthForm />
      <img src={logo} alt="image" />
    </div>
  );
};
