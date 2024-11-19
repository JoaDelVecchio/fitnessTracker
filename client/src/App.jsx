import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getUsers");
        setListOfUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the users", error);
      }
    };
    fetchUsers();
  }, []);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user, i) => (
          <p key={i}>{user.name}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
