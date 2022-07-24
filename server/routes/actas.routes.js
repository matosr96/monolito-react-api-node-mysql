import { Router } from "express";
import { createActas, deleteActas, getActas, updateActas } from "../controllers/actas.controllers.js";

const router = Router();

router.get("/actas", getActas);
router.post("/actas", createActas);
router.put("/actas/:id", updateActas);
router.delete("/actas/:id", deleteActas);

export default router;
