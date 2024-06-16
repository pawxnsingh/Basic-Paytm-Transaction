const express = require("express");
const authFunction = require("../middlewares/authMiddleware");
const Account = require("../db/accountSchema");

const router = express.Router();

router.get("/balance", authFunction, async (req, res) => {
    // we will hav the req object and this is going to be the
    const accountData = await Account.findOne({ userId: req.userId });

    return res.status(200).json({
        success: true,
        balance: accountData.balance,
    });
});

/**
 * here we need sender and receiver address
 *
 */

router.post("/transfer", authFunction, async (req, res) => {
    // i need to transfer fund from my account to some other account
    /**
     * {
     *      to: string,
     *      amount: number
     * }
     */

    // bad solution is not use transaction in database
    // and the good solution is to use txns
    // but while using transaction there can be issue of the mongoDB replicaion\
    // so feel free to go with bad solution
    
    // const session = await mongoose.startSession();
    // session.startTransaction();
    const { to, amount } = req.body;
    // first get my userDetail and fetch my balance

    const senderDetail = await Account.findOne({
        userId: req.userId,
    }); //session(session);

    // then check then check if i had the sufficient balance
    if (!senderDetail || senderDetail.balance < amount) {
        // await session.abortTransaction();
        return res.status(400).json({
            message: "Insuffient Balance",
        });
    }

    // then find the user in the account section does it exist or not
    const receiverDetails = await Account.findOne({
        userId: to,
    });//.session(session);

    // if doesn't exist then transfer the balance to the that account
    if (!receiverDetails) {
        // await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account",
        });
    }

    // now we have ensured that the sender has enough balance and
    // and the reciever is also authentic
    // now it's time make the transaction
    // this is for debit 
    await Account.updateOne(
        {
            userId: req.userId,
        },
        {
            $inc: {
                balance: -amount,
            },
        }
    ); //session(session);

    await Account.updateOne(
        {
            userId: to,
        },
        {
            $inc: {
                balance: amount,
            },
        }
    ); //session(session);

    // await session.commitTransaction();
    res.status(200).json({
        message: "Transfer Successful",
    });
});

module.exports = router;
