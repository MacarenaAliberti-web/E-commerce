"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "@/services/auth";
import { RegisterUserType } from "@/types/user";  // Importamos la interfaz User
import { toast } from "react-hot-toast";  // Asegúrate de que Toaster esté en layout.tsx

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterUserType>({  // Usamos la interfaz User aquí
    mode: "onChange",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: RegisterUserType) => {  // Usamos User aquí también
    try {
      await registerUser(data);  // Ahora pasamos el objeto User directamente

      setSuccessMessage("¡Registro enviado correctamente!");
      toast.success("¡Registro exitoso!");  // Mostramos alerta de éxito
      reset();
      setErrorMessage("");
    } catch {
      setErrorMessage("Hubo un error al registrar el usuario.");
      toast.error("Hubo un error al registrar el usuario.");  // Mostramos alerta de error
      setSuccessMessage("");
    }
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-md mx-auto p-6 border rounded-xl shadow-md bg-white"
    >
      {/* Nombre */}
      <div className="space-y-1">
        <Label htmlFor="name">Nombre</Label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: "El nombre es obligatorio" }}
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              placeholder="Ingrese su nombre"
              className={errors.name ? "border-red-500" : ""}
            />
          )}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>

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

      {/* Confirmar contraseña */}
      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: "Debes confirmar la contraseña",
            validate: (value) =>
              value === password || "Las contraseñas no coinciden",
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="confirmPassword"
              type="password"
              placeholder="Confirma tu contraseña"
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Dirección */}
      <div className="space-y-1">
        <Label htmlFor="address">Dirección</Label>
        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: "La dirección es obligatoria" }}
          render={({ field }) => (
            <Input
              {...field}
              id="address"
              placeholder="Ingrese su dirección"
              className={errors.address ? "border-red-500" : ""}
            />
          )}
        />
        {errors.address && (
          <p className="text-red-500 text-xs">{errors.address.message}</p>
        )}
      </div>

      {/* Teléfono */}
      <div className="space-y-1">
        <Label htmlFor="phone">Teléfono</Label>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          rules={{ required: "El teléfono es obligatorio" }}
          render={({ field }) => (
            <Input
              {...field}
              id="phone"
              placeholder="Ingrese su teléfono"
              className={errors.phone ? "border-red-500" : ""}
            />
          )}
        />
        {errors.phone && (
          <p className="text-red-500 text-xs">{errors.phone.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!isValid}
      >
        Registrarse
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
