import React from 'react';
import Modal from '../../../../reusable_components/Modal';
import useFormData from '../../../../custom_hooks/useFormData';
import axios from 'axios';

const AddDriverModal = ({ isVisible, handleVisibility, handleAdd }) => {
  const { formData, setFormData, handleInputChange } = useFormData();

  async function handleSubmit(e) {
    let { driverName, driverNickname, driverSeats } = formData;
    e.preventDefault();
    e.target.reset();
    // TODO: Replace ID with template string
    const res = await axios.post(
      'http://localhost:3000/api/events/5ef538186635ff06cc86258b/drivers',
      {
        name: driverName,
        nickname: driverNickname,
        seats: driverSeats,
      }
    );
    const driverId = res.data;
    setFormData({});
    return handleAdd({ type: 'ADD_DRIVER', formData, driverId });
  }

  return (
    <Modal isVisible={isVisible} handleVisibility={handleVisibility}>
      <h1>Add Drivers</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="driverName">Name: </label>
        <input
          type="text"
          name="driverName"
          id="driverName_Add"
          value={formData.driverName || ''}
          onChange={e => handleInputChange(e)}
          required
          maxLength="20"
        />
        <label htmlFor="driverNickname">Nickname (optional): </label>
        <input
          type="text"
          name="driverNickname"
          id="driverNickname_Add"
          value={formData.driverNickname || ''}
          onChange={e => handleInputChange(e)}
          maxLength="20"
        />
        <label htmlFor="driverSeats">Number of available seats: </label>
        <select
          name="driverSeats"
          id="driverSeats_Add"
          value={formData.driverSeats}
          onChange={e => handleInputChange(e)}
          required
        >
          <option value="">-</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        <input type="submit" value="Add" />
      </form>
    </Modal>
  );
};

export default AddDriverModal;
