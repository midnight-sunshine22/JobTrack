import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const JobDetails = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [events, setEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventType, setEventType] = useState("Applied");
  const [eventDate, setEventDate] = useState("");
  const [eventNote, setEventNote] = useState("");

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

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/events/${id}`, {
        headers: { token },
      });
      if (data.success) {
        setEvents(data.event);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getJob = async () => {
    try {
      const { data } = await axios.get(backendUrl + `/job/single/${id}`, {
        headers: { token },
      });
      console.log("JOB DETAILS RESPONSE:", data);
      if (data.success) {
        setJob(data.job);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addEvent = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + `/events/${id}`,
        {
          type: eventType,
          date: eventDate,
          note: eventNote,
        },
        { headers: { token } },
      );

      if (data.success) {
        toast.success("Event added");
        setEvents((prev) => [...prev, data.event]);
        setEventType("Applied");
        setEventDate("");
        setEventNote("");
        setShowEventForm(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const { data } = await axios.delete(backendUrl + `/events/${eventId}`, {
        headers: { token },
      });

      if (data.success) {
        toast.success("Event deleted");

        setEvents((prev) => prev.filter((event) => event._id !== eventId));
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

  useEffect(() => {
    getJob();
    fetchEvents();
    getReminders();
  }, [token, id]);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-3xl mx-auto px-6 py-10">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {job.position}
              </h1>

              <p className="text-lg text-gray-600 mt-2">{job.company}</p>
            </div>

            <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium">
              {job.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Employment Type</p>

              <p className="font-semibold text-gray-800 mt-1">
                {job.employmentType}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Salary</p>

              <p className="font-semibold text-gray-800 mt-1">{job.salary}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Applied On</p>

              <p className="font-semibold text-gray-800 mt-1">
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Resume</p>

              {job.resume ? (
                <button
                  onClick={() => window.open(job.resume, "_blank")}
                  className="text-blue-600 hover:underline mt-1"
                >
                  View Resume
                </button>
              ) : (
                <p className="text-gray-500 mt-1">No resume uploaded</p>
              )}
            </div>
          </div>

          <div className="mt-10 border-t pt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Application Timeline
              </h2>

              <button
                onClick={() => setShowEventForm(!showEventForm)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                {showEventForm ? "Cancel" : "+ Add Event"}
              </button>
            </div>

            {showEventForm && (
              <div className="bg-gray-50 border rounded-lg p-5 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Event</label>

                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full mt-1 border rounded-lg px-3 py-2"
                    >
                      <option>Applied</option>
                      <option>HR Contacted</option>
                      <option>Assessment</option>
                      <option>Interview</option>
                      <option>Final Round</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Date</label>

                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full mt-1 border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-600">Note</label>

                  <textarea
                    value={eventNote}
                    onChange={(e) => setEventNote(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                    rows="3"
                  />
                </div>

                <button
                  onClick={addEvent}
                  className="mt-4 px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Add Event
                </button>
              </div>
            )}

            {events.length === 0 ? (
              <p className="text-gray-500">No timeline events yet.</p>
            ) : (
              <div className="space-y-5">
                {events.map((event) => (
                  <div
                    key={event._id}
                    className="flex gap-4 border-l-2 border-blue-400 pl-5"
                  >
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {event.type}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>

                        <button
                          onClick={() => deleteEvent(event._id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      </div>

                      {event.note && (
                        <p className="text-gray-600 mt-2">{event.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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

          <div className="flex gap-3 mt-10">
            <button
              onClick={() => navigate(`/edit-job/${job._id}`)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Edit Job
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetails;
