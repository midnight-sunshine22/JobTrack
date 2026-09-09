import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ApplicationEvent = () => {
    const {backendUrl, token } = useContext(AppContext)
    const [events, setEvents] = useState([]);
    const {id} = useParams()
      const [showEventForm, setShowEventForm] = useState(false);
      const [eventType, setEventType] = useState("Applied");
      const [eventDate, setEventDate] = useState("");
      const [eventNote, setEventNote] = useState("");

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

    useEffect(()=> {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchEvents()
    },[token])
  return (
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
  )
}

export default ApplicationEvent