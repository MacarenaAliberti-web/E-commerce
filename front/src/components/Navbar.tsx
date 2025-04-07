"use client";
import React from "react";
import Link from "next/link";
import { FaUser, FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* IZQUIERDA: Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-blue-400 hover:text-blue-300 transition duration-200">
  💻 Mi<span className="text-white">Tienda</span>
</Link>




        {/* CENTRO: Buscador */}
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full px-4 py-2 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* DERECHA: Links */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 text-sm">
          <Link href="/register" className="hover:text-gray-300">
            Creá tu cuenta
          </Link>
          <Link href="/login" className="hover:text-gray-300 flex items-center gap-1">
            <FaUser />
            Ingresá
          </Link>
          <Link href="/orders" className="hover:text-gray-300">
            Mis compras
          </Link>
          <Link href="/cart" className="hover:text-gray-300 text-lg">
            <FaShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}
