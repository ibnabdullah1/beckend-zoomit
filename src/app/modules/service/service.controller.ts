import { StatusCodes } from "http-status-codes";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createService = catchAsync(async (req, res) => {
  const service = req.body;

  // Convert Buffer-style objects to plain JavaScript objects
  const filesMap: Record<string, Express.Multer.File[]> = {};
  (req.files as Express.Multer.File[]).forEach((file) => {
    if (!filesMap[file.fieldname]) {
      filesMap[file.fieldname] = [];
    }
    filesMap[file.fieldname].push(file);
  });

  // Example: attach banner image
  if (filesMap["banner[image]"]) {
    service.banner = {
      ...service.banner,
      image: `${config.server_url}/uploads/${filesMap["banner[image]"][0].filename}`,
    };
  }

  // Example: featureBanner image
  if (filesMap["featureBanner[image]"]) {
    service.featureBanner = {
      ...service.featureBanner,
      image: `${config.server_url}/uploads/${filesMap["featureBanner[image]"][0].filename}`,
    };
  }

  // Example: assign feature option images
  const features = service?.features?.options || [];
  for (let i = 0; i < features.length; i++) {
    const key = `features[options][${i}][image]`;
    if (filesMap[key]) {
      features[
        i
      ].image = `${config.server_url}/uploads/${filesMap[key][0].filename}`;
    }
  }

  // Repeat this logic for:
  // - `faqs[image]`
  // - `benefits[options][i][image]`
  // - any other image fields you use

  console.log(service);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Service page created successfully",
    data: service,
  });
});

export const ServiceControllers = {
  createService,
};
