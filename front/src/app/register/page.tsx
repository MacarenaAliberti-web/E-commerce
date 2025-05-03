import { RegisterForm } from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 p-6">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>
        <RegisterForm />
      </div>
    </div>
  );
}

      
       
    