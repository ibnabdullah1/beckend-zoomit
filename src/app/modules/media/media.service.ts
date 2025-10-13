import fs from "fs";
import { imageSize } from "image-size";
import mime from "mime-types";
import path from "path";
const uploadsPath = path.join(__dirname, "../../../../uploads/");

const formatFileSize = (bytes: number): string => {
  const units = ["Bytes", "KB", "MB", "GB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(1)} ${units[i]}`;
};

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
export const listImages = async (query: Record<string, unknown>) => {
  const { page = 1, limit = 10, search } = query;

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const searchTerm =
    typeof search === "string" ? search.trim().toLowerCase() : "";

  const files = await fs.promises.readdir(uploadsPath);

  const imageFiles = files.filter((file) =>
    /\.(png|jpe?g|gif|webp)$/i.test(file)
  );

  const imageData = await Promise.all(
    imageFiles.map(async (file) => {
      const filePath = path.join(uploadsPath, file);
      const stats = await fs.promises.stat(filePath);
      const mimeType = mime.lookup(file) || "application/octet-stream";
      const buffer = fs.readFileSync(filePath);
      const dimensions = imageSize(buffer);

      return {
        name: file,
        size: formatFileSize(stats.size),
        type: mimeType,
        extension: path.extname(file),
        date: formatDate(stats.mtime),
        createdAt: stats.mtime.toISOString(),
        dimensions: { ...dimensions, unit: "pixels" },
        url: `/${file}`,
        isPublic: true,
      };
    })
  );

  // ✅ Filter by search term
  const filteredData = searchTerm
    ? imageData.filter((img) => img.name.toLowerCase().includes(searchTerm))
    : imageData;

  // ✅ Sort by createdAt (latest first)
  const sortedData = filteredData.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // ✅ Pagination with auto page adjustment
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / limitNum) || 1;
  const validPage = Math.min(pageNum, totalPages);
  const startIndex = (validPage - 1) * limitNum;
  const endIndex = startIndex + limitNum;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return {
    meta: {
      total: totalItems,
      totalPages,
      page: validPage,
      limit: limitNum,
    },
    data: paginatedData,
  };
};

const deleteImage = (fileName: string) => {
  const filePath = path.join(uploadsPath, fileName);
  if (!fs.existsSync(filePath)) throw new Error("File does not exist");
  fs.unlinkSync(filePath);
};

const uploadImage = (file: any, customName: string) => {
  const originalFilename = file.filename;
  let finalFilename = originalFilename;

  if (customName) {
    const ext = path.extname(originalFilename);
    let baseName = customName.replace(/\.[^/.]+$/, "");
    let safeName = `${baseName}${ext}`;
    let counter = 1;

    let newPath = path.join(uploadsPath, safeName);
    const oldPath = path.join(uploadsPath, originalFilename);

    while (fs.existsSync(newPath)) {
      safeName = `${baseName}-${counter}${ext}`;
      newPath = path.join(uploadsPath, safeName);
      counter++;
    }

    fs.renameSync(oldPath, newPath);
    finalFilename = safeName;
  }

  return {
    filename: finalFilename,
    path: `/${finalFilename}`,
    customName: customName || finalFilename,
  };
};

const renameImage = (oldName: string, newName: string) => {
  const oldPath = path.join(uploadsPath, oldName);
  const newPath = path.join(uploadsPath, newName);

  if (!fs.existsSync(oldPath)) throw new Error("Original file not found");
  if (fs.existsSync(newPath))
    throw new Error("A file with the new name already exists");

  fs.renameSync(oldPath, newPath);
};

export const MediaServices = {
  listImages,
  deleteImage,
  uploadImage,
  renameImage,
};
