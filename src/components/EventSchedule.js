import React, { useState, useEffect } from 'react';
import EventService from '../services/EventService';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import AddEventForm from './AddEventForm';
import EditEventForm from './EditEventForm';
import {Button} from 'antd';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await EventService.getEventsCurrentWeek();
      console.log('API response: ', result);
      setScheduleData(result);
    }
    fetchData();
  }, []);


  // Create a new array to store events for each day of the week
  const dayWiseEvents = Array.from({ length: 7 }, () => []);

  // Loop through each day's events and place them in the correct array of the day of the week
  scheduleData.forEach((day) => {
    day.forEach((event) => {
      const dayOfWeek = new Date(event.eventDate).getDay();
      dayWiseEvents[dayOfWeek].push(event);
    });
  });

  // Function to handle delete event button click
  const handleDeleteEvent = async (eventId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (confirmDelete) {
      console.log(`Deleting event with id ${eventId}`);
      try {
        await EventService.deleteEvent(eventId);
        // Remove the event from the state
        const result = await EventService.getEventsCurrentWeek();
        setScheduleData(result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="schedule-container">
      <AddEventForm className="add-event-button"/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {dayWiseEvents.map((day, columnIndex) => (
              <td key={columnIndex}>
                {day.map((event, index) => (
                  <Dropdown key={index}>
                    <Dropdown.Toggle variant="dark">
                      {event.title}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.ItemText><u>Description</u>: {event.eventDescription}</Dropdown.ItemText>
                      <Dropdown.ItemText><u>Location</u>: {event.location}</Dropdown.ItemText>
                      <Dropdown.ItemText><u>Date</u>: {event.eventDate}</Dropdown.ItemText>
                      <Dropdown.ItemText><u>Start Time</u>: {event.startTime}</Dropdown.ItemText>
                      <Dropdown.ItemText><u>End Time</u>: {event.endTime}</Dropdown.ItemText>
                      <Dropdown.Divider />
                      <Dropdown.ItemText>
                      <Button onClick={() => handleDeleteEvent(event.id)}>
                          Delete
                        </Button>
                        <EditEventForm event={event}/>
                      </Dropdown.ItemText>
                    </Dropdown.Menu>
                  </Dropdown>
                ))}
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Schedule;
