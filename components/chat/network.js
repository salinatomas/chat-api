const express = require("express");

const controller = require("./controller");
const response = require("../../network/response");
const router = express.Router();

// Salina: 600c8d6fb6dde0273f9b5da0
// Franco: 600c8f9262186d2c7a212e8e
// Sofia: 600f495a9d9f600d9acd08c3

// grupo 1: 600f10d6dada4824b01a91a5
// grupo 2: 600f4a1fd30fb710fb66bffb

router.post("/", (req, res) => {
  controller
    .addChat(req.body.users)
    .then((data) => {
      response.success(req, res, data, 201);
    })
    .catch((err) => {
      response.error(req, res, "Unexpected error", 500, err);
    });
});

router.get("/:userId", (req, res) => {
  controller
    .listChats(req.params.userId)
    .then((users) => {
      response.success(req, res, users, 200);
    })
    .catch((err) => {
      response.error(req, res, "Unexpected error", 500, err);
    });
});

module.exports = router;
