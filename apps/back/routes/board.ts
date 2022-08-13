import { randomUUID } from "crypto";

import { Request, Response } from "express";
import mongoose from "mongoose";
import { BoardEditList, BoardInfo, StatusCode } from "opm-models";

const boardModel = new mongoose.Schema<BoardInfo>({
  aId: "",
  uId: "",
  eId: "",
  aTitle: "",
  aDescription: "",
  aContent: "",
  aCategory: "",
  aCreateDate: "",
  aEditDate: "",
  aHit: 0,
  aEditList: [],
  aStatus: "String",
});
boardModel.set("collection", "Board");
const Board = mongoose.model("Board", boardModel);

const showArticleList = async (req: Request, res: Response) => {
  const { aId } = req.query;
  if (aId) {
    const foundArticle = await Board.findOne({ aId: aId });
    if (!foundArticle) {
      return res.status(200).send({ code: StatusCode.BAD_REQUEST });
    }

    const lastMongoId = foundArticle._id;
    const BoardData = await Board.find({ _id: { $gt: lastMongoId } }).limit(20);
    return res.status(200).send({ data: BoardData });
  }

  const BoardData = await Board.find().limit(20);
  return res.status(200).send({ data: BoardData });
};

const showArticleListByUser = async (req: Request, res: Response) => {
  const { uId } = req.body;
  const foundArticleList = await Board.find({ uId });
  if (foundArticleList.length === 0) {
    return res.status(200).send({ code: StatusCode.NO_CONTENT });
  }
  return res.status(200).send({ data: foundArticleList });
};

const showEditingListByUser = async (req: Request, res: Response) => {
  const { eId } = req.body;
  const foundArticleList = await Board.find({ eId });
  if (foundArticleList.length === 0) {
    return res.status(200).send({ code: StatusCode.NO_CONTENT });
  }
  return res.status(200).send({ data: foundArticleList });
};

const writeArticle = async (req: Request, res: Response) => {
  const { uId, aTitle, aDescription, aContent, aCategory } = req.body;
  const createDate = Date();

  const newArticle = new Board<BoardInfo>({
    aId: randomUUID(),
    uId,
    eId: "",
    aTitle,
    aDescription,
    aContent,
    aCategory,
    aCreateDate: createDate,
    aEditDate: createDate,
    aHit: 0,
    aEditList: [],
    aStatus: "INIT",
  });

  newArticle.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data, "new Article saved");
    }
  });
  return res.status(200).send({ data: newArticle });
};

const editArticle = async (req: Request, res: Response) => {
  const { aId, uId, aTitle, aDescription, aContent, aCategory } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.aStatus !== "INIT" || foundArticle.uId !== uId) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  foundArticle.aTitle = aTitle;
  foundArticle.aDescription = aDescription;
  foundArticle.aContent = aContent;
  foundArticle.aCategory = aCategory;
  foundArticle.aEditDate = Date();

  foundArticle.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data, "Article edited");
    }
  });
  return res.status(200).send({ data: foundArticle });
};

const acceptArticle = async (req: Request, res: Response) => {
  const { aId, eId } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.aStatus === "INIT") {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  foundArticle.eId = eId;
  foundArticle.aStatus = "EDITING";

  foundArticle.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data, "Article proofread accepted");
    }
  });
  return res.status(200).send({ data: foundArticle });
};

const cancelArticle = async (req: Request, res: Response) => {
  const { aId, eId } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.aStatus === "EDITING" && foundArticle.eId === eId) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  foundArticle.eId = "";
  foundArticle.aStatus = "INIT";

  foundArticle.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data, "Article proofread canceled");
    }
  });
  return res.status(200).send({ data: foundArticle });
};

const proofreadArticle = async (req: Request, res: Response) => {
  const { aId, eId, aProofread, aProofreadDate } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  if (foundArticle.aStatus === "EDITING" && foundArticle.eId === eId) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  const editList = foundArticle.aEditList;
  const newBoardEditList: BoardEditList = {
    seq: editList[editList.length - 1].seq + 1,
    aProofread,
    aProofreadDate,
  };
  foundArticle.aEditList.push(newBoardEditList);

  foundArticle.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data, "Article proofread done");
    }
  });
  return res.status(200).send({ data: foundArticle });
};

const hitUpArticle = async (req: Request, res: Response) => {
  const { aId } = req.body;

  const foundArticle = await Board.findOne({ aId: aId });
  if (!foundArticle) {
    return res.status(200).send({ code: StatusCode.BAD_REQUEST });
  }

  foundArticle.aHit += 1;

  foundArticle.save((error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data, "Article Hit updated");
    }
  });
  return res.status(200).send({ data: foundArticle });
};

const board = {
  showArticleList,
  showArticleListByUser,
  showEditingListByUser,
  writeArticle,
  editArticle,
  acceptArticle,
  cancelArticle,
  proofreadArticle,
  hitUpArticle,
};

export default board;
