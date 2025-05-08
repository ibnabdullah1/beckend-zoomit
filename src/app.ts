import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import os from "os";
import path from "path";
import seedAdmin from "./app/DB/seed";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
import { UploadRoutes } from "./app/routes/upload.route";

const app: Application = express();

// Middleware setup
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for image access
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("", UploadRoutes);
app.use("/api/v1", router);

seedAdmin();

// Test route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Welcome to the ZOOM IT",
    version: "1.0.1",
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60
      )} minutes`,
    },
    developerContact: {
      email: "info@thezoomit.com",
      website: "https://thezoomit.com",
    },
  });
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app; // Export the app for use in server.ts
