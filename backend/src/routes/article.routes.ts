import { Router } from "express";
import { getArticles } from "../controllers/article.controller";

const router =  Router();

router.get("/articles", getArticles);

export default router;