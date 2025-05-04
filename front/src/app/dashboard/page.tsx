"use client";

import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store";
import { useRouter } from "next/navigation";
import { RegisterUserType } from "@/types/user";

export default function Dashboard() {
  const { token, logout } = useAuthStore();
  const router = useRouter();
  const [userData, setUserData] = useState<RegisterUserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      const user = localStorage.getItem("user");
      if (user) {
        setUserData(JSON.parse(user));
      }
      setLoading(false);
    }
  }, [token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <h1 className="text-2xl font-bold text-white">Cargando...</h1>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <h1 className="text-2xl font-bold text-white">
          No se encontraron datos del usuario.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-6">
        Bienvenido, {userData.name}
      </h1>

      <div className="bg-gray-900 p-6 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Detalles de tu cuenta
        </h2>
        <div className="space-y-4">
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Nombre:</strong> {userData.name}
          </p>
          <p>
            <strong>Dirección:</strong> {userData.address}
          </p>
          <p>
            <strong>Teléfono:</strong> {userData.phone}
          </p>
          
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push("/orders")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md shadow-md"
        >
          Ver mis compras
        </button>
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-md shadow-md"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
