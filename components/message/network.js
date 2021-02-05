const express = require("express");
const multer = require("multer");
const path = require("path");

const { filesRoute } = require("../../config");

const controller = require("./controller");
const response = require("../../network/response");
const router = express.Router();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public${filesRoute}`);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({
  storage: storage,
});

router.post("/", upload.single("file"), (req, res) => {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message, req.file)
    .then((fullMessage) => {
      response.success(req, res, fullMessage, 201);
    })
    .catch((err) => {
      response.error(
        req,
        res,
        "Informacion inválida",
        400,
        "Error en el controller"
      );
    });
});

router.get("/", (req, res) => {
  const filterMessage = req.query.chat || null;
  controller
    .getMessages(filterMessage)
    .then((messageList) => {
      response.success(req, res, messageList, 200);
    })
    .catch((err) => {
      response.error(req, res, "Unexpected Error", 500, err);
    });
});

router.patch("/:id", (req, res) => {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error interno", 500, err);
    });
});

router.delete("/:id", (req, res) => {
  controller
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
    })
    .catch((err) => {
      response.error(req, res, "Error interno", 500, err);
    });
});

module.exports = router;
