import { Request, Response } from "express";
import fs from "fs";
import { StatusCodes } from "http-status-codes";
import mime from "mime-types";
import path from "path";
import sendResponse from "../../utils/sendResponse";
// Define the path where images are stored
const uploadsPath = path.join(__dirname, "../../../../uploads/");

// Format file size to something like "5.4 MB"
const formatFileSize = (bytes: number): string => {
  const units = ["Bytes", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(1)} ${units[i]}`;
};

// Format date like "2025, May 20 12:21PM"
const formatDate = (date: Date): string => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const listImages = (req: Request, res: Response): void => {
  fs.readdir(uploadsPath, async (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Error reading files" });
    }

    // Filter only image files
    const imageFiles = files.filter((file) =>
      /\.(png|jpe?g|gif|webp)$/i.test(file)
    );

    // Build the data array
    const imageData = await Promise.all(
      imageFiles.map(async (file) => {
        const filePath = path.join(uploadsPath, file);
        const stats = await fs.promises.stat(filePath);
        const mimeType = mime.lookup(file) || "application/octet-stream";

        return {
          name: file,
          size: formatFileSize(stats.size),
          type: mimeType,
          extension: path.extname(file),
          date: formatDate(stats.mtime),
          createdAt: stats.mtime.toISOString(),
          // url: `${process.env.SERVER_URL}/uploads/${file}`
          url: `/${file}`,
          isPublic: true,
        };
      })
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Images listed successfully",
      data: {
        data: imageData,
        meta: {
          total: imageData.length,
        },
      },
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

const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      sendResponse(res, {
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    const originalFilename = req.file.filename;
    const customName = req.body.customName;
    let finalFilename = originalFilename;

    if (customName) {
      const ext = path.extname(originalFilename);
      let baseName = customName.replace(/\.[^/.]+$/, ""); // Remove extension if present
      let safeName = `${baseName}${ext}`;
      let counter = 1;

      let newPath = path.join(uploadsPath, safeName);
      const oldPath = path.join(uploadsPath, originalFilename);

      // Avoid overwrite
      while (fs.existsSync(newPath)) {
        safeName = `${baseName}-${counter}${ext}`;
        newPath = path.join(uploadsPath, safeName);
        counter++;
      }

      fs.renameSync(oldPath, newPath);
      finalFilename = safeName;
    }

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Image uploaded successfully",
      data: {
        filename: finalFilename,
        path: `/uploads/${finalFilename}`,
        customName: customName || finalFilename,
      },
    });
  } catch (error) {
    console.error("Image upload error:", error);
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Something went wrong during image upload",
    });
  }
};
const renameImage = (req: Request, res: Response): void => {
  const { oldName, newName } = req.body;
  const oldPath = path.join(uploadsPath, oldName);
  const newPath = path.join(uploadsPath, newName);

  try {
    if (!fs.existsSync(oldPath)) {
      return sendResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
        message: "Original file not found",
      });
    }

    if (fs.existsSync(newPath)) {
      return sendResponse(res, {
        statusCode: StatusCodes.CONFLICT,
        success: false,
        message: `Rename failed: A file named "${newName}" already exists. Please choose a different name.`,
      });
    }

    fs.renameSync(oldPath, newPath);

    return sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "File renamed successfully",
      data: null,
    });
  } catch (err: any) {
    return sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error renaming file",
      data: null,
    });
  }
};

// Export the controller
export const MediaController = {
  listImages,
  deleteImage,
  uploadImage,
  renameImage,
};
