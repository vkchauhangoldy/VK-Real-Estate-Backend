const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user-schema");

const {
  randomTwoDigitInteger,
  randomFourDigitInteger,
} = require("../utils/utils");
const saltRounds = 10;
const SECRET_CODE = "asdfghjklkjhgfdsa";

const getUserByToken = (token) => {
  return new Promise((res, rej) => {
    if (token) {
      let userDetail;
      try {
        userDetail = jwt.verify(token, SECRET_CODE);
        res(userDetail);
      } catch (error) {
        rej("Please enter a valid token!");
      }
    } else {
      rej("Token not found!");
    }
  });
};

exports.getUserId = async (req, res) => {
  try {
    const user = await getUserByToken(req.headers.authorization);
    res.send(user);
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: "Can't able to fetch the userId!",
    });
  }
};

exports.postSignUp = async (req, res) => {
  bcrypt.genSalt(saltRounds, (saltError, saltValue) => {
    if (!saltError) {
      bcrypt.hash(
        req.body.password,
        saltValue,
        async (hashError, hashValue) => {
          if (!hashError) {
            const userID = `${randomTwoDigitInteger()}PPD${randomFourDigitInteger()}`;
            try {
              const userSignUpDetails = await User.create({
                userID: userID,
                username: `${req.body.email.split("@")[0]}-${
                  userID.split("PPD")[0]
                }${userID.split("PPD")[1]}`,
                email: req.body.email,
                password: hashValue,
              });
              res.status(200).json({
                status: "Success",
                userSignUpDetails,
              });
            } catch (err) {
              res.status(400).json({
                status: "Failed",
                message: "User already registered. Please login to continue...",
              });
            }
          } else {
            res.status(401).json({
              status: "Failed",
              message: "Failed to store the data",
            });
          }
        }
      );
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Failed to store the data",
      });
    }
  });
};

exports.postSignIn = async (req, res) => {
  try {
    const userDetails = await User.findOne({ email: req.body.email });
    if (!userDetails) {
      res.status(500).json({
        title: "SignIn Unsuccessful",
        message: "User does not exist. Please Sign Up!",
      });
    } else {
      if (bcrypt.compareSync(req.body.password, userDetails.password)) {
        const token = jwt.sign(
          {
            id: userDetails._id,
            userID: userDetails.userID,
            username: userDetails.username,
          },
          SECRET_CODE
        );
        res
          .status(200)
          .json({ message: "User logged in successfully", token: token });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Invalid Password. Please enter a valid password!",
        });
      }
    }
  } catch (error) {
    res.status(401).json({
      status: "Failed",
      message: error.message,
    });
  }
};
