import React, { useEffect, useState } from "react";

// Import necessary styles
import "./App.css";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://192.168.1.67:5000/api/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong!");
        }

        // data.users = [{}];

        if (data.users) {
          setData(
            data.users.length > 0
              ? `${data.users.length} users Founds`
              : "No users found"
          );
          return;
        }
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
      <p>{data}</p>
    </div>
  );
}

// ✅ Don't forget to export
export default App;
