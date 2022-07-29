import { Router } from "express";

import user from "./user";
import board from "./board";
import chat from "./chat";

const router = Router();

router.get("/user/all", user.showAllUser);
router.get("/article/all", board.showAllBoard);
router.get("/chat/all", chat.showAllChat);

export default router;
