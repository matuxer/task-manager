'use client'
import React from "react";

export default function AuthPage() {
  const [ tabValue, setTabValue ] = React.useState('login');

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTabValue(e.target.name)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[350px] bg-white p-8 rounded-lg shadow-sm">
        {/* Card Header */}
        <div>
          <h1 className="font-bold text-xl">Bienvenido</h1>
          <p>Inicia sesión o crea una cuenta nueva</p>
        </div>

        {/* Card Content */}
        <div>
          {/* Tabs */}
          <div className="w-full flex justify-around bg-[#f4f4f5] rounded-md p-1 gap-x-1">
            <label className={`w-full select-none cursor-pointer flex justify-center shadow-sm rounded-md py-2 ${tabValue == 'login' ? 'bg-white' : ''}`}>
              <input type="radio" onChange={handleTabChange} name="login" id="loginTab" checked={tabValue == 'login' ? true : false} className="hidden" />
              <span className={`font-bold ${tabValue == 'login' ? 'text-black' : 'text-gray-400'}`}>Iniciar Sesión</span>
            </label>
            <label className={`w-full select-none cursor-pointer flex justify-center shadow-sm rounded-md py-2 ${tabValue == 'register' ? 'bg-white' : ''}`}>
              <input type="radio" onChange={handleTabChange} name="register" id="registerTab" checked={tabValue == 'register' ? true : false} className="hidden" />
              <span className={`font-bold ${tabValue == 'register' ? 'text-black' : 'text-gray-400'}`}>Registrarse</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
