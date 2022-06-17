const User = require("../models/userModel");
const asyncErr = require("../middleware/asyncErr");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const bodyParser = require("body-parser");
const generateResetToken = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const cloudinary = require('cloudinary')


// register user
exports.createUser = asyncErr(async (req, res, next) => {
  let myCloud
  if (req.body.avatar) {
    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatar",
      width: 150,
      crop: "scale"
    })
  }
  else{
    myCloud = {
      public_id:"none",
      secure_url:"none"
    }
  }
  const { name, email, password, role } = req.body;
  let user = await User.create({
    name,
    email,
    password,
    role,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});

// login user
exports.loginUser = asyncErr(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid login credentials", 401));
  }
  const isVerified = await user.verifyUser(password);
  if (!isVerified) {
    return next(new ErrorHandler("Invalid login credentials", 401));
  }

  sendToken(user, 200, res);
});

// logout user
exports.logout = asyncErr(async (req, res, next) => {
  res.cookie("jwt", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

// forgot password

exports.forgot = asyncErr(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  const resetToken = user.generateResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `http://192.168.0.9:3000/password/reset/${resetToken}`;
  const message = `Hello ${user.name}\n\nTo reset your password please click on:- \n\n${resetUrl}\n\nIf your havn't requeseted please ignore.\n\n\n*This is an auto generated mail please don't reply.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password
exports.reset = asyncErr(async (req, res, next) => {
  const resetpasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetpasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("password did'n matched", 500));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save()
  sendToken(user, 200, res);
});


//  get user details 
exports.userDetails = asyncErr(async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorHandler("please log in to view this page", 404))
  }
  const userId = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(userId.id,{password:0});
  if (!user) {
    return next(new ErrorHandler("user not found", 404))
  }
  res.status(200).json({
    success: true,
    user
  })
})

// update password
exports.updatePassword = asyncErr(async (req, res, next) => {
  
  const token = req.cookies.jwt;
  if (!token) {
    return next(new ErrorHandler("please log in to view this page", 404))
  }
  const userId = jwt.verify(token, process.env.SECRET_KEY);
  const user = await User.findById(userId.id);
  if (!user) {
    return next(new ErrorHandler("user not found", 404))
  }
  const isVerified = await user.verifyUser(req.body.password)
  if (!isVerified) {
    return next(new ErrorHandler("incorrect password", 400))
  }
  if (req.body.newPassword !== req.body.confirmNewPassword) {
    return next(new ErrorHandler("password didn't matched", 400))
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res)
  res.status(201).json({
    success: true,
    message: "password updated"
  })

})

// update user details

exports.updateUserDetails = asyncErr(async (req, res, next) => {
  const user = req.user;
  const isVerified = await user.verifyUser(req.body.password)
  if (!isVerified) {
    return next(new ErrorHandler("incorrect password", 400))
  }
  let myCloud
  if (req.body.avatar) {
    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatar",
      width: 150,
      crop: "scale"
    })
    user.name = req.body.name;
    user.email = req.body.email;
    user.avatar={
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    }
  }
  else{
    user.name = req.body.name;
    user.email = req.body.email;
  }
  await user.save();
  user.password=null
  res.status(200).json({
    success: true,
    user
  })
})

// get all user --admin
exports.getAllUser = asyncErr(async (req, res, next) => {
  const users = await User.find({ "role": "user" });
  if (!users) {
    return next(new ErrorHandler("No user found", 404))
  }

  res.status(200).json({
    success: true,
    users
  })

})

// get single user details --admin
exports.getSingleUser = asyncErr(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler("user not found", 404))
  }

  res.status(200).json({
    success: true,
    user
  })
})



// update user role --admin
exports.updateUserRole = asyncErr(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler("user not found", 404))
  }
  user.role = req.body.role;
  await user.save();

  res.status(200).json({
    success: true,
    user
  })
})

// delete user
exports.deleteUser = asyncErr(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new ErrorHandler("user not found", 404))
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "user removed successfully"
  })
})