const { response, request} = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req = request, res = response) => {

  const { limit = 5, start = 0 } = req.query;
  const status =  { state : true };

  const [totalUsers, users] = await Promise.all([
    User.countDocuments(status),
    User.find(status)
      .skip(Number(start))
      .limit(Number(limit))
  ])

  res.json({
    totalUsers,
    users
  });
};

const usersPost = async (req, res = response) => {

  const { name, email, password, role } = req.body;
  const user = new User({name, email, password, role});

  // Password hashed
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save in the DB
  await user.save();

  res.json({user});
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if ( password ) {
    // Password hashed
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await  User.findByIdAndUpdate( id, rest );

  res.json(user);
};

const usersPatch = (req, res = response) => {
  res.json({
    message: "patch API - controller",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    message: "delete API - controller",
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
