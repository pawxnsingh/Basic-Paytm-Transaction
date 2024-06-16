//! this will handle all the user Routes related to user wheater it is sign-up / sign-in / change-password
const express = require("express");
const bcrypt = require("bcrypt");
const z = require("zod");
const User = require("../db/userSchema");
const Amount = require("../db/accountSchema");
const { JWT_TOKEN } = require("../config");
const jwt = require("jsonwebtoken");
const authFunction = require("../middlewares/authMiddleware");

const router = express.Router();
// here create a zod validation
const signupBody = z.object({
  username: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
});

// there we will have three routes
// working fine - tested
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  // if wrong information is entered by user, then send them error
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  // if entered information is correct then check in the database does user exist,
  // if yes, then return user already exists
  // this will be the async call, so write await in front of it
  const existingUsers = await User.findOne({ username: req.body.username });
  if (existingUsers) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }
  // if no, store the user in the database and return you have registered successfully
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);
  // all data base call must be awaited
  const userEntry = await User.create({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: hashedPassword,
  });
  const userId = userEntry._id;
  await Amount.create({
    userId,
    balance: Math.floor(Math.random() * 10000) + 1,
  });
  // user is successfully create and now create the jwt token
  // now create a jwt token and send it to the user
  const token = jwt.sign(
    {
      userId,
    },
    JWT_TOKEN
  );
  return res.status(200).json({
    message: "User created successfully",
    token,
    userId: userEntry._id,
    username: userEntry.username,
    firstname: userEntry.firstname,
    lastname: userEntry.lastname,
  });
});

const signedinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

// this is also working
router.post("/signin", async (req, res) => {
  // let user Sign in and get back a token
  const { success } = signedinBody.safeParse(req.body);
  // username - email
  // password - string

  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  // then check does user exist or not
  const user = await User.findOne({
    username: req.body.username,
  });
  // user is going to contain the document which will have
  // the exact match otherwise it will be null

  if (!user) {
    return res.status(404).json({
      message: "user not found ",
    });
  }

  const passwordMatch = bcrypt.compare(user.password, req.body.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Password is Invalid",
    });
  }

  // if controlled has reached here which means user has found and we need to send a
  // jwt token
  const userId = user._id;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_TOKEN
  );

  res.status(200).json({
    message: "you have been successfully loggedin",
    token,
    userId: user._id,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
  });
});

const updateSchema = z.object({
  password: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
});
// change - UserDetails working fine
router.put("/changeInfo", authFunction, async (req, res) => {
  // after passing the authFunction
  //? The user is successfully authenticated
  /** this will our req object
   *     * userId : "unique is that will be assigned to the user"
   *     * password: the hashed password
   *     * firstname: "pawan",
   *     * lastname: "singh"
   */
  const validated = updateSchema.safeParse(req.body);
  // const filter = {id:}
  // i didnt understand this
  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  return res.status(200).json({
    update: true,
    message: "Details updated successfully",
  });
});

// write another route to update the user
//  working fine
router.get("/bulk", authFunction, async (req, res) => {
  // how to access
  // /api/v1/user/bulk?filter=harkirat

  const filter = req.query.filter;

  // the regex is the another mongodb operator that is used for the expression matching
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });

  res.status(200).json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
