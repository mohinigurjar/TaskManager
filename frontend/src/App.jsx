import { useState } from 'react'

import './App.css'

import { useEffect } from "react";
import { fetchTasks } from "../src/services/task.services";
import { adminFetchUsers } from './services/admin.services';

function App() {

  useEffect(() => {

    const testAPI = async () => {
      try {
        const response = await adminFetchUsers();
        console.log(response.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    testAPI();

  }, []);

  return (
    <h1>Frontend Connected</h1>
  );
}

export default App;
