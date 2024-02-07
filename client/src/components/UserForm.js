import React, { useState } from 'react';
import { db } from '../firebase'
import { collection,addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString();
    const userData = {
      username,
      isActive,
      date: currentDate,
    };

    try {

      const docRef = await addDoc(collection(db,'users'),userData)
    //   onSubmit(userData);
    console.log("Document written with ID: ", docRef.id);
      setUsername('');
      setIsActive(true);
      navigate('/')
      
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h2 className="text-center text-2xl font-extrabold mb-4">Create User</h2>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="isActive" className="block text-gray-700 text-sm font-bold mb-2">
              Active Status:
            </label>
            <select
              id="isActive"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value === 'true')}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
