
import { apiUrl } from "@/config/apiURL";
import { RegisterUserType, FormDataLoginType } from "@/types/user";



// 👉 Registro de usuario
export async function registerUser(userData: RegisterUserType) {
  
  const {  email, password, name, address, phone } = userData;

  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, address, phone }),
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
const token = data.token;
    // Guardar token en localStorage y store
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // ✅ Actualizar estado global (Zustand)
    const { setToken } = token;
    setToken(data.token);

    return data;
  } catch (error) {
    throw new Error(`Error al iniciar sesión: ${error}`);
  }
}