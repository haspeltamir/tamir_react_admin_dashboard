import { useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);

    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;// the calendar slot that was clicked
        calendarApi.unselect();// clear date selection

        // add event if title is not null
        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
            // console.log(selected);
        }
    };

    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    return (
        <Box m="20px">
            <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

            <Box display="flex" justifyContent="space-between">
                {/* CALENDAR SIDEBAR */}
                <Box
                    flex="1 1 20%"// flex-grow, flex-shrink, flex-basis(width)
                    backgroundColor={colors.primary[400]}
                    p="15px"
                    borderRadius="16px"
                >
                    <Typography variant="h5">Events</Typography>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    backgroundColor: colors.greenAccent[500],
                                    margin: "10px 0",
                                    borderRadius: "2px",
                                }}
                            >
                                <ListItemText
                                    primary={event.title}
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* CALENDAR */}
                <Box flex="1 1 100%" ml="15px">
                    <FullCalendar
                        height="75vh"
                        // plugins are what we see on the top right of the calendar that allows us to change the view
                        plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                        ]}
                        //sets up what the toolbar looks like
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",//title of the calendar is automatically set to the current month and year
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="dayGridMonth"//sets the initial view of the calendar plugin(the first view that we see when we load the page)
                        editable={true}//allows us to edit the calendar
                        selectable={true}//allows us to select a date
                        selectMirror={true}//when we click and drag to select a date, it will highlight the date
                        dayMaxEvents={true}//when there are too many events in a day, it will show a +x more
                        select={handleDateClick}//when we select a date, it will call the handleDateClick function
                        eventClick={handleEventClick}
                        eventsSet={(events) => setCurrentEvents(events)}
                        initialEvents={[
                            {
                                id: "12315",
                                title: "All-day event",
                                date: "2022-09-14",
                            },
                            {
                                id: "5123",
                                title: "Timed event",
                                date: "2022-09-28",
                            },
                        ]}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Calendar;
