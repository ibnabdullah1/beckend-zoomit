import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { BlogRoutes } from "../modules/blog/blog.routes";
import { MediaRoutes } from "../modules/media/media.routes";
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
    path: "/blogs",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
