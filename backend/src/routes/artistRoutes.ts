import express from "express";
import { createArtist, getArtists } from "../controllers/artistController";
import { check } from "express-validator";

const router = express.Router();

router.get(
  "/",
  [
    // sanitização e validação de parâmetros
    check("listFilter").optional(),
  ],
  getArtists,
);
router.post(
  "/",
  [
    // sanitização e validação de parâmetros
    check("name").escape().notEmpty(),
    check("genre").escape().notEmpty(),
  ],
  createArtist,
);

export default router;
