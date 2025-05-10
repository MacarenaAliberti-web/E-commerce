import { apiUrl } from "@/config/apiURL";

export async function getOrdersByUser(userId: string, token: string) {
  try {
    const response = await fetch(`${apiUrl}/users/orders`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
        Authorization: token, 
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener el historial de compras");
    }

    const data = await response.json();

    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error en getOrdersByUser:", error);
    return null;
  }
}
