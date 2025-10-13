import { Request, Response } from 'express';
import { techStacksService } from './tech-stacks.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

export const techStacksController = {
  async getAllTechStacks(req: Request, res: Response) {
    const result = await techStacksService.getAllTechStacks(req.query);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Tech stacks retrieved successfully",
      data: result,
    });
  },

  async createTechStack(req: Request, res: Response) {
    const result = await techStacksService.createTechStack(req.body);
    sendResponse(res, {
      statusCode: result.success ? StatusCodes.CREATED : StatusCodes.CONFLICT,
      success: result.success ? true : false,
      message: result.message,
      data: { data: [{ ...result.data }] },
    });
  },

  async updateTechStack(req: Request, res: Response) {
    const { id } = req.params;
    const result = await techStacksService.updateTechStack(id, req.body);
    sendResponse(res, {
      statusCode: result.success ? StatusCodes.OK : StatusCodes.CONFLICT,
      success: result.success,
      message: result.message,
      data: {
        data: [{ ...result.data }]
      }
    });
  },

  async deleteTechStack(req: Request, res: Response) {
    const { id } = req.params;
    await techStacksService.deleteTechStack(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Tech stack deleted successfully",
    });
  },
};
