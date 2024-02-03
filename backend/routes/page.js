import Express from "express";
import {
  fetchData,
  fetchAllData,
  fetchALlDetails,
  fetchSingleData,
  autoComplete,
} from "../controller/Controller.js";

const router = Express.Router();

router.route("/").get(fetchData);
router.route("/search").post(autoComplete);
router.route("/:books").post(fetchAllData);
router.route("/details").get(fetchALlDetails);
router.route("/book/:id").get(fetchSingleData);

export default router;
