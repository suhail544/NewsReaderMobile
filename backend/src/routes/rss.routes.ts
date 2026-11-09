import { Router } from "express";
import { importRss } from "../controllers/rss.controller";

const router = Router();

router.post("/import/:sourceId", importRss);

export default router;