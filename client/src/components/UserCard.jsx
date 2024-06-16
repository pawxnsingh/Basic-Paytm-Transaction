import { useNavigate } from "react-router-dom";

const UserCard = ({ receiverName, SerialNumber, to}) => {
    const navigate = useNavigate();
    return (
        <div className="flex  justify-between py-3">
            <div className="flex space-x-2 ">
                <p className="bg-slate-200 px-2 py-1 rounded-3xl font-bold">U{SerialNumber}</p>
                <p className="mt-[4px] font-bold capitalize">{receiverName}</p>
            </div>
            <div>
                <button onClick={()=>{
                    navigate("/send?name="+receiverName+"&walletAddress="+to)
                }} className="bg-black text-white px-2 rounded-lg py-1">Send Money</button>
            </div>
        </div>
    );
};
export default UserCard;
