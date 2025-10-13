import { StatusCodes } from "http-status-codes";
import { ITechStack } from "./tech-stacks.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { TechStack } from "./tech-stacks.model";
import AppError from "../../errors/appError";

export const techStacksService = {

  async getAllTechStacks(query: Record<string, unknown>) {
    try {
      const qb = new QueryBuilder(TechStack.find(), query)
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
      throw err
    }
  },

  async createTechStack(payload: ITechStack) {
    try {
      const existing = await TechStack.findOne({
        name: { $regex: `^${payload.name}$`, $options: "i" },
      });

      if (existing) {
        throw new AppError(
          StatusCodes.CONFLICT,
          "Tech stack with this name already exists!"
        );
      }

      const result = await TechStack.create(payload);

      return {
        success: true,
        message: "Tech stack created successfully",
        data: result.toObject() // clean JSON
      };
    } catch (err: any) {
      throw err
    }
  },


  async updateTechStack(id: string, payload: ITechStack) {
    try {
      const currentStack = await TechStack.findById(id);
      if (!currentStack) {
        throw new AppError(
          StatusCodes.NO_CONTENT,
          "Tech stack not found"
        );
      }

      if (payload.name && payload.name !== currentStack.name) {
        const existing = await TechStack.findOne({
          name: { $regex: `^${payload.name}$`, $options: "i" },
          _id: { $ne: id }, // ID same na thakte hobe
        });

        if (existing) {
          throw new AppError(
            StatusCodes.CONFLICT,
            "A service with this slug already exists."
          );
        }
      }

      Object.assign(currentStack, payload);
      await currentStack.save();

      return {
        data: currentStack.toObject(),
      };
    } catch (err: any) {
      throw err;
    }
  },

  async deleteTechStack(id: string) {
    try {
      const isExistTechStack = await TechStack.findById(id);
      if (!isExistTechStack) {
        throw new AppError(
          StatusCodes.NOT_FOUND,
          "Tech stack not found."
        );

      }

      const result = await TechStack.findByIdAndDelete(id);
      return { data: result };
    } catch (err: any) {
      throw err
    }
  },
};
