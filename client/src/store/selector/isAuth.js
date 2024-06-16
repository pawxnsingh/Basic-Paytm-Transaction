import { selector } from "recoil";
import { userAtom } from "../atoms";

const isAuthSelector = selector({
    key: "isAuth",
    get: ({ get }) => {
        const user = get(userAtom);
        // if user is null which means user is not authenticated
        // if it is returing true which mean it is authenticated
        return Boolean(user);
    },
});

export default isAuthSelector;
