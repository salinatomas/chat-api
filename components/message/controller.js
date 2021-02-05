const store = require("./store");
const { socket } = require("../../socket");

const { host, port, publicRoute, filesRoute } = require("../../config");

const addMessage = (chat, user, message, file) => {
  return new Promise((resolve, reject) => {
    if (!chat || !user || !message) {
      console.error("[messageControler] No hay chat, usuario o mensaje");
      return reject("Los datos son incorrectos");
    }

    let fileUrl = "";
    if (file) {
      // fileUrl = "http://localhost:3000/app/files/" + file.filename;
      fileUrl = `${host}:${port}${publicRoute}${filesRoute}/` + file.filename;
    }

    const fullMessage = {
      chat,
      user,
      message,
      date: new Date(),
      file: fileUrl,
    };

    store.add(fullMessage);

    socket.io.emit("message", fullMessage);

    resolve(fullMessage);
  });
};

const getMessages = (filterChat) => {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterChat));
  });
};

const updateMessage = (id, message) => {
  return new Promise(async (resolve, reject) => {
    if (!id || !message) {
      return reject("Invalid data");
    }
    const result = await store.update(id, message);
    resolve(result);
  });
};

const deleteMessage = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject("Id inválido");
    }
    store
      .delete(id)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

module.exports = {
  addMessage,
  getMessages,
  updateMessage,
  deleteMessage,
};
