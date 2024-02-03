import Express from "express";
import { creatData, updateData } from "../controller/Controller.js";
const router = Express.Router();

router.route("/create").post(creatData);
router.route("/update/:id").patch(updateData);

export default router;
