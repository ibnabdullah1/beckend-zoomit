import { StatusCodes } from "http-status-codes";
import { ITechStack } from "./tech-stacks.interface";
import techStacksModel from "./tech-stacks.model";
import QueryBuilder from "../../builder/QueryBuilder";

export const techStacksService = {

  async getAllTechStacks(query: Record<string, unknown>) {
    try {
      const qb = new QueryBuilder(techStacksModel.find(), query)
        .search(["name", "description"])
        .filter()
        .sort()
        .paginate()
        .fields();

      const data = await qb.modelQuery; // final query execute
      const meta = await qb.countTotal(); // pagination meta

      return {
        meta,
        data,

      };
    } catch (err: any) {
      console.error("Error getting tech stacks:", err);
      return {
        data: null,
        meta: null,
      };
    }
  },


  async createTechStack(payload: ITechStack) {
    try {
      const existing = await techStacksModel.findOne({
        name: { $regex: `^${payload.name}$`, $options: "i" },
      });

      if (existing) {
        return { success: false, message: "Tech stack with this name already exists!", data: null };
      }

      const result = await techStacksModel.create(payload);

      return {
        success: true,
        message: "Tech stack created successfully",
        data: result.toObject() // clean JSON
      };
    } catch (err: any) {
      console.error("Error creating tech stack:", err);
      return { success: false, message: err.message || "Error creating tech stack", data: null };
    }
  }
  ,


  async updateTechStack(id: string, payload: ITechStack) {
    try {
      if (payload.name) {
        // Check if there is another tech stack with the same name
        const existing = await techStacksModel.findOne({
          name: { $regex: `^${payload.name}$`, $options: "i" },
          _id: { $ne: id }, // exclude current document
        });

        if (existing) {
          return { success: false, message: "Tech stack with this name already exists!" };
        }
      }

      const updatedStack = await techStacksModel.findByIdAndUpdate(id, payload, {
        new: true,
      });

      return {
        success: true,
        message: "Tech stack updated successfully",
        data: updatedStack, // return updated document
      };
    } catch (err: any) {
      console.error("Error updating tech stack:", err);
      return { success: false, message: err.message || "Error updating tech stack" };
    }
  },


  async deleteTechStack(id: string) {
    try {
      const isExistTechStack = await techStacksModel.findById(id);
      if (!isExistTechStack) {
        return { success: false, message: "Tech stack not found", data: null };
      }

      const result = await techStacksModel.findByIdAndDelete(id);
      return { success: true, message: "Tech stack deleted successfully", data: result };
    } catch (err: any) {
      console.error("Error deleting tech stack:", err);
      return { success: false, message: err.message || "Error deleting tech stack", data: null };
    }
  },
};
