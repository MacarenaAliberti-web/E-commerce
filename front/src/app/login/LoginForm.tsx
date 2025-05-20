"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { loginUser } from "@/app/login/auth"; 
import { toast } from "react-hot-toast"; 
import { useRouter } from "next/navigation"; 
import { FormDataLoginType } from "@/types/user"; 
import store from "@/store";


export function LoginForm() {
  const router = useRouter(); 
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
    await loginUser(data); 
    setSuccessMessage("¡Inicio de sesión exitoso!");
    toast.success("¡Bienvenido de nuevo!");
    reset();
    setErrorMessage("");

    const redirectPath = store.getState().redirectAfterLogin;
    if (redirectPath) {
      store.setState({ redirectAfterLogin: null }); 
      router.push(redirectPath);
    } else {
      router.push("/");
    }
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
        disabled={!isValid} 
      >
        Iniciar Sesión
      </Button>

      {successMessage && (
        <p className="text-green-600 text-center text-sm mt-4">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 text-center text-sm mt-4">{errorMessage}</p>
      )}

      <div className="text-center mt-6 text-sm text-gray-700">
        ¿No estás registrado?{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="text-blue-600 hover:underline focus:outline-none"
        >
          Regístrate
        </button>
      </div>
    </form>
  );
}

