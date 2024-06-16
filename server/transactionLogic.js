const Account = require("./db/accountSchema");
const { findById } = require("./db/userSchema");

const TranserFunds = async (fromAccount, toAccount, amount) => {
    // here we have to check that does user has enough moeny to send
    // await the transation to deduct the money from the sender account
    await Account.findByIdAndUpdate(fromAccount, {
        $inc: {
            balance: -amount,
        },
    });
    // await the database call the increase the money to the reciever ends
    await Account.findByIdAndUpdate(toAccount, {
        $inc: {
            balance: +amount,
        },
    });
};
