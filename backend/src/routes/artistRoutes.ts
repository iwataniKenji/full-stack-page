import express from "express";
import { createArtist, getArtists } from "../controllers/artistController";

const router = express.Router();

router.get("/", getArtists);
router.post("/", createArtist);

export default router;
