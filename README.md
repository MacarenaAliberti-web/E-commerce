# 🛒 E-commerce Fullstack con Next.js y Express

Este es un proyecto fullstack de E-commerce donde construi una **interfaz de usuario moderna** usando **React con el framework Next.js** y conecte con un **servidor backend desarrollado en Express.js**.

El objetivo es renderizar información de productos electrónicos, permitiendo agregar al carrito, registrarse como usuario y ver órdenes de compra, todo mediante peticiones HTTP hacia el backend provisto.

---

## ⚙️ Tecnologías Utilizadas

### 🧠 Frontend (`/front`)
- **Next.js** 15.2.4
- **React** 19
- **Zustand** para manejo de estado global
- **TailwindCSS** para estilos utilitarios
- **React Hook Form** para formularios
- **Lucide React** y **React Icons** para íconos
- **Slick Carousel** para carruseles
- **React Hot Toast** para notificaciones

### 🚀 Backend (`/back`)
- **Express.js** + **TypeScript**
- **TypeORM** para la conexión a base de datos PostgreSQL
- **JWT** para autenticación
- **bcrypt** para encriptación de contraseñas
- **Swagger** para documentación de la API

---

## 🧩 Funcionalidades

- ✅ Renderizado dinámico de productos desde la API
- ✅ Vista principal y vista de detalle de producto
- ✅ Carrito de compras persistente
- ✅ Registro y login de usuarios
- ✅ Autenticación basada en tokens JWT
- ✅ Visualización de órdenes del usuario
- ✅ Panel de usuario con perfil y logout

---

## 🚀 Cómo ejecutar el proyecto

### 🔧 Requisitos previos

- Node.js v18+
- PostgreSQL (con base de datos configurada)
- Yarn o NPM

### 🖥 Backend

```bash
cd back
npm install
npm start
```
configurar .env con credenciales de PostgreSQL y JWT_SECRET

### 🌐 Frontend

```bash
cd front
npm install
npm run dev
```
Frontend corre en: http://localhost:3001
Backend corre en: http://localhost:3000 (o según tu .env)

## 📜 Scripts disponibles

Frontend
npm run dev: inicia el servidor Next.js en modo desarrollo
npm run build: crea una build de producción
npm start: corre la app en producción
npm run lint: ejecuta ESLint

Backend
npm start: inicia el servidor Express con ts-node y nodemon

## 🔐 Autenticación
El backend provee endpoints para:
POST /auth/register: registrar nuevo usuario
POST /auth/login: login de usuario
El token JWT se almacena en localStorage y se usa para acceder al carrito y órdenes.

## 📦 Extras
El flujo de navegación y diseño fueron definidos por mi.
El uso de TailwindCSS y Zustand permite un desarrollo ágil, modular y escalable.
Ideal para practicar integraciones frontend-backend modernas con autenticación.

## 👩‍💻 Autor

**Macarena Aliberti**  
Desarrolladora Frontend con formación en desarrollo Full Stack

---

## 💡 Reflexión

Este proyecto fue una gran oportunidad para integrar y aplicar conocimientos adquiridos sobre desarrollo fullstack. A lo largo del proceso, pude afianzar conceptos de frontend con React y Next.js, y también comprender mejor la lógica del backend, especialmente cómo se gestionan las rutas, autenticación y conexión con la base de datos.
Más allá del código, fue un ejercicio clave para entender el flujo completo de una aplicación real: desde el consumo de una API, la gestión de estado global, el diseño de una interfaz atractiva y funcional, hasta la experiencia del usuario final.
Cada funcionalidad implementada fue un desafío que me permitió crecer como desarrolladora, y hoy me siento mucho más preparada para enfrentar proyectos de mayor complejidad. Este e-commerce no es solo una práctica técnica, sino también una muestra del camino recorrido y del entusiasmo con el que sigo aprendiendo.

---

¡Gracias por visitar mi proyecto! 🙋‍♀️✨



