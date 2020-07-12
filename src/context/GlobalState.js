import React, { useReducer, useEffect } from 'react';
import driverReducer from '../context/reducers/driverReducer';
import axios from 'axios';

export const CarpoolContext = React.createContext();

// Only includes state that is read at multiple levels of the app
const GlobalState = ({ children }) => {
  const [driverList, updateDriverList] = useReducer(driverReducer, {
    passengerRows: {},
    // We include this placeholder object so the passengerList can parse through it without returning any errors
    driverColumns: {
      unassignedPassengers: {
        id: null,
        isPassengerPool: true,
        name: null,
        passengerIds: [],
      },
    },
    columnOrder: [],
  });

  useEffect(() => {
    async function retrieveData() {
      const event = await axios.get(
        `https://${process.env.REACT_APP_HOST}/api/events/${process.env.REACT_APP_EVENT_ID}`
      );
      updateDriverList({
        type: 'INIT',
        drivers: event.data.drivers,
      });
    }
    retrieveData();
  }, []);

  return (
    <CarpoolContext.Provider
      value={{
        driverList,
        updateDriverList,
      }}
    >
      {children}
    </CarpoolContext.Provider>
  );
};

export default GlobalState;
