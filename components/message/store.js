const Model = require("./model");

function addMessage(message) {
  const myMessage = new Model(message);
  myMessage.save();
}

function getMessage(filterChat) {
  return new Promise((resolve, reject) => {
    let filter = {};
    if (filterChat !== null) {
      filter = { chat: filterChat };
    }

    Model.find(filter)
      .populate("user")
      .exec((err, populated) => {
        if (err) {
          return reject(err);
        }

        resolve(populated);
      });
  });
}

async function updateMessage(id, message) {
  const foundMessage = await Model.findOne({
    _id: id,
  });

  foundMessage.message = message;
  const newMessage = await foundMessage.save();
  return newMessage;
}

function removeMessage(id) {
  return Model.deleteOne({
    _id: id,
  });
}

module.exports = {
  add: addMessage,
  list: getMessage,
  update: updateMessage,
  delete: removeMessage,
};
