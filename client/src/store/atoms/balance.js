import { atom } from "recoil";
// this is the balance atom and we need to update it when user login and or signup cuz we are generating the
// random balances

const balanceAtom = atom({
    key: "balanceAtom",
    default: 0,
});

export default balanceAtom;
