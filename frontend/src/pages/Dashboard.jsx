import { Layout, UserInfo } from '../components'

const Dashboard = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-start w-full px-6">
        <div className="flex gap-3 font-bold text-xl my-7">
          <p>Your Balance</p>
          <p>$5000</p>
        </div>
        <div className="flex flex-col gap-3 font-bold text-xl">
          <p>Users</p>
          <input type="text" className="border-2 border-gray-300 outline-2 outline-gray-400 p-2 text-gray-700 text-base font-medium" placeholder="Enter the name of user"/>
        </div>
        <div className="my-4">
          <UserInfo/>
          <UserInfo/>
          <UserInfo/>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard