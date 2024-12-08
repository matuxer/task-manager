import axios from "axios";
import React, { useState } from "react";
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
    try {
      const requestEndpoint = props.authType === 'login' ? 'auth/login' : 'auth/register';
      const requestData = props.authType === 'login' ? {email: input.email, password: input.password} : {name: input.name, email: input.email, password: input.password}

      const responseData = await axiosRequest({endpoint: requestEndpoint, method: 'POST', data: requestData })
      console.log(`Response ${props.authType}: `, responseData);
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error:", error.response?.data);
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("An unexpected error occurred");
      }
    }
  };

  if (props.authType === "login") {
    return (
      <form onSubmit={handleOnSubmit} className="flex flex-col mt-2">
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
        <button type="submit" className={buttonStyles}>
          Iniciar Sesión
        </button>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleOnSubmit} className="flex flex-col mt-2">
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
          />
        </label>
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
        <button type="submit" className={buttonStyles}>
          Registrarse
        </button>
      </form>
    );
  }
}
