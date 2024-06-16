import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms";

const Header = () => {
    const user = useRecoilValue(userAtom);
    console.log(user); 

    return (
        <div className="flex justify-between items-center py-[14px] border-gray-200">
            <div>
                <p className="font-bold uppercase text-xl">payment app</p>
            </div>

            <div className="flex space-x-3 items-center">
                <p className="font-bold">Hello, {user.firstname}</p>
                <p className="bg-slate-200 px-2 rounded-3xl">U</p>
            </div>
        </div>
    );
};

export default Header;
