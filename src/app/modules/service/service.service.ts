import { IService } from "./service.interface";

const createService = async (payload: IService) => {
  console.log(payload);
  try {
    // const result = await Service.create(payload);
    // return result;
  } catch (err) {
    console.error("Error creating service:", err);
    throw err;
  }
};

export const ServiceServices = {
  createService,
};
