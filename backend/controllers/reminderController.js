import reminderModel from "../models/ReminderModel.js"
import notificationModel from "../models/NotificationModel.js"

const createReminder = async (req, res) => {
    try {
        const userId = req.userId
        const { jobId } = req.params
        const { date, note } = req.body

        const reminder = new reminderModel({
            jobId,
            userId,
            date,
            note
        })

        await reminder.save()
        const notification = new notificationModel({userId,reminderId:reminder._id,message:note})

        await notification.save()

        res.json({
            success: true,
            message: "Reminder created successfully",
            reminder
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


const getReminders = async (req, res) => {
    try {
        const userId = req.userId
        const { jobId } = req.params

        const reminders = await reminderModel
            .find({ jobId, userId })
            .sort({ date: 1 })

        res.json({
            success: true,
            reminders
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


const updateReminder = async (req, res) => {
    try {
        const userId = req.userId
        const { reminderId } = req.params
        const { date, note, completed } = req.body

        const reminder = await reminderModel.findOneAndUpdate(
            {
                _id: reminderId,
                userId: userId
            },
            {
                date,
                note,
                completed
            },
            {
                new: true
            }
        )

        if (!reminder) {
            return res.json({
                success: false,
                message: "Reminder not found"
            })
        }

        res.json({
            success: true,
            message: "Reminder updated successfully",
            reminder
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const deleteReminder = async (req, res) => {
    try {
        const userId = req.userId
        const { reminderId } = req.params

        const reminder = await reminderModel.findOneAndDelete({
            _id: reminderId,
            userId: userId
        })

        if (!reminder) {
            return res.json({
                success: false,
                message: "Reminder not found"
            })
        }

        res.json({
            success: true,
            message: "Reminder deleted successfully"
        })

    } catch (error) {
        res.json({
            success: true,
            message: error.message
        })
    }
}


export {
    createReminder,
    getReminders,
    updateReminder,
    deleteReminder
}