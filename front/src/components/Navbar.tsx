"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuthStore } from "@/store";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const { token, logout } = useAuthStore();
  const { cart } = useCartStore();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 👇 Se asegura que solo se renderice en el cliente
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-blue-400 hover:text-blue-300 transition duration-200">
          💻 Mi<span className="text-white">Tienda</span>
        </Link>

        <form onSubmit={handleSearch} className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </form>

        <div className="flex items-center gap-4 text-sm relative">
          {!token ? (
            <>
              <Link href="/register" className="hover:text-gray-300">
                Creá tu cuenta
              </Link>
              <Link href="/login" className="hover:text-gray-300 flex items-center gap-1">
                <FaUser />
                Ingresá
              </Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="hover:text-gray-300">
                Mi Cuenta
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="hover:text-gray-300"
              >
                Cerrar sesión
              </button>
            </>
          )}
          {token && (
            <div className="relative">
              <Link href="/cart" className="hover:text-gray-300 text-lg">
                <FaShoppingCart />
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
