import { Router } from "express";
import { getSources } from "../controllers/source.controller";

const router = Router();

router.get("/sources", getSources);

export default router;