import axios from 'axios';

const EVENT_URL='http://localhost:8080/events/weekly'

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
            const response = await axios.post("http://localhost:8080/events",formData);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    },

    async editEvent(formData,id) {
        try {
            const response = await axios.put("http://localhost:8080/events/"+id,formData);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    },

    async deleteEvent(id) {
        try {
            const response = await axios.delete("http://localhost:8080/events/"+id);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
};

export default EventService;