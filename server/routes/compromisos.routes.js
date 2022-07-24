import { Router } from "express";
import { createCompromisos, deleteCompromisos, getCompromisos, updateCompromisos } from "../controllers/compromisos.controllers.js";

const router = Router();

router.get("/compromisos", getCompromisos);
router.post("/compromisos", createCompromisos);
router.put("/compromisos/:id", updateCompromisos);
router.delete("/compromisos/:id", deleteCompromisos);

export default router;
