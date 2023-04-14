import axios from 'axios';

const EVENT_URL='https://schedule-app-mandresy.onrender.com/events/weekly'

const EventService = {
    async getEventsCurrentWeek() {
        try {
            const response = await axios.get(EVENT_URL);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    },

    async addEvent(formData) {
        try {
            const response = await axios.post("https://schedule-app-mandresy.onrender.com/events",formData);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    },

    async editEvent(formData,id) {
        try {
            const response = await axios.put("https://schedule-app-mandresy.onrender.com/events/"+id,formData);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    },

    async deleteEvent(id) {
        try {
            const response = await axios.delete("https://schedule-app-mandresy.onrender.com/events/"+id);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
};

export default EventService;