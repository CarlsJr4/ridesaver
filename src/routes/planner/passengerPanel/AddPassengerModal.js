import React, { useContext, useRef } from 'react';
import Modal from '../../../reusable_components/Modal';
import useFormData from '../../../custom_hooks/useFormData';
import { CarpoolContext } from '../../../context/GlobalState';
import axios from 'axios';

export default function AddPassengerModal({ isVisible, handleVisibility }) {
  const { formData, setFormData, handleInputChange } = useFormData();
  const { updateDriverList, driverList } = useContext(CarpoolContext);

  // I use refs to improve the UX of this form by selectively resetting certain fields
  const nameRef = useRef(null);
  const nicknameRef = useRef(null);
  let response;

  async function handleAdd(e) {
    e.preventDefault();
    const driverId = formData.driverId;
    const driver = driverList.driverColumns[driverId];
    // I include this block to preserve part of the state if the car isn't full, for better UX
    if (driver && driver.passengerIds.length === driver.seats) {
      setFormData({});
    } else {
      setFormData({
        driverId: formData.driverId,
      });
    }
    nameRef.current.focus();
    nameRef.current.value = '';
    nicknameRef.current.value = '';

    if (driverId) {
      // TODO: Endpoint 1
    } else {
      response = await axios.post(
        'http://localhost:3000/api/events/5ef538186635ff06cc86258b/newpassenger',
        {
          name: formData.passengerName,
          nickname: formData.passengerNickname,
        }
      );
    }

    return updateDriverList({
      type: 'ADD_PASSENGER',
      name: formData.passengerName,
      nickname: formData.passengerNickname,
      driverId: formData.driverId,
      passengerId: response.data._id,
    });
  }

  // The dropdown for directly assigning to a driver card
  const driverOptions = driverList.columnOrder.map(id => {
    const driver = driverList.driverColumns[id];
    const seatsTaken = driver.passengerIds.length;
    const totalSeats = driver.seats;

    // To only show drivers with free seats
    if (seatsTaken < totalSeats) {
      return (
        <option value={driver.id} key={driver.id}>
          {driver.name} ({driver.passengerIds.length}/{driver.seats})
        </option>
      );
    }
    return;
  });

  return (
    <Modal isVisible={isVisible} handleVisibility={handleVisibility}>
      <h1>Add riders</h1>
      <form onSubmit={e => handleAdd(e)}>
        <label htmlFor="passengerName">Name:</label>
        <input
          type="text"
          name="passengerName"
          id="passengerName"
          value={formData.name}
          onChange={handleInputChange}
          maxLength="20"
          ref={nameRef}
          required
        />
        <label htmlFor="passengerNickname">Nickname (optional):</label>
        <input
          type="text"
          name="passengerNickname"
          id="passengerNickname"
          value={formData.nickname}
          onChange={handleInputChange}
          ref={nicknameRef}
          maxLength="20"
        />
        <label htmlFor="driverId">Directly assign to car (optional):</label>
        <select name="driverId" id="driverId" onChange={handleInputChange}>
          <option value="">none</option>
          {driverOptions}
        </select>
        <button type="submit">Add</button>
      </form>
    </Modal>
  );
}
