import { Router } from "express";
import * as controller from "../controller/appController.js";

// http request
const router = Router();

router.route("/user/signup").post(controller.signup);
router.route("/product/getBill").post(controller.getBill);

export default router;
