"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    reset, // 🔥 Método para resetear el formulario
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    mode: "onChange", // Validaciones en tiempo real
  });

  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    setSuccessMessage("¡Login enviado correctamente!");
    
    // Reseteamos el formulario después de un envío exitoso
    reset(); // Esto borra los campos
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

      {/* Password */}
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

      {/* Botón */}
      <Button
        type="submit"
        className="w-full"
        disabled={!isValid} // Bloqueamos el botón hasta que todo sea válido
      >
        Iniciar Sesión
      </Button>

      {/* Mensaje de éxito */}
      {successMessage && (
        <p className="text-green-600 text-center text-sm mt-4">{successMessage}</p>
      )}
    </form>
  );
}

