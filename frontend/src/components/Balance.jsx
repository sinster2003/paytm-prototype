import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(`/api/v1/account/balance`);
        const result = await response?.data;
        setBalance(result?.balance);
      } catch (error) {
        console.log(error);
      }
    };
    getBalance();
  }, []);

  return (
    <div className="flex gap-3 font-bold text-xl my-7">
      <p>Your Balance : </p>
      <p>₹{!balance ? "Loading..." : balance}</p>
    </div>
  );
};

export default Balance;
