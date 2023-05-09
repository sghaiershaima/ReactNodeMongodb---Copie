import React from 'react';
import axios from 'axios';

function Logout() {
  const handleLogout = async () => {
    await axios.post('/api/logout');
    window.location.reload(); // Reload the page to clear user data
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
