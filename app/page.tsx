'use client'
import React from "react";
import { funnelDisplay } from "./ui/fonts/fonts";
import AuthForm from "./components/AuthForm";

export default function AuthPage() {
  const [ tabValue, setTabValue ] = React.useState<'login' | 'register'>('login');

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTab = e.target.name as 'login' | 'register';
    setTabValue(selectedTab)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`w-[350px] bg-white p-7 rounded-lg shadow-sm dark:bg-gray-800 ${funnelDisplay.className}`}>
        {/* Card Header */}
        <div>
          <h1 className="font-bold text-3xl dark:text-white">Bienvenido</h1>
          <p className="text-gray-500 dark:text-gray-300">Inicia sesión o crea una cuenta nueva</p>
        </div>

        {/* Card Content */}
        <div>
          {/* Tabs */}
          <div className="w-full flex justify-around bg-[#f4f4f5] rounded-md p-1 gap-x-1 mt-6 dark:bg-gray-900">
            <label className={`w-full select-none cursor-pointer flex justify-center shadow-sm rounded-md py-2 ${tabValue == 'login' ? 'bg-white dark:bg-gray-800' : ''}`}>
              <input type="radio" onChange={handleTabChange} name="login" id="loginTab" checked={tabValue == 'login' ? true : false} className="hidden" />
              <span className={`font-semibold ${tabValue == 'login' ? 'text-black dark:text-white' : 'text-gray-400'}`}>Iniciar Sesión</span>
            </label>
            <label className={`w-full select-none cursor-pointer flex justify-center shadow-sm rounded-md py-2 ${tabValue == 'register' ? 'bg-white dark:bg-gray-800' : ''}`}>
              <input type="radio" onChange={handleTabChange} name="register" id="registerTab" checked={tabValue == 'register' ? true : false} className="hidden" />
              <span className={`font-semibold ${tabValue == 'register' ? 'text-black dark:text-white' : 'text-gray-400'}`}>Registrarse</span>
            </label>
          </div>

          {/* Forms */}
          <AuthForm authType={tabValue} />
        </div>
      </div>
    </div>
  );
}
