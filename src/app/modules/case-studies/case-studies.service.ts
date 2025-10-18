import { StatusCodes } from "http-status-codes";
import { Project } from "../project/project.model";
import AppError from "../../errors/appError";

export const caseStudiesService = {
  async getCaseStudyBySlug(slug: string) {
    // Example service logic

    const project = await Project.find({ slug: slug })

    return project
  }
}