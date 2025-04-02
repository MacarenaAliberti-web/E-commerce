"use client";
import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-2xl font-bold tracking-wide">Mi Tienda</h1>
      <div className="space-x-6">
        <Link href="/" className="hover:text-gray-300 transition duration-200">
          Inicio
        </Link>
        <Link href="/landing" className="hover:text-gray-300 transition duration-200">
          Presentación
        </Link>
        <Link href="/cart" className="hover:text-gray-300 transition duration-200">
          Carrito
        </Link>
        <Link href="/dashboard" className="hover:text-gray-300 transition duration-200">
          Perfil del Usuario
        </Link>
      </div>
    </nav>
  );
}
