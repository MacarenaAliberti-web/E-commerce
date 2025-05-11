"use client"

import React, { useEffect } from "react"
import store from "@/store/index"
import { useRouter } from "next/navigation"
import useHasHydrated from "@/hooks/useHasHydrated"
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const hasHydrated = useHasHydrated()
  const { userData, logout } = store()
  const router = useRouter()

  useEffect(() => {
  if (hasHydrated && !store.getState().isAuthenticated()) {
    toast.error("Debes iniciar sesión para acceder al panel de usuario");
    setTimeout(() => router.push("/login"), 1500);
  }
}, [hasHydrated, router]);


  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <h1 className="text-2xl font-bold text-white">Cargando datos...</h1>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <h1 className="text-2xl font-bold text-white">
          No se encontraron datos del usuario.
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Mi Panel</h2>
        <nav className="space-y-4 mb-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="block w-full text-left text-white hover:text-blue-400"
          >
            Perfil
          </button>
          <button
            onClick={() => router.push("/order-history")}
            className="block w-full text-left text-white hover:text-blue-400"
          >
            Historial de compras
          </button>
        </nav>
        <button
          onClick={() => {
            logout()
            router.push("/")
          }}
          className="block w-full text-left text-white hover:text-blue-400"
        >
          Cerrar sesión
        </button>
      </aside>

     <main className="flex-1 flex flex-col items-center pt-6">
  <div className="text-center">
    <h1 className="text-4xl font-extrabold mb-6">
      Bienvenido, {userData.user.name}
    </h1>

    <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">
        Detalles de tu cuenta
      </h2>
      <div className="space-y-4 text-left">
        <p><strong>Email:</strong> {userData.user.email}</p>
        <p><strong>Nombre:</strong> {userData.user.name}</p>
        <p><strong>Dirección:</strong> {userData.user.address}</p>
        <p><strong>Teléfono:</strong> {userData.user.phone}</p>
      </div>
    </div>
  </div>
</main>

    </div>
  )
}
