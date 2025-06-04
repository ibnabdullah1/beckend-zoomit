import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MediaServices } from "./media.service";

const listImages = catchAsync(async (req: Request, res: Response) => {
  const result = await MediaServices.listImages();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Images listed successfully",
    data: result,
  });
});

const deleteImage = catchAsync(async (req: Request, res: Response) => {
  const fileName = req.params.name;
  await MediaServices.deleteImage(fileName);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Image deleted successfully",
  });
});

const uploadImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) {
    return sendResponse(res, {
      statusCode: StatusCodes.BAD_REQUEST,
      success: false,
      message: "No file uploaded",
    });
  }

  const data = await MediaServices.uploadImage(req.file, req.body.customName);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Image uploaded successfully",
    data,
  });
});

const renameImage = catchAsync(async (req: Request, res: Response) => {
  const { oldName, newName } = req.body;

  await MediaServices.renameImage(oldName, newName);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "File renamed successfully",
  });
});

export const MediaControllers = {
  listImages,
  deleteImage,
  uploadImage,
  renameImage,
};
