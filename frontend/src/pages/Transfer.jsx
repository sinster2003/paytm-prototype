import { useState } from "react";
import { UserInfoBar } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Transfer = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleAmount = async () => {
    const parsedAmount = parseInt(amount);
    try {
      if (parsedAmount > 0) {
        const toBody = {
          to: id,
          amount,
        };
        const response = await axios.post(`/api/v1/account/transfer`, toBody);
        const result = await response?.data;
        toast.success(result?.message);
        setAmount("");
        navigate("/dashboard");
      } else {
        toast.error("Invalid Amount");
        setAmount("");
      }
    } 
    catch (error) {
      toast.error(error?.response?.data?.message);
      setAmount("");
    }
  };

  return (
    <div className="flex flex-col justify-between p-6 w-96 h-96 shadow-2xl border-2 border-gray-100 m-4">
      <h1 className="text-3xl font-bold text-center mt-8">Send Money</h1>
      <div className="flex flex-col gap-2 mb-8">
        <UserInfoBar userId={id} />
        <p className="pb-0.5">Amount (in Rs)</p>
        <input
          type="text"
          value={amount}
          className="border-2 border-gray-300 outline-2 outline-gray-400 p-2 text-gray-700 text-base font-medium"
          placeholder="Enter amount"
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="w-full bg-green-500 text-gray-100 rounded-md p-2 mt-2"
          onClick={handleAmount}
        >
          Initiate Transfer
        </button>
      </div>
    </div>
  );
};

export default Transfer;
