import { Router } from "express";
import { showAllBoard } from "./board";
import { showAllUser } from "./user";

const router = Router();

// 유저
router.get("/user/all", showAllUser); // 모든 회원정보 보기

// Article - 게시글 == 채팅방
router.get("/article/all", showAllBoard);

export default router;
