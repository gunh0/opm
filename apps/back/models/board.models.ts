import { model, Schema, Document } from "mongoose";
import { BoardInfo } from "opm-models";

/**
 * @swagger
 * components:
 * schemas:
 *   Board:
 *     properties:
 *      aId:
 *        type: string
 */
const boardSchema = new Schema<BoardInfo>();

const boardModel = model<BoardInfo & Document>('board', boardSchema);

export default boardModel;
