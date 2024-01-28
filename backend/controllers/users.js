const { User } = require("../models/users");
const { Account } = require("../models/accounts");
const generateToken = require("../utils/generateToken");
const { signupValidation, signinValidation, updateValidation } = require("../zod");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { firstname, lastname, email, username, password } = req.body; // destructing the req.body object

  try {
    // input validation using zod
    const { success } = signupValidation.safeParse({
      firstname,
      lastname,
      email,
      username,
      password,
    });

    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }

    // whether account is already present
    const isExistingUser = await User.find({ $or: [{ email }, { username }] });

    if (isExistingUser.length) {
      return res
        .status(400)
        .json({ message: "User already exists. Please Login" });
    }

    // bcrypt password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Instance of a model is a document or object of a model class
    const user = new User({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    });

    await user.save(); // saving of document

    // account creation
    const account = new Account({
      userId: user._id,
      balance: Math.floor(Math.random() * 10000) + 1
    });

    await account.save(); // creation of account
    
    // generateToken jwt
    const token = generateToken(user._id, res);

    res.status(200).json({
      message: `${user.username} created successfully`,
      token,
      userId: user._id
    });

    // error handling
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error?.message,
    });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    // input validation
    const { success } = signinValidation.safeParse({
      username,
      password,
    });

    if (!success) {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }

    const isExistingUser = await User.findOne({ username });

    if (!isExistingUser) {
      return res
        .status(404)
        .json({ message: `${username} not found. Please signup` });
    }

    // compare the given password and bcrypted password
    const isValidPassword = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!isValidPassword) {
      return res.status(411).json({ message: "Invalid credentials" });
    }

    // generate token jwt
    const token = generateToken(isExistingUser._id, res);

    res.status(200).json({
      message: `${isExistingUser.username} has logged in`,
      token,
      userId: isExistingUser._id
    });
  } 
  catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: `Error while logging in, ${error?.message}` });
  }
};

const updateProfile = async (req, res) => {
  const {firstname, lastname, email, username, password} = req.body;
  const userId = req.userId; // user logged in
  let hashedPassword = "";

  const { success } = updateValidation.safeParse({
    firstname, 
    lastname, 
    email, 
    username, 
    password
  });

  if(!success) {
    return res.status(411).json({
      message: "Error whiling updating profile"
    })
  }

  try {
  /*
    // updation ---> method 1
    const userToBeUpdated = await User.findById(userId);

    userToBeUpdated.firstname = firstname || userToBeUpdated.firstname;
    userToBeUpdated.lastname = lastname || userToBeUpdated.lastname;
    userToBeUpdated.email = email || userToBeUpdated.email;
    userToBeUpdated.username = username || userToBeUpdated.username;

    if(password) {
      const saltRounds = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      userToBeUpdated.password =  hashedPassword || userToBeUpdated.password;
    }

    await userToBeUpdated.save();
  */
 
    // method 2 ---> updateOne or findByIdAndUpdate
    if(password) {
      const saltRounds = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, saltRounds);
      // query ---> select, update ---> body
      await User.updateOne({_id: userId}, {
        ...req.body,
        password: hashedPassword
      });
    }
    else {
      await User.updateOne({_id: userId}, {
        ...req.body
      });
    }

    res.status(200).json({ message: "User updated successfully" });
  }
  catch(error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }

}

const filterUser = async (req, res) => {
  const { filter } = req.query;

  try {
    const users = await User.find({
      $or: [ // filter matches with firstname or lastname
        {
          firstname: {
            $regex: filter // if firstname field has a regex which includes filter
          }
        },
        {
          lastname: {
            $regex: filter // if lastname field has a regex which includes filter
          }
        },
      ]
    }).select("-password");

    res.status(200).json(users);

    /*
    res.status(200).json(users.map(user => ({
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      username: user?.username,
      _id: user?._id
    })));
    */
  }
  catch(error) {
    console.log(error);
    res.status(500).json({message: "Something went wrong"});
  }
}

const getUser = async (req, res) => {
  const { id } = req.params; // user_id

  try {
    const user = await User.findById(id).select("-password").select("-updatedAt");
    if(!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.status(200).json(user);
  }
  catch(error) {
    console.log(error);
    res.status(500).json({
      error,
      message: "Something went wrong"
    });
  }
}

module.exports = {
  signUp,
  signIn,
  updateProfile,
  filterUser,
  getUser
};
