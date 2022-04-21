const tasks = require('../../models/Task');

module.exports.getAllTasks = async (req, res, next) => {
  tasks.find().then(result => {
    res.send(result);
  });
}

module.exports.createNewTask = (req, res, next) => {
  const body = req.body;
  if ((body.hasOwnProperty('text') && body.hasOwnProperty('isCheck'))) {
    const task = new tasks(body);
    task.save().then(result => {
      res.send(result);
    })
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.changeTaskInfo = (req, res, next) => {
  const body = req.body;
  if ((body.hasOwnProperty('_id')) && (body.hasOwnProperty('text')) || (body.hasOwnProperty('isCheck'))) {
    tasks.findOneAndUpdate(
      { _id: body._id },
      { $set: body }
    ).then(result => {
      tasks.find().then(result => {
        res.send(result);
      });
    });
  } else {
    res.status(422).send('Error! Params not correct');
  }
};

module.exports.deleteTask = (req, res, next) => {
  const id = req.query._id;
  if (id) {
    tasks.deleteOne({id}).then(result => {
      res.send(id)
    });
  } else {
    res.status(404).send('Error! Params not found');
  };
};
