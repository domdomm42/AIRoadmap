import { Router } from "express";
import { createResource } from "../controller/resourceController";

const router = Router();

router.post("/", createResource);

export default router;
