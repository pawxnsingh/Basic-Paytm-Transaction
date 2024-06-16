import Header from "../components/Header";
import UserCard from "../components/UserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { balanceAtom } from "../store/atoms";

const Dashboard = () => {
    const balance = useRecoilValue(balanceAtom);

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            })
            .then((response) => {
                setUsers(response.data.user);
            });
    }, [filter]);

    // console.log(isAuthenticated);

    // useEffect(() => {
    //     if (!isAuthenticated.contents) {
    //         navigate("/signup");
    //     }
    // }, [isAuthenticated.contents]);

    return (
        <div className="px-6 ">
            <div className="border-b-2 mb-4">
                <Header />
            </div>

            <div>
                <p className="font-bold mb-4 ">You Balance ${balance}</p>

                <p className="font-bold mb-4">Users</p>

                <div className="mb-5">
                    <input
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search User..."
                        className="w-full text-sm pl-3 focus:outline-none border border-gray-300 py-2 rounded-lg"
                    />
                </div>

                <div>
                    {users.map((user, index) => {
                        return (
                            <UserCard
                                key={index}
                                to={user._id}
                                receiverName={user.firstName}
                                SerialNumber={index + 1}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
