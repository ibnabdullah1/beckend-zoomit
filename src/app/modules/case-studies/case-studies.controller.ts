import { Request, Response } from 'express';
import { caseStudiesService } from './case-studies.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

export const caseStudiesController = {
  async getCaseStudyBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const caseStudy = await caseStudiesService.getCaseStudyBySlug(slug);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "case studies get successfully",
      data: caseStudy
    });
  },
};
