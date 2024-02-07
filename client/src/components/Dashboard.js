import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  

  useEffect(() => {
    // Fetch weather data from API
    fetch("https://api.openweathermap.org/data/2.5/weather?q=kakinada&appid=09a565665eb0db2fe6d53e599b5a552d")
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather:", error));

    // Fetch user data (replace with your data fetching logic)
    const fetchedUsers = [
      { id: 1, username: "user1", addedDate: "2023-11-21", status: "active" },
      { id: 2, username: "user2", addedDate: "2024-02-05", status: "inactive" },
    ];
    setUsers(fetchedUsers);
    setFilteredUsers(fetchedUsers);
  }, []);

  const handleUserAction = (action, userId) => {
    // Handle user actions (add, delete, change status)
    // Update the users state accordingly
    console.log("User action:", action, "User ID:", userId);
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

  const handleDateFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    const filtered = users.filter((user) => {
      const addedDate = new Date(user.addedDate);
      return (!start || addedDate >= new Date(start)) && (!end || addedDate <= new Date(end));
    });

    setFilteredUsers(filtered);
  };

  const displayUsers = filteredUsers.map((user) => (
    <tr key={user.id} className="border-b border-gray-200">
      <td className="px-4 py-2 text-center">{user.username}</td>
      <td className="px-4 py-2 text-center">{user.addedDate}</td>
      <td className="px-4 py-2 text-center">{user.status}</td>
      <td className="px-4 py-2 text-center">
        {/* Add buttons for actions (add, delete, change status) */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => handleUserAction("add", user.id)}
        >
          Add
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={() => handleUserAction("delete", user.id)}
        >
          delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="container mx-auto px-4">
      <main className="mt-8">
        <section className="flex flex-col items-center bg-gray-200 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Current Weather</h2>
          {weatherData ? (
            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
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
        <section className="mt-8">
          <div className="flex flex-row justify-between mb-4">
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
                onChange={(e) => handleDateFilter(e.target.value, endDate)}
              />
              <input
                type="date"
                className="border rounded-md p-2"
                onChange={(e) => handleDateFilter(startDate, e.target.value)}
              />
            </div>
          </div>
          <table className="min-w-full table-auto">
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
