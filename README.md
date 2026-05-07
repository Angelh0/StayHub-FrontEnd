# StayHub - FrontEnd

<img width="1896" height="897" alt="image" src="https://github.com/user-attachments/assets/dd30363d-fbcf-4f6f-91f7-e06f68ca18da" />

## 📍 Estado del proyecto

✅ **Finalizado**

Este repositorio contiene la aplicación cliente del ecosistema StayHub. Está diseñada para consumir la arquitectura de microservicios backend, ofreciendo una experiencia de usuario fluida y, sobre todo, una interfaz dinámica que se modifica en tiempo real dependiendo del rol y estado del usuario.

---

## 🎯 Interfaz Dinámica y Gestión de Roles

Una de las características de este frontend es cómo la navegación (`Navbar`) y las opciones se desbloquean progresivamente según el JWT del usuario:

### Vista de Invitado
Al entrar, el sistema asigna un token temporal en el `LocalStorage`. El usuario puede usar el buscador avanzado de una manera limpia y orientada.
* **Opciones visibles:** Botón de `Acceder` que abre los modales de iniciar sesión y registrarse.

<img width="1900" height="118" alt="image" src="https://github.com/user-attachments/assets/af218f2e-bf9d-4473-9652-0528a6fa0ec8" />

### Vista de Usuario Registrado (User)
Una vez logueado, la interfaz cambia para ofrecer herramientas de viaje y captación de anfitriones.
* **Opciones desbloqueadas:** Mensaje de bienvenida con el nombre del usuario, sección `Mis reservas` (para gestionar su historial y cancelaciones), y el banner/botón estratégico de `¿Tienes un alojamiento?` para iniciar el *Upgrade* a propietario.

<img width="1905" height="111" alt="image" src="https://github.com/user-attachments/assets/be3af5ed-4a3e-49f9-8755-0b6ed2f07723" />

### 3. Vista de Propietario (Owner)
El nivel máximo de acceso. Transforma la web en una herramienta de gestión completa (Dashboard).
* **Opciones desbloqueadas:** El botón de captación desaparece y se habilita el botón `Reservas recibidas` y el menú desplegable `Gestionar`.
* **Menú "Gestionar":** Despliega opciones críticas como *Crear Alojamiento*, *Crear Habitación* o ir al panel de propiedades.

<img width="1891" height="282" alt="image" src="https://github.com/user-attachments/assets/8a711a5e-c5fc-432e-a2d6-cf3a7d4f3887" />

---

## 🛠️ Paneles de Control

### Mis Alojamientos y Borradores
Un panel diseñado para la comodidad del propietario. Clasifica automáticamente las propiedades:
* **Modo Borrador (Draft):** Si el propietario usó la opción "Guardar y Salir" en el formulario *Multi-step*, el alojamiento aparece aquí con una leyenda visual de lo que falta por completar.
* **Alojamientos Activos:** Permite modificar datos, añadir habitaciones y entrar al gestor de bloqueos.

Alojamiento borrador:
<img width="1901" height="885" alt="image" src="https://github.com/user-attachments/assets/5ba37119-5519-42a3-b14f-3832dfb77311" />

Alojamiento publicado:
<img width="1898" height="870" alt="image" src="https://github.com/user-attachments/assets/2b319412-7a08-45f9-933c-7dcd48506202" />

### Gestión Integral de Reservas
Áreas separadas lógicamente para evitar confusiones de dominio:
* **Mis Reservas (Vista Cliente):** Control de reservas activas, historial y cancelaciones.
* **Reservas Recibidas (Vista Anfitrión):** Panel donde el propietario visualiza todas las reservas entrantes a sus alojamientos, con filtros específicos para no mezclar propiedades.

Reserva realizada por cliente:
<img width="1901" height="636" alt="image" src="https://github.com/user-attachments/assets/be511cd2-7b77-459f-b0d1-97e436e92a4b" />

Reserva recibida por propietario: 
<img width="1885" height="832" alt="image" src="https://github.com/user-attachments/assets/6767dc81-d0c9-4c4a-aa8c-b931e1d5a8e5" />


---

## Motor de Búsqueda y Creación

* **Buscador Completo:** Resultados precisos filtrando por destino, fechas y capacidades, con cálculo de **Precio Total** en tiempo real antes del Checkout.
* **Formulario Multi-Step:** Flujo de 5 pasos para crear alojamientos, con subida de imágenes en vivo conectada a la API de Cloudinary.

Formulario de creación de alojamientos
<img width="1893" height="862" alt="image" src="https://github.com/user-attachments/assets/44c8852b-ea9e-419d-9d30-e1693550ca01" />

Formulario de creación de habitaciones
<img width="1890" height="791" alt="image" src="https://github.com/user-attachments/assets/77f3d26b-7b4a-47d3-b11e-a731c80ebb03" />

Busqueda de alojamientos: (Busqueda realizada | Destino: Madrid | CheckIn: 08/05/2026 | CheckOut: 09/05/2026 | Huespedes: 1 | Habitaciones: 1)

<img width="1887" height="831" alt="image" src="https://github.com/user-attachments/assets/2fd5a423-bf02-47f4-82d4-f6663e1f1aef" />

Busqueda de habitaciones: 

<img width="1890" height="840" alt="image" src="https://github.com/user-attachments/assets/0a15173c-a95d-4908-94cd-d157865754dc" />


---

## ⚙️ Tecnologías utilizadas
* **Core:** React.js
* **Enrutamiento y Estado:** React Router DOM, persistencia segura en LocalStorage
* **Integraciones:** Cloudinary API
* **Comunicación:** API REST hacia el Backend Gateway
* **Despliegue:** Docker y Docker Compose
