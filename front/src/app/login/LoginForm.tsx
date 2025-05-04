"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "@/services/auth"; // 👉 función que hace la petición al backend
import { toast } from "react-hot-toast"; // 👉 para mostrar notificaciones
import { useRouter } from "next/navigation"; // 👉 Para redirigir después del login
import { FormDataLoginType } from "@/types/user"; // 👉 tipado del formulario

export function LoginForm() {
  const router = useRouter(); // 👉 Para redirigir al Dashboard después del login
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormDataLoginType>({
    mode: "onChange",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormDataLoginType) => {
    try {
      await loginUser(data); // Llamada a la API para el login
      setSuccessMessage("¡Inicio de sesión exitoso!");
      toast.success("¡Bienvenido de nuevo!");
      reset();
      setErrorMessage("");

      // Redirigir al dashboard después de login exitoso
      router.push("/dashboard"); 
    } catch {
      setErrorMessage("Credenciales incorrectas o error del servidor.");
      toast.error("Error al iniciar sesión");
      setSuccessMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-6 border rounded-xl shadow-md bg-white"
    >
      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: "El email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "El email no es válido",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="email"
              type="email"
              placeholder="Ingrese su email"
              className={errors.email ? "border-red-500" : ""}
            />
          )}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>

      {/* Contraseña */}
      <div className="space-y-1">
        <Label htmlFor="password">Contraseña</Label>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="password"
              type="password"
              placeholder="Ingrese su contraseña"
              className={errors.password ? "border-red-500" : ""}
            />
          )}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!isValid} // Deshabilitar si el formulario no es válido
      >
        Iniciar Sesión
      </Button>

      {successMessage && (
        <p className="text-green-600 text-center text-sm mt-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center text-sm mt-4">{errorMessage}</p>
      )}
    </form>
  );
}
