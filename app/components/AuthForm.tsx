import axios from "axios";
import React, { useEffect, useState } from "react";
import EyeSvgComponent from "./EyeSvgComponent";
import { axiosRequest } from "../services/axiosRequest";

export default function AuthForm(props: { authType: "login" | "register" }) {
  interface InputState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const initialInputState: InputState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [input, setInput] = useState(initialInputState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const inputSpanStyles = "font-semibold text-sm mt-3 dark:text-white";
  const inputStyles =
    "w-full border-2 border-gray-200 rounded-md py-2 px-4 text-sm focus:outline-none focus:border-black dark:bg-gray-800 dark:border-gray-900 dark:text-white dark:focus:border-white";
  const buttonStyles =
    "bg-black text-white py-2 rounded-md mt-4 dark:bg-gray-200 dark:text-black";
  const visibilityButton =
    "absolute inset-y-0 right-0 flex items-center px-3 text-black dark:text-white";

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      props.authType === "register" &&
      input.password !== input.confirmPassword
    ) {
      setErrorMessages(["Las contraseñas no coinciden."]);
      return;
    }

    try {
      const requestEndpoint =
        props.authType === "login" ? "auth/login" : "auth/register";
      const requestData =
        props.authType === "login"
          ? { email: input.email, password: input.password }
          : { name: input.name, email: input.email, password: input.password };

      const responseData = await axiosRequest({
        endpoint: requestEndpoint,
        method: "POST",
        data: requestData,
      });
      console.log(`Response ${props.authType}: `, responseData);

      setErrorMessages([]);
    } catch (error: unknown) {
      if (typeof error === "string") {
        setErrorMessages([error]);
      } else if (Array.isArray(error)) {
        setErrorMessages(error);
      } else {
        setErrorMessages(["An unexpected error occurred"]);
      }
    }
  };

  useEffect(() => {
    setInput(initialInputState);
    setShowPassword(false);
    setShowConfirmPassword(false);
    setErrorMessages([]);
  }, [props.authType]);

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col mt-2"
      autoComplete="off"
    >
      {props.authType === "register" && (
        <>
          <label className="flex flex-col">
            <span className={inputSpanStyles}>Nombre</span>
            <input
              className={inputStyles}
              type="text"
              name="name"
              id="name_input"
              onChange={handleOnChange}
              value={input.name}
              placeholder="Tu Nombre"
              autoComplete="new-password"
            />
          </label>
        </>
      )}
      <label className="flex flex-col">
        <span className={inputSpanStyles}>Correo electrónico</span>
        <input
          className={inputStyles}
          type="text"
          name="email"
          id="email_input"
          onChange={handleOnChange}
          value={input.email}
          placeholder="m@ejemplo.com"
          autoComplete="new-password"
        />
      </label>
      <label className="flex flex-col">
        <span className={inputSpanStyles}>Contraseña</span>
        <div className="relative">
          <input
            className={inputStyles}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password_input"
            onChange={handleOnChange}
            value={input.password}
            autoComplete="new-password"
          />
          <button
            className={visibilityButton}
            type="button"
            onClick={togglePasswordVisibility}
          >
            <EyeSvgComponent visibility={showPassword} />
          </button>
        </div>
      </label>
      {props.authType === "register" && (
        <label className="flex flex-col">
          <span className={inputSpanStyles}>Confirmar Contraseña</span>
          <div className="relative">
            <input
              className={inputStyles}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirm_password_input"
              onChange={handleOnChange}
              value={input.confirmPassword}
              autoComplete="new-password"
            />
            <button
              className={visibilityButton}
              type="button"
              onClick={toggleConfirmPasswordVisibility}
            >
              <EyeSvgComponent visibility={showConfirmPassword} />
            </button>
          </div>
        </label>
      )}
      {errorMessages.length > 0 && (
        <div className="mt-3">
          {errorMessages.map((message, index) => (
            <p key={index} className="text-red-500 text-sm">
              {message}
            </p>
          ))}
        </div>
      )}
      <button type="submit" className={buttonStyles}>
        {props.authType === "login" ? "Iniciar Sesión" : "Registrarse"}
      </button>
    </form>
  );
}
