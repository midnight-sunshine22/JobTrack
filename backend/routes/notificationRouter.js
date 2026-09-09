import express from "express";
import authUser from "../middlewares/authUser.js";

import {
    createNotification,
    completeNotification,
    deleteNotification,
    getNotifications
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.post("/", authUser, createNotification);

notificationRouter.patch("/:id", authUser, completeNotification);

notificationRouter.delete("/:id", authUser, deleteNotification);

notificationRouter.get("/",authUser,getNotifications)

export default notificationRouter;