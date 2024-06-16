import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilStateLoadable, useSetRecoilState } from "recoil";
import { balanceAtom, userAtom } from "../store/atoms";
import { isAuthSelector } from "../store/selector";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    // const setUser = useSetRecoilState(userAtom);
    // const setBalance = useSetRecoilState(balanceAtom);
    // why useRecoilStateLoadable is used cuz we are loading gettin gthe data from the async call
    // const isAuthenticated = useRecoilStateLoadable(isAuthSelector);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         navigate("/");
    //     }
    // }, [isAuthenticated]);

    const [formData, setFormData] = useState({
        username: "",
        firstname: "",
        password: "",
        lastname: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const SignupHandler = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // this is working fine
            // this below response will return
            /**
             * {
             *      userid
             *      token,
             *      username,
             *      firstname,
             *      lastname
             * }
             */
            const signupResponse = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // now i have successfully submitted the user Deatil to the backend
            const token = signupResponse.data.token;
            localStorage.setItem("jwtToken", token);
            // after signing up im getting the token and i need to store that token in the local memory
            // setting it in the local storage
            const balanceResponse = await axios.get(
                "http://localhost:3000/api/v1/account/balance",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // after doing all this stuff change the state of the user and balance atom,
            // now we need to give these value
            setUser({
                userId: signupResponse.data.userId,
                firstname: signupResponse.data.firstname,
                lastname: signupResponse.data.lastname,
                username: signupResponse.data.username,
            });
            setBalance(balanceResponse.data.balance);

            navigate("/");
        } catch (error) {}
    };

    return (
        <div className="absolute top-[50%] left-[50%] ml-[-160px] bg-white">
            <div className="w-[300px] my-5 px-4 border rounded-md">
                <div className="text-center my-3">
                    <div className="font-bold text-2xl">Sign Up</div>
                    <div className="text-gray-500">
                        Enter you information to create an account
                    </div>
                </div>

                <form onSubmit={SignupHandler}>
                    <div className="mb-2 space-y-3">
                        <label className="font-bold ">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={onChangeHandler}
                            className="w-full h-8 focus:outline-none border px-2 rounded-md text-sm"
                            placeholder="Pawan"
                            required
                        />
                    </div>
                    <div className="mb-2 space-y-3">
                        <div className="font-bold">Last Name</div>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={onChangeHandler}
                            className="w-full h-8 focus:outline-none border px-2 rounded-md text-sm"
                            placeholder="Singh"
                            required
                        />
                    </div>

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
                            placeholder="********"
                            value={formData.password}
                            onChange={onChangeHandler}
                            className="w-full h-8 focus:outline-none border px-2 rounded-md text-sm"
                            type="password"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="submit"
                            className="bg-black w-full text-white py-1 rounded-lg"
                            value="Sign Up"
                        />
                    </div>

                    <div className="my-3 font-semibold text-center w-full">
                        <div className="inline-block mr-1">
                            Already have an account?
                        </div>
                        <Link className="hover:underline" to="/signin">
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
