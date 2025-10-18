import { Router } from 'express';
import { caseStudiesController } from './case-studies.controller';

const caseStudiesRoutes = Router();

// Define routes
caseStudiesRoutes.get('/:slug', caseStudiesController.getCaseStudyBySlug);

export default caseStudiesRoutes;
