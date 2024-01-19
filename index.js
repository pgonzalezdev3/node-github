// imports

const express = require("express");
require("dotenv").config();
const cors = require("cors");

// config de la app
const app = express();
app.use(cors());

// configurar la respuesta que da nuesta api node
app.use((require, response, next) => {
  response.header("Access-Control-Allow-Methods", "GET,PATCH,POST,DELETE");
  response.header("Access-Control-Allow-Credentials", true);
  response.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rutas

app.get("/", (request, response, next) => {
  response.status(200).json({
    status: 200,
    data: {
      method: "GET",
      message: "Bienvenido a la app (GET)",
    },
  });
});

app.post("/", (request, response, next) => {
  response.status(200).json({
    status: 200,
    data: {
      method: "POST",
      message: "Bienvenido a la app (POST)",
    },
  });
});

app.disable("x-powered-by");

// manejo de errores

app.use((request, response, next) => {
  let error = new Error();
  error.status = 404;
  error.message = "not found";
  next(error);
});

app.use((error, request, response, next) => {
  return response.status(error.status || 500).json({
    status: error.status || 500,
    message: error.message || "Unexpected error",
  });
});

// definir escucha de la api

app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}`);
});
