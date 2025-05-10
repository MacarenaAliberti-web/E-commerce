"use client";

import { useEffect, useState } from "react";
import store from "@/store/index";
import { getOrdersByUser } from "@/services/orderServices";
import { IProduct } from "@/types/product";

interface IOrder {
  id: number;
  date: string;
  products: IProduct[];
  total: number;
}

export const OrderHistory = () => {
  const { userData, isAuthenticated } = store();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData) return;
      setLoading(true);

      const response = await getOrdersByUser(
        String(userData.user.id),
        String(userData.token)
      );

      if (response) {
        setOrders(response);
      }

      setLoading(false);
    };

    fetchOrders();
  }, [userData]);

  if (!isAuthenticated()) {
    return <p className="text-center text-red-500">No estás logueado.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500">Cargando historial...</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Aún no realizaste ninguna compra.
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Historial de Compras</h2>

      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-4 shadow-md">
          <p className="text-sm text-gray-500">Fecha: {new Date(order.date).toLocaleDateString()}</p>

          <div className="mt-2 space-y-2">
            {order.products.map((product: IProduct) => (
              <div key={product.id} className="flex items-center space-x-4 border p-2 rounded">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
