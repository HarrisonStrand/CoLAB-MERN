import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import { signin, signup, updateUserProfile } from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/profile", auth, updateUserProfile);

export default router;