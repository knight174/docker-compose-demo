import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // 获取网站访问次数
    axios
      .get<number>('http://localhost:3000/api/visit-count')
      .then((response) => {
        setVisitCount(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // 获取用户列表
    axios
      .get<User[]>('http://localhost:3000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Welcome to the website</h1>
      <p>Total visits: {visitCount}</p>

      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
