import express from "express";
import { signin, signup, updateUserById } from "../controllers/user.js";


const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.patch("/update/:id", updateUserById)
export default router;
