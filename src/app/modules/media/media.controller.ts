import { Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import path from "path";
import sendResponse from "../../utils/sendResponse";

// Define the path where images are stored
const uploadsPath = path.join(__dirname, "../../../../uploads/");

// List all images in the uploads folder
const listImages = (req: Request, res: Response): void => {
  fs.readdir(uploadsPath, (err, files) => {
    if (err) return res.status(500).json({ message: "Error reading files" });

    // Filter out files that are images (based on file extensions)
    const images = files.filter((file) =>
      /\.(png|jpe?g|gif|webp)$/i.test(file)
    );
    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Images listed successfully",
      data: images,
    });
  });
};

// Delete a specific image by name
const deleteImage = (req: Request, res: Response): void => {
  const fileName = req.params.name;
  const filePath = path.join(uploadsPath, fileName);

  // Delete the image file
  fs.unlink(filePath, (err) => {
    if (err) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "No file uploaded",
      });
    }

    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Image deleted successfully",
    });
  });
};

// Upload a new image
const uploadImage = (req: Request, res: Response): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!req.file) {
      return sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "No file uploaded",
      });
    }

    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Image uploaded successfully",
      data: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
      },
    });

    resolve(); // Resolve the promise once the response is sent
  });
};
// Export the controller
export const MediaController = {
  listImages,
  deleteImage,
  uploadImage,
};
