import { Router } from "express";
import { crearUsuario, LoginUsuario } from "../controllers/user.controllers.js";

const router = Router();
router.post("/registrar", crearUsuario);
router.post("/login", LoginUsuario)
export default router;
