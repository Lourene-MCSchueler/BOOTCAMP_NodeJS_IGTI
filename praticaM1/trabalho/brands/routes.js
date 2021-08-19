import express from "express";
import BrandController from "./controller.js"

const router = express.Router();

router.get("/maisModelos", BrandController.maisModelos);
router.get("/menosModelos", BrandController.menosModelos);
router.get("/listaMaisModelos/:qtd", BrandController.listaMaisModelos);
router.get("/listaMenosModelos/:qtd", BrandController.listaMenosModelos);
router.post("/listaModelos", BrandController.listaModelos);

export default router;