import { Request, Response } from "express";
import mongoose from "mongoose";
import { BoardEditList, BoardInfo } from "opm-models";

const boardModel = new mongoose.Schema<BoardInfo>({
  aId: "String",
  uId: "String",
  eId: "String",
  aTitle: "String",
  aDescription: "String",
  aContent: "String",
  aCategory: "String",
  aCreateDate: "String",
  aEditDate: "String",
  aHit: "String",
  aEditList: [],
  aStatus: "String",
});
boardModel.set("collection", "Board");
const Board = mongoose.model("Board", boardModel);

const showAllArticle = async (_: Request, res: Response) => {
  const allBoard = await Board.find();
  return res.send({ data: allBoard, message: "전체 Article 조회" });
};

const writeArticle = async (req: Request, res: Response) => {
  const uId = req.body.uId;
  const aTitle = req.body.aTitle;
  const aDescription = req.body.aDescription;
  const aContent = req.body.aContent;
  const aCategory = req.body.aCategory;
  const aCreateDate = req.body.aCreateDate;

  // 새 aId 처리는 어떻게 하는지...? await은 왜 ...뜨는건지
  const newArticle = new Board<BoardInfo>({
    aId: "",
    uId,
    eId: "",
    aTitle,
    aDescription,
    aContent,
    aCategory,
    aCreateDate,
    aEditDate: "",
    aHit: "0",
    aEditList: [],
    aStatus: "LOADING",
  });

  newArticle.save(function (error, data) {
    if (error) {
      console.log(error);
    } else {
      console.log(data, "new Article saved");
    }
  });
  return res.send({ data: newArticle, message: "Article이 저장됨" });
};

const editArticle = async (req: Request, res: Response) => {
  const foundArticle = await Board.findOne({ aId: req.body.aId });
  if (foundArticle) {
    if (
      foundArticle.aStatus === "LOADING" &&
      foundArticle.uId === req.body.uId
    ) {
      foundArticle.aTitle = req.body.aTitle;
      foundArticle.aDescription = req.body.aDescription;
      foundArticle.aContent = req.body.aContent;
      foundArticle.aCategory = req.body.aCategory;
      foundArticle.aEditDate = req.body.aEditDate;

      foundArticle.save(function (error, data) {
        if (error) {
          console.log(error);
        } else {
          console.log(data, "Article edited");
        }
      });
      return res.send({ data: foundArticle, message: "Article이 수정됨" });
    } else {
      return res.send({
        data: "",
        message: "Article이 LOADING 상태가 아니거나 uId가 다름",
      });
    }
  } else {
    return res.send({ data: "", message: "aId가 일치하는 Article이 없음" });
  }
};

const acceptArticle = async (req: Request, res: Response) => {
  const foundArticle = await Board.findOne({ aId: req.body.aId });
  if (foundArticle) {
    if (foundArticle.aStatus === "LOADING") {
      foundArticle.eId = req.body.eId;
      foundArticle.aStatus = "EDITING";

      foundArticle.save(function (error, data) {
        if (error) {
          console.log(error);
        } else {
          console.log(data, "Article proofread accepted");
        }
      });
      return res.send({
        data: foundArticle,
        message: "EDITING으로 상태가 변경됨",
      });
    } else {
      return res.send({ data: "", message: "Article이 LOADING 상태가 아님" });
    }
  } else {
    return res.send({ data: "", message: "aId가 일치하는 Article이 없음" });
  }
};

const cancleArticle = async (req: Request, res: Response) => {
  const foundArticle = await Board.findOne({ aId: req.body.aId });
  if (foundArticle) {
    if (
      foundArticle.aStatus === "EDITING" &&
      foundArticle.eId === req.body.eId
    ) {
      foundArticle.eId = "";
      foundArticle.aStatus = "LOADING";

      foundArticle.save(function (error, data) {
        if (error) {
          console.log(error);
        } else {
          console.log(data, "Article proofread cancled");
        }
      });
      return res.send({
        data: foundArticle,
        message: "LOADING으로 상태가 변경됨",
      });
    } else {
      return res.send({
        data: "",
        message: "Article이 EDITING 상태가 아니거나 eId가 다름",
      });
    }
  } else {
    return res.send({ data: "", message: "aId가 일치하는 Article이 없음" });
  }
};

const proofreadArticle = async (req: Request, res: Response) => {
  const foundArticle = await Board.findOne({ aId: req.body.aId });
  if (foundArticle) {
    if (
      foundArticle.aStatus === "EDITING" &&
      foundArticle.eId === req.body.eId
    ) {
      // 시퀀스 처리 일련번호 어떻게 ,,? 배열 idx랑 같지 않나?
      const newBoardEditList: BoardEditList = {
        seq: "3",
        aProofread: req.body.aProofread,
        aProofreadDate: req.body.aProofreadDate,
      };
      foundArticle.aEditList.push(newBoardEditList);

      foundArticle.save(function (error, data) {
        if (error) {
          console.log(error);
        } else {
          console.log(data, "Article proofread done");
        }
      });
      return res.send({ data: foundArticle, message: "Article이 첨삭됨" });
    } else {
      return res.send({
        data: "",
        message: "Article이 EDITING 상태가 아니거나 eId가 다름",
      });
    }
  } else {
    return res.send({ data: "", message: "aId가 일치하는 Article이 없음" });
  }
};

const hitUpArticle = async (req: Request, res: Response) => {
  const foundArticle = await Board.findOne({ aId: req.body.aId });
  if (foundArticle) {
    const intHit = parseInt(foundArticle.aHit) + 1;
    foundArticle.aHit = intHit.toString();

    foundArticle.save(function (error, data) {
      if (error) {
        console.log(error);
      } else {
        console.log(data, "Article Hit updated");
      }
    });
    return res.send({ data: foundArticle, message: "Article Hit 올림" });
  } else {
    return res.send({ data: "", message: "aId가 일치하는 Article이 없음" });
  }
};

const board = {
  showAllArticle,
  writeArticle,
  editArticle,
  acceptArticle,
  cancleArticle,
  proofreadArticle,
  hitUpArticle,
};

export default board;
