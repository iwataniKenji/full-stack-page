import express from "express";
import { login } from "../controllers/authController";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/login",
  [
    // sanitização e validação de parâmetros
    check("email").isEmail().normalizeEmail().notEmpty(),
    check("password").escape().notEmpty(),
  ],
  login,
);

export default router;
