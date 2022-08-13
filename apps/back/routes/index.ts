import { Router } from "express";

import user from "./user";
import board from "./board";
import room from "./room";

const router = Router();

router.post("/user/all", user.showAllUser);
router.post("/user/signup", user.signUpUser);
router.post("/user/login", user.signIn);

router.get("/board/articleList", board.showArticleList);
router.post("/user/myArticleList", board.showArticleListByUser);
router.post("/user/myEditingList", board.showEditingListByUser);

router.post("/board/writeArticle", board.writeArticle);
router.post("/board/editArticle", board.editArticle);
router.post("/board/acceptArticle", board.acceptArticle);
router.post("/board/cancelArticle", board.cancelArticle);
router.post("/board/proofreadArticle", board.proofreadArticle);
router.post("/board/hitUpArticle", board.hitUpArticle);

router.get("/room/all", room.showAllRoom);

export default router;
