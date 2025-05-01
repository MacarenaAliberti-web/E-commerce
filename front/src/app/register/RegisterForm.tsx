"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    mode: "onChange",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = (data: RegisterFormInputs) => {
    console.log("Submit exitoso", data);
    setSuccessMessage("¡Registro enviado correctamente!");
    reset();
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
    </form>
  );
}
