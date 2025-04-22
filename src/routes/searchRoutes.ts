import { Router } from "express";
import { searchItems } from "../controllers/searchController";

const router = Router();

router.get("/search", searchItems);

export default router;
