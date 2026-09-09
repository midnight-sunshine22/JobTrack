import notificationModel from "../models/NotificationModel.js";

const createNotification = async (req, res) => {
    try {
        const { reminderId, message } = req.body;

        const notification = await notificationModel.create({
            userId: req.userId,
            reminderId,
            message
        });

        res.status(201).json({
            success: true,
            notification
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getNotifications =async(req,res)=> {
    try {
        const userId = req.userId
        const notifications = await notificationModel.find({userId})
        res.json({
            success:true,
            notifications
        })
        }
    catch(error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}

const completeNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await notificationModel.findOne({
            _id: id,
            userId: req.userId
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        notification.isRead = true;
        await notification.save();

        res.json({
            success: true,
            notification
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await notificationModel.findOneAndDelete({
            _id: id,
            userId: req.userId
        });

        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found"
            });
        }

        res.json({
            success: true,
            message: "Notification deleted"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export {
    createNotification,
    completeNotification,
    deleteNotification,
    getNotifications
};
