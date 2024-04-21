import { Router } from "express";
import { cityListController } from "../controllers/cityListController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";
import { cityEventDetailsController } from "../features/cityEvents/controllers/cityEventDetailsController";
import { cityEventsController } from "../features/cityEvents/controllers/cityEventsController";
import { cityEventDetailsMiddelware } from "../features/cityEvents/middleware/cityEventDetailsMiddleware";
import { cityEventsMiddleware } from "../features/cityEvents/middleware/cityEventsMiddleware";

const router = Router();

router.get("/", homeController);
router.get("/weather", weatherController);
router.get("/cities", cityListController);

// City Events
router.get(
  "/city-event-details",
  cityEventDetailsMiddelware,
  cityEventDetailsController
);
router.get("/city-events", cityEventsMiddleware, cityEventsController);

export default router;
