import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { balanceAtom, userAtom } from "../store/atoms";

const Signin = () => {
    const navigate = useNavigate();
    const setBalance = useSetRecoilState(balanceAtom);
    const setUser = useSetRecoilState(userAtom);

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // useEffect(() => {
    //     if (isAuthenticated.contents) {
    //         navigate("/");
    //     }
    // }, [isAuthenticated.contents]);

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const signinHandler = async (e) => {
        e.preventDefault();

        try {
            const userDetails = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                    username: formData.username,
                    password: formData.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const token = userDetails.data.token;
            localStorage.setItem("jwtToken", token);

            const balanceResponse = await axios.get(
                "http://localhost:3000/api/v1/account/balance",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(balanceResponse);

            setUser({
                userId: userDetails.data.userId,
                username: userDetails.data.username,
                firstname: userDetails.data.firstname,
                lastname: userDetails.data.lastname,
            });

            setBalance(balanceResponse.data.balance);

            navigate("/");
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    return (
        <div className="absolute top-[50%] left-[50%] ml-[-160px] bg-white">
            <div className="w-[300px] my-5 px-4 border rounded-md">
                <div className="text-center my-3">
                    <div className="font-bold text-2xl">Sign In</div>
                    <div className="text-gray-500">
                        Enter you information to get in.
                    </div>
                </div>

                <form onSubmit={signinHandler}>
                    <div className="mb-2 space-y-3">
                        <div className="font-bold">Email</div>
                        <input
                            value={formData.username}
                            onChange={onChangeHandler}
                            name="username"
                            className="w-full h-8 focus:outline-none border px-2 rounded-md text-sm"
                            type="text"
                            placeholder="pawan@example.com"
                            required
                        />
                    </div>

                    <div className="mb-4 space-y-3">
                        <div className="font-bold">Password</div>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={onChangeHandler}
                            placeholder="********"
                            className="w-full h-8 focus:outline-none border px-2 rounded-md text-sm"
                            type="password"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="submit"
                            className="bg-black w-full text-white py-1 rounded-lg"
                            value="Sign In"
                        />
                    </div>

                    <div className="my-3 font-semibold text-center w-full">
                        <div className="inline-block mr-1">
                            Not have an account?
                        </div>
                        <Link className="hover:underline" to="/signup">
                            Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
