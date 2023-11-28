import express from "express";
import { getArtists } from "../controllers/artistController";

const router = express.Router();

router.get("/", getArtists);

export default router;
