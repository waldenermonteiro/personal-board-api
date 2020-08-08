const db = require("../config/database");

exports.findTaskById = async (req, res) => {
  const taskId = req.params.id;
  const response = await db.query("SELECT * FROM tasks WHERE id = $1", [
    taskId,
  ]);
  res.status(200).send({ data: response.rows });
};
exports.createTask = async (req, res) => {
  const { title, description, position, frame_id } = req.body;
  const {
    rows,
  } = await db.query(
    "INSERT INTO tasks (title, description, position,frame_id) VALUES ($1, $2, $3, $4)",
    [title, description, position, frame_id]
  );

  res.status(201).send({
    message: "Task added successfully!",
  });
};
exports.updateTask = async (req, res) => {
  const taskId = req.body.id;
  const { title, description, position, frame_id } = req.body;

  const response = await db.query(
    "UPDATE tasks SET title = $1, description = $2, position = $3, frame_id = $4 WHERE id = $5",
    [title, description, position, frame_id, taskId]
  );

  res.status(200).send({ message: "Frame Updated Successfully!" });
};
exports.deleteTask = async (req, res) => {
  const taskId = req.body.id;
  await db.query("DELETE FROM tasks WHERE id = $1", [taskId]);

  res.status(200).send({ message: "Frame deleted successfully!", taskId });
};
