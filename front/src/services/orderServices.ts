// src/services/orderServices.ts
export const createOrder = async (
  productIDs: number[],
  userId: string,
  token: string
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      userId,
      products: productIDs
    })
  });

  if (!res.ok) throw new Error('Error al crear la orden');
  return await res.json();
};
