"use client"

import React, { useEffect, useState } from "react"
import store from "@/store/index"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { userData, logout } = store()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userData?.token) {
      router.push("/login")
    } else {
      setLoading(false)
    }
  }, [userData?.token, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <h1 className="text-2xl font-bold text-white">Cargando...</h1>
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
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center py-10">
      <h1 className="text-4xl font-extrabold text-gray-100 mb-6">
        Bienvenido, {userData.user.name}
      </h1>

      <div className="bg-gray-900 p-6 rounded-lg shadow-md max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-blue-400 mb-4">
          Detalles de tu cuenta
        </h2>
        <div className="space-y-4">
          <p>
            <strong>Email:</strong> {userData.user.email}
          </p>
          <p>
            <strong>Nombre:</strong> {userData.user.name}
          </p>
          <p>
            <strong>Dirección:</strong> {userData.user.address}
          </p>
          <p>
            <strong>Teléfono:</strong> {userData.user.phone}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => {
            logout()
            router.push("/")
          }}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md shadow-md"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
