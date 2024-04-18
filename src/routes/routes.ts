import { Router } from "express";
import { checkController } from "../controllers/checkController";
import { cityListController } from "../controllers/cityListController";
import { homeController } from "../controllers/homeController";
import { weatherController } from "../controllers/weatherController";
import { cityEventDetailsController } from "../features/cityEvents/controllers/cityEventDetailsController";
import { cityEventsController } from "../features/cityEvents/controllers/cityEventsController";
import { cityEventsMiddelware } from "../features/cityEvents/middleware/cityEventsMiddleware";

const router = Router();

router.get("/", homeController);
router.get("/check", checkController);
router.get("/weather", weatherController);
router.get("/cities", cityListController);

// City Events
router.get("/city-event-details", cityEventDetailsController);
router.get("/city-events", cityEventsMiddelware, cityEventsController);

export default router;
