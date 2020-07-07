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
        'http://localhost:3000/api/events/5ef538186635ff06cc86258b'
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
