import { Router } from "express";
import { ActionLogRoutes } from "../modules/actionLog/actionLog.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { BlogRoutes } from "../modules/blog/blog.routes";
import { MediaRoutes } from "../modules/media/media.routes";
import { ProjectRoutes } from "../modules/project/project.routes";
import { ReviewRoutes } from "../modules/review/review.routes";
import { ServiceRoutes } from "../modules/service/service.routes";
import { UserRoutes } from "../modules/user/user.routes";
const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/service",
    route: ServiceRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/media",
    route: MediaRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
  {
    path: "/action-logs",
    route: ActionLogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
