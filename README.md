# ✅ Todo App — MERN Stack

A full-stack Todo application built with the MERN stack. Users can register, log in, and manage their personal to-do lists with full CRUD functionality. Authentication is handled via **JWT**, passwords are securely hashed using **BCrypt** via a Mongoose `pre-save` hook, and input is validated server-side using **Joi**.

🔗 **Frontend Repo:** [TodoFrontend](https://github.com/Farhan-Shaikh-25/TodoFrontend)  
🔗 **Backend Repo:** [TodoBackend](https://github.com/Farhan-Shaikh-25/TodoBackend)

live web app line: https://keeptask.netlify.app

---

## 🚀 Features

- 🔐 User registration and login with JWT-based authentication
- 🔒 Password hashing with BCrypt using a Mongoose `pre-save` hook
- ✅ Create, read, and delete todos
- 🧑‍💼 Each user sees only their own todos (protected routes)
- 📦 RESTful API backend with Express.js v5
- ⚛️ Responsive React 19 frontend with Tailwind CSS
- ☁️ Frontend deployed on Netlify

---

## 🏗️ Tech Stack

### Frontend
| Package | Version |
|---|---|
| React | ^19.1.0 |
| Vite | ^6.3.5 |
| React Router DOM | ^7.6.0 |
| Axios | ^1.9.0 |
| Tailwind CSS | ^4.1.7 |
| jwt-decode | ^4.0.0 |
| Lucide React | ^0.511.0 |

### Backend
| Package | Version |
|---|---|
| Express | ^5.1.0 |
| Mongoose | ^8.15.1 |
| BCrypt | ^6.0.0 |
| JSON Web Token | ^9.0.2 |
| dotenv | ^16.5.0 |
| cors | ^2.8.5 |
| nodemon | (dev) |

---

## 📁 Project Structure

```
TodoFrontend/
├── src/                  # React app source
├── index.html
├── vite.config.js
├── netlify.toml          # Netlify deployment config
└── package.json

TodoBackend/
├── src/
│   └── server.js         # Express app entry point
└── package.json
```

---

## 🔐 Auth & Security Details

### JWT Authentication
- On successful login, the server signs and returns a JWT.
- The token is stored client-side and decoded using `jwt-decode`.
- Every request to a protected route sends the token via the `Authorization: Bearer <token>` header.
- The backend verifies the token in an `authMiddleware` before processing the request.

### BCrypt Password Hashing
- Passwords are **never stored in plain text**.
- The `User` model uses a Mongoose `pre('save')` hook to automatically hash the password with BCrypt before it reaches the database.

```js
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
```

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm

---

### 🔧 Backend Setup

```bash
# Clone the backend repo
git clone https://github.com/Farhan-Shaikh-25/TodoBackend.git
cd TodoBackend

# Install dependencies
npm install

# Create a .env file
touch .env
```

Add the following to your `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

```bash
# Start the server with nodemon
npm start
```

The backend will run on `http://localhost:5000`.

---

### 💻 Frontend Setup

```bash
# Clone the frontend repo
git clone https://github.com/Farhan-Shaikh-25/TodoFrontend.git
cd TodoFrontend

# Install dependencies
npm install

# Start the Vite dev server
npm run dev
```

The frontend will run on `http://localhost:5173`.

> Make sure the backend is running before starting the frontend.

---

## 📡 API Endpoints

### User Routes — `/users`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/signup` | Register a new user | ❌ |
| POST | `/login` | Login and receive JWT | ❌ |
| GET | `/:userId` | Get user name | ✅ |

### Todo Routes — `/api/todos`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/:userId` | Get all todos for the logged-in user | ✅ |
| POST | `/` | Create a new todo | ✅ |
| DELETE | `/:userId/:id` | Delete a todo | ✅ |

---

## ☁️ Deployment

- **Frontend** is deployed on [Netlify](https://www.netlify.com/) — configured via `netlify.toml`.
- **Backend** can be deployed on platforms like [Render](https://render.com/), [Railway](https://railway.app/), or [Cyclic](https://www.cyclic.sh/).

---

## 👨‍💻 Author

**Farhan Shaikh**  
[GitHub](https://github.com/Farhan-Shaikh-25)
