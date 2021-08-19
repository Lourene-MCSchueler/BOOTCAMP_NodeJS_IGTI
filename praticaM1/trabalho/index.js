import express from "express";
import brandRouter from "./brands/routes.js"

const app = express();
app.use(express.json());

app.use("/marcas", brandRouter)

app.listen(3000, () => console.log("Funcionando"))