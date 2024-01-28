import { useEffect, useState } from 'react'
import { Balance, Layout, UserInfo } from '../components'
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getAllUsers = async() => {
      const response = await axios.get(`/api/v1/user/bulk?filter=${query}`, {withCredentials: true});
      const result = await response.data;
      setUsers(result);
    }
    getAllUsers();
  }, [query]);

  if(!users) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div className="flex flex-col justify-start w-full px-6">
        <Balance />
        <div className="flex flex-col gap-3 font-bold text-xl">
          <p>Users</p>
          <input type="text" value={query} onChange={() => setQuery(e.target.value)} className="border-2 border-gray-300 outline-2 outline-gray-400 p-2 text-gray-700 text-base font-medium" placeholder="Enter the name of user"/>
        </div>
        <div className="my-4">
          {
            users?.map((user) => (
              <UserInfo key={user._id} user={user}/>
            ))
          }
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard