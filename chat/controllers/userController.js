//router speaks to this contoller for all user related stuff.

var config = require('../config')
    , gravatarUtil = require('./util/gravatarUtil')
    , User = require('../models/userSchema')

exports.createUser = function(req, res){
  res.send('/users');
};

exports.updateUser = function(req, res){
  res.send('/users');
};

exports.deleteUser = function(req, res){
  res.send('/users');
};

exports.profileUser = function(req, res){
  res.send('/users');
};
