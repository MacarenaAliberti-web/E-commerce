import { apiUrl } from "@/config/apiURL";
import { RegisterUserType, FormDataLoginType } from "@/types/user";

// 👉 Registro de usuario
export async function registerUser(userData: RegisterUserType) {
  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Error al registrar usuario");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error registrando usuario: ${error}`);
  }
}

// 👉 Login de usuario
export async function loginUser(credentials: FormDataLoginType) {
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }
  
      const data = await response.json();
  
      // Guardar token en localStorage
      localStorage.setItem("token", data.token);
  
      // (Opcional) Guardar datos del usuario
      localStorage.setItem("user", JSON.stringify(data.user));
  
      return data;
    } catch (error) {
      throw new Error(`Error al iniciar sesión: ${error}`);
    }
  }