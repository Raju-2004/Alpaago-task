/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
import { collection, deleteDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";

function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    // Fetch weather data based on user's location
    const fetchWeatherData = async () => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=09a565665eb0db2fe6d53e599b5a552d`
            );
            const data = await response.json();
            setWeatherData(data);
          });
        } else {
          console.log("Geolocation is not supported by your browser.");
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeatherData();

    // Fetch user data from Firestore
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(newData);
        setFilteredUsers(newData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserAction = async (action, userId) => {
    try {
      if (action === "delete") {
        const userRef = doc(db, "users", userId);
        await deleteDoc(userRef);
  
        // Remove the deleted user from both users and filteredUsers state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
      } else if (action === "changeStatus") {
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          console.error("User not found");
          return;
        }
    
        const userData = userDoc.data();
        const newStatus = !userData.isActive;
    
        await updateDoc(userRef, { isActive: newStatus });
    
        // Update the local state to reflect the changes
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, isActive: newStatus } : user
          )
        );
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, isActive: newStatus } : user
          )
        );
      }
    } catch (error) {
      console.error("Error changing user status:", error);
    }
  };

  const handleSearch = (searchText) => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSort = (column) => {
    let sortedUsers = [...filteredUsers];
    if (column === sortBy) {
      sortOrder === "asc" ? setSortOrder("desc") : setSortOrder("asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }

    sortedUsers.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });

    setFilteredUsers(sortedUsers);
  };

  const handleDateFilter = (startDate, endDate) => {
    if (!startDate && !endDate) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      const userDate = new Date(user.date);
      if (startDate && endDate) {
        return userDate >= new Date(startDate) && userDate <= new Date(endDate);
      } else if (startDate) {
        return userDate >= new Date(startDate);
      } else if (endDate) {
        return userDate <= new Date(endDate);
      }
    });

    setFilteredUsers(filtered);
  };

  const displayUsers = filteredUsers.map((user) => (
    <tr key={user.id} className="border-b border-gray-200">
      <td className="px-4 py-2 text-center">{user.username}</td>
      <td className="px-4 py-2 text-center">
        {new Date(user.date).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </td>
      <td className="px-4 py-2 text-center">
        {user.isActive ? "Active" : "Inactive"}
      </td>
      <td className="px-4 py-2 text-center">
        {/* Add buttons for actions (add, delete, change status) */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handleUserAction("delete", user.id)}
        >
          Delete
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleUserAction("changeStatus", user.id)}
        >
          Change Status
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container mx-auto px-4">
      <main className="mt-8">
        <section className="flex flex-col items-center bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
          {weatherData ? (
            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
                className="w-20 h-20 mr-4"
              />
              <div>
                <h3 className="text-xl">{weatherData.weather[0].description}</h3>
                <p className="mb-4">Temperature: {weatherData.main.temp}°C</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading weather data...</p>
          )}
        </section>
        <section className="mt-12">
          <div className="flex flex-row justify-between mb-4 mt-5">
            <h2 className="text-2xl font-bold">Active Users</h2>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search by username"
                className="border rounded-md p-2"
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div className="text-gray-500">Sort by:</div>
              <button
                onClick={() => handleSort("username")}
                className={`${
                  sortBy === "username" && sortOrder === "asc"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } px-2 py-1 rounded mr-2`}
              >
                Username
              </button>
              <button
                onClick={() => handleSort("addedDate")}
                className={`${
                  sortBy === "addedDate" && sortOrder === "asc"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } px-2 py-1 rounded mr-2`}
              >
                Added Date
              </button>
              <div className="text-gray-500">Date Filter:</div>
              <input
                type="date"
                className="border rounded-md p-2 mr-2"
                onChange={(e) => handleDateFilter(e.target.value, null)}
              />
              <input
                type="date"
                className="border rounded-md p-2"
                onChange={(e) => handleDateFilter(null, e.target.value)}
              />
            </div>
            <Link to="/user-form">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add Users
              </button>
            </Link>
          </div>
          <table className="min-w-full my-10 table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Added Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>{displayUsers}</tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
