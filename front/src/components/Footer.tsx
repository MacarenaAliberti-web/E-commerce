import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() { 
  return (
    <footer className="bg-gray-700 text-white text-center p-6 mt-auto shadow-lg">
      <div className="container mx-auto">
        <p className="text-sm md:text-base font-light">
          © 2025 Mi Tienda. Todos los derechos reservados.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="#facebook" className="text-white hover:text-gray-400 transition-colors duration-300">
            <FaFacebook size={24} />
          </a>
          <a href="#twitter" className="text-white hover:text-gray-400 transition-colors duration-300">
            <FaTwitter size={24} />
          </a>
          <a href="#instagram" className="text-white hover:text-gray-400 transition-colors duration-300">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

