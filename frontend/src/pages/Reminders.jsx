import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

const Reminders = () => {
    const {backendUrl,token} = useContext(AppContext)
    const {id} = useParams()

    const [reminders, setReminders] = useState([]);
      const [showReminderForm, setShowReminderForm] = useState(false);
      const [reminderDate, setReminderDate] = useState("");
      const [reminderNote, setReminderNote] = useState("");
    
      const getReminders = async () => {
        try {
          const { data } = await axios.get(backendUrl + `/reminders/${id}`, {
            headers: { token },
          });
    
          if (data.success) {
            setReminders(data.reminders);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

       const addReminder = async () => {
          try {
            if (!reminderDate || !reminderNote) {
              toast.error("Please enter date and note");
              return;
            }
      
            const { data } = await axios.post(
              backendUrl + `/reminders/${id}`,
              {
                date: reminderDate,
                note: reminderNote,
              },
              {
                headers: { token },
              },
            );
      
            if (data.success) {
              toast.success("Reminder added");
      
              setReminders((prev) => [...prev, data.reminder]);
      
              setReminderDate("");
              setReminderNote("");
              setShowReminderForm(false);
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }
        };
      
        const deleteReminder = async (reminderId) => {
          try {
            const { data } = await axios.delete(
              backendUrl + `/reminders/${reminderId}`,
              { headers: { token } },
            );
      
            if (data.success) {
              toast.success("Reminder deleted");
      
              setReminders((prev) => prev.filter((item) => item._id !== reminderId));
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }
        };
      
        const completeReminder = async (reminder) => {
          try {
            const { data } = await axios.put(
              backendUrl + `/reminders/${reminder._id}`,
              {
                date: reminder.date,
                note: reminder.note,
                completed: !reminder.completed,
              },
              { headers: { token } },
            );
      
            if (data.success) {
              setReminders((prev) =>
                prev.map((item) =>
                  item._id === reminder._id ? data.reminder : item,
                ),
              );
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }
        };
      
    useEffect(()=> {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getReminders()
    },[token])
  return (
    <div className="mt-10 border-t pt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Reminders</h2>

              <button
                onClick={() => setShowReminderForm(!showReminderForm)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {showReminderForm ? "Cancel" : "+ Add Reminder"}
              </button>
            </div>

            {showReminderForm && (
              <div className="bg-gray-50 border rounded-lg p-5 mb-8">
                <div>
                  <label className="text-sm text-gray-600">
                    Follow-up Date
                  </label>

                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-600">Note</label>

                  <textarea
                    value={reminderNote}
                    onChange={(e) => setReminderNote(e.target.value)}
                    placeholder="What do you need to follow up on?"
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                    rows="3"
                  />
                </div>

                <button
                  onClick={addReminder}
                  className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Save Reminder
                </button>
              </div>
            )}

            {reminders.length === 0 ? (
              <p className="text-gray-500">No reminders set.</p>
            ) : (
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div
                    key={reminder._id}
                    className={`border rounded-lg p-4 flex justify-between items-center ${
                      reminder.completed ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <div>
                      <p
                        className={`font-semibold ${
                          reminder.completed
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {reminder.note}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(reminder.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => completeReminder(reminder)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        {reminder.completed ? "Undo" : "Complete"}
                      </button>

                      <button
                        onClick={() => deleteReminder(reminder._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
  )
}

export default Reminders