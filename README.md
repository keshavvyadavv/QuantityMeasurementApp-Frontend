Bhai 👍 ye raha **complete single README.md file** — copy → paste directly GitHub me 👇

```
# Quantity Measurement App

A full-stack web application for performing quantity measurements including comparison, conversion, and arithmetic operations across multiple measurement types.

---

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- React Router DOM
- CSS (Custom Styling)

### Backend
- Spring Boot (Java)
- Spring Security with JWT Authentication
- MySQL Database
- Swagger UI for API Documentation

---

## ✨ Features

### 🔐 Authentication
- User Registration (Signup)
- User Login with JWT Token
- Protected Routes — dashboard accessible only after login
- Success and Error toast notifications

### 📊 Measurement Types
- 📏 Length — Feet, Inches, Yards, Centimeters
- ⚖️ Weight — Kilogram, Gram, Milligram, Pound, Tonne
- 🌡️ Temperature — Celsius, Fahrenheit, Kelvin
- 🧴 Volume — Litre, Millilitre, Gallon

### ⚙️ Operations
- Comparison — Compare two quantities with `<`, `>`, `=` result
- Conversion — Convert a quantity from one unit to another
- Arithmetic — Add, Subtract, Multiply, Divide two quantities

### 🕒 History
- All operations are automatically saved to the database
- View history of all performed operations in a popup modal

---

## 📁 Project Structure

```

quantity-measurement-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Toast.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   └── Dashboard.tsx
│   ├── styles/
│   │   ├── auth.css
│   │   └── dashboard.css
│   ├── api.ts
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json

````

---

## ⚙️ Backend API Endpoints

### 🔐 Auth APIs

| Method | Endpoint        | Description            |
|--------|---------------|------------------------|
| POST   | /auth/register | Register new user     |
| POST   | /auth/login    | Login and get JWT token |

---

### 📊 Quantity APIs (JWT Required)

| Method | Endpoint | Description |
|--------|---------|------------|
| POST | /api/v1/quantities/compare | Compare two quantities |
| POST | /api/v1/quantities/convert | Convert a quantity |
| POST | /api/v1/quantities/add | Add two quantities |
| POST | /api/v1/quantities/subtract | Subtract two quantities |
| POST | /api/v1/quantities/multiply | Multiply two quantities |
| POST | /api/v1/quantities/divide | Divide two quantities |
| GET | /api/v1/quantities/history/operation/{operation} | Get history by operation |
| GET | /api/v1/quantities/history/type/{measurementType} | Get history by type |

---

## 📦 Request Body Format

```json
{
  "thisQuantityDTO": {
    "value": 1,
    "unit": "FEET",
    "measurementType": "LengthUnit"
  },
  "thatQuantityDTO": {
    "value": 12,
    "unit": "INCHES",
    "measurementType": "LengthUnit"
  },
  "targetUnit": "FEET"
}
````

---

## 📏 Valid Units

| Type            | Units                                   |
| --------------- | --------------------------------------- |
| LengthUnit      | FEET, INCHES, YARDS, CENTIMETERS        |
| WeightUnit      | KILOGRAM, GRAM, MILLIGRAM, POUND, TONNE |
| VolumeUnit      | LITRE, MILLILITRE, GALLON               |
| TemperatureUnit | CELSIUS, FAHRENHEIT, KELVIN             |

---

## 🚀 Getting Started

### 📌 Prerequisites

* Node.js 18+
* Java 17+
* MySQL

---

### 🔧 Backend Setup

```bash
cd QuantityMeasurementApp
```

Configure database in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/quantity_measurement_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Run backend:

```bash
./mvnw spring-boot:run
```

👉 Backend runs on: [http://localhost:8080](http://localhost:8080)

---

### 💻 Frontend Setup

```bash
cd quantity-measurement-app
npm install
npm install react-router-dom
npm start
```

👉 Frontend runs on: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication Flow

1. User registers via Signup form
2. Redirected to Login
3. User logs in with email & password
4. JWT token stored in `localStorage`
5. All API calls include token in `Authorization` header
6. On logout → token removed

---

## 🗄️ Database

* `users` → stores user data
* `quantity_measurement` → stores operation history

---

## 📖 API Documentation

Swagger UI available at:

```
http://localhost:8080/swagger-ui/index.html
```

```

---

## 💯 Done
👉 Direct GitHub ready  
👉 Clean + professional  

---

Agar next level banana hai:
- ⭐ badges  
- 📸 screenshots  
- 🌍 deployment (Netlify + Render)  

```
