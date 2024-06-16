import axios from "axios";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

const SendMoney = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get("name");
    const walletAddress = searchParams.get("walletAddress");
    const [success, setSuccess] = useState(false);

    const [amount, setAmount] = useState();

    const initiateTransferHandler = async () => {
        const response = await axios.post(
            "http://localhost:3000/api/v1/account/transfer",
            {
                to: walletAddress,
                amount,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            }
        );

        if (response.status === 200) {
            setSuccess(true);
        }
    };

    return (
        <div className="w-[320px] h-[270px] absolute top-[50%] mt-40 left-[50%] ml-[-160px] rounded-lg shadow-xl px-4">
            {/* {success && 
                <div className="bg-slate-300 flex  items-center justify-center ">
                    Payment Successful
                </div>
            } */}
            <div>
                <div className="text-center my-6 font-bold text-2xl">
                    Send Money
                </div>

                <div className="flex items-center gap-2">
                    <div className="uppercase py-2 px-4 text-white rounded-3xl font-bold bg-black">
                        {name[0]}
                    </div>
                    <div className="font-bold text-lg capitalize">{name}</div>
                </div>

                <div>
                    <div className="font-semibold text-sm mb-5">
                        Amount (In Dollar)
                    </div>
                    <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        className="w-full h-8 mb-5 focus:outline-none border px-2 rounded-md text-sm"
                        type="text"
                    />
                </div>

                <div>
                    <button
                        onClick={initiateTransferHandler}
                        className="w-full mb-6 bg-black text-white py-1 rounded-lg"
                    >
                        Initiate Transfer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SendMoney;
