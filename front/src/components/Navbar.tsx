"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser, FaShoppingCart, FaHome, FaPowerOff } from "react-icons/fa";
import store from "@/store/index";
import useHasHydrated from "@/hooks/useHasHydrated";

export default function Navbar() {
  const router = useRouter();
  const hasHydrated = useHasHydrated();
  const [searchTerm, setSearchTerm] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { userData, logout, cart } = store();
  const token = userData?.token;

  if (!hasHydrated) return null;

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const confirmLogout = () => {
    logout();
    router.push("/");
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight text-blue-400 hover:text-blue-300 transition duration-200"
          >
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

          <div className="flex items-center gap-3 text-lg relative">
            {!token ? (
              <>
                <Link href="/register" className="hover:text-gray-300">
                  📝
                </Link>
                <Link href="/login" className="hover:text-gray-300">
                  <FaUser />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md transition"
                >
                  <FaHome />
                </Link>

                <Link
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md transition"
                >
                  <FaUser />
                </Link>

                <Link
                  href="/cart"
                  className="relative bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md transition"
                >
                  <FaShoppingCart />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="bg-red-600 hover:bg-red-500 text-white p-2 rounded-md transition"
                >
                  <FaPowerOff />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modal de confirmación */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-xl text-center max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              ¿Estás seguro que querés cerrar sesión?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded"
              >
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
