"use client"

import { useEffect, useState } from "react"
import store from "@/store/index"
import { useRouter } from "next/navigation"
import useHasHydrated from "@/hooks/useHasHydrated"
import { getOrdersByUser } from "@/services/orderServices"
import { IProduct } from "@/types/product"
import Image from "next/image"
import { toast } from "react-hot-toast"

interface IOrder {
  id: number
  date: string
  products: IProduct[]
}

const OrderHistory = () => {
  const router = useRouter()
  const hasHydrated = useHasHydrated()
  const { userData, isAuthenticated } = store()

  const [orders, setOrders] = useState<IOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (hasHydrated && !isAuthenticated()) {
      toast.error("Debes iniciar sesión para acceder al historial de compras")
      router.push("/login")
    }
  }, [hasHydrated, isAuthenticated, router])

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userData) return

      setLoading(true)
      const response = await getOrdersByUser(
        String(userData.user.id),
        String(userData.token)
      )

      if (response) {
        response.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        setOrders(response)
      }

      setLoading(false)
    }

    if (hasHydrated && isAuthenticated()) {
      fetchOrders()
    }
  }, [hasHydrated, isAuthenticated, userData])

  if (!hasHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">Cargando datos del usuario...</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">Cargando historial...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">Aún no realizaste ninguna compra.</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          Historial de Compras
        </h2>

        {orders.map((order) => {
          const total = order.products
            .reduce((acc, product) => acc + product.price, 0)
            .toFixed(2)

          return (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow-md bg-blue-100"
            >
              <p className="text-sm text-gray-500">
                Fecha: {new Date(order.date).toLocaleDateString()}
              </p>

              <div className="mt-2 space-y-2">
                {order.products.map((product: IProduct) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-4 border p-2 rounded bg-blue-200"
                  >
                    <div className="relative w-16 h-16">
                      <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <p className="text-lg font-semibold">Total: ${total}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderHistory;
