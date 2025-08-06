import React, { useEffect, useState } from "react";

// Import necessary styles
import "./App.css";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://192.168.1.67:5000/api/data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();

        setData(data.data || "No data received");
        // console.log("Data fetched successfully:", data.message);
      } catch (error) {
        setData("Error fetching data");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Welcome to Remidermate</h1>
      <p>Your personal medication reminder app.</p>
      <p>
        {data.UserName} <br />
        {data.Password}
      </p>
    </div>
  );
}

// ✅ Don't forget to export
export default App;
