/**
 * @name CalendarBridge
 * @description
 * Dore Calendar Bridge
 *
 * @example
 *
 * DoreClient.calendarAuthorizationStatus().then(() -> {})
 * DoreClient.requestCalendarAuthorize().then(() -> {})
 * DoreClient.findCalendarById.then(() -> {})
 * DoreClient.fetchAllCalendar.then(() -> {})
 * DoreClient.saveCalendar.then(() -> {})
 * DoreClient.removeCalendar.then(() -> {})
 * DoreClient.findCalendars.then(() -> {})
 *
 */

let CalendarBridge = (payload, webView, Calendar) => {
  switch (payload.type) {
    case 'AUTHORIZATION_STATUS':
      Calendar.authorizationStatus()
        .then(status => {
          webView.postMessage(JSON.stringify(status));
        })
        .catch(error => {
          console.log(error);
          webView.postMessage(JSON.stringify(error));
        });
      break;
    case 'REQUEST_AUTHORIZE':
      Calendar.authorizeEventStore()
        .then(status => {
          webView.postMessage(JSON.stringify(status));
        })
        .catch(error => {
          console.log(error);
          webView.postMessage(JSON.stringify(error));
        });
      break;
    case 'FIND_CALENDAR_BY_ID':
      Calendar.findCalendarById(payload.id)
        .then(status => {
          webView.postMessage(JSON.stringify(status));
        })
        .catch(error => {
          console.log(error);
          webView.postMessage(JSON.stringify(error));
        });
      break;
    case 'FETCH_ALL_CALENDAR':
      Calendar.fetchAllEvents(payload.startDate, payload.endDate, payload.calendars)
        .then(status => {
          webView.postMessage(JSON.stringify(status));
        })
        .catch(error => {
          console.log(error);
          webView.postMessage(JSON.stringify(error));
        });
      break;
    case 'SAVE_EVENT':
      Calendar.saveEvent(payload.title, payload.settings)
        .then(status => {
          webView.postMessage(JSON.stringify(status));
        })
        .catch(error => {
          console.log(error);
          webView.postMessage(JSON.stringify(error));
        });
      break;
    case 'REMOVE_EVENT_BY_ID':
      Calendar.removeEvent(payload.id)
        .then(status => {
          webView.postMessage(JSON.stringify(status));
        })
        .catch(error => {
          console.log(error);
          webView.postMessage(JSON.stringify(error));
        });
      break;
    case 'FIND_CALENDARS':
      Calendar.findCalendars()
        .then(status => {
          webView.postMessage(JSON.stringify(status));
        })
        .catch(error => {
          console.log(error);
          webView.postMessage(JSON.stringify(error));
        });
      break;
    default:
      console.log("Error, cannot find type:" + payload.type)
  }
};

export default CalendarBridge
