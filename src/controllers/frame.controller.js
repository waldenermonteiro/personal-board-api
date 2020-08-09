const db = require("../config/database");

exports.listAllFrames = async (req, res) => {
  const response = await db.query("SELECT * FROM frames ORDER BY position ASC");
  const frames = await getFramesTasks(response);
  res.status(200).send({ data: frames });
};
async function getFramesTasks(response) {
  const frames = [];
  for (const frame of response.rows) {
    const tasksFrame = await db.query(
      "SELECT * FROM tasks WHERE frame_id = $1",
      [frame.id]
    );
    frame.tasks = tasksFrame.rows.sort(function (a, b) {
      return a.position < b.position ? -1 : 1;
    });
    frames.push(frame);
  }
  return frames;
}
exports.findFrame = async (req, res) => {
  const frameId = req.params.id;
  const response = await db.query("SELECT * FROM frames WHERE id = $1", [
    frameId,
  ]);
  res.status(200).send(response.rows);
};
exports.createFrame = async (req, res) => {
  const { title, position } = req.body;
  const {
    rows,
  } = await db.query("INSERT INTO frames (title, position) VALUES ($1, $2)", [
    title,
    position,
  ]);

  res.status(201).send({
    message: "Frame added successfully!",
    data: {
      frame: { title, position },
    },
  });
};
exports.updateFrame = async (req, res) => {
  const frameId = req.body.id;
  const { title, position } = req.body;

  const response = await db.query(
    "UPDATE frames SET title = $1, position = $2 WHERE id = $3",
    [title, position, frameId]
  );

  res.status(200).send({ message: "Frame Updated Successfully!" });
};
exports.deleteFrame = async (req, res) => {
  const frameId = req.params.id;
  await db.query("DELETE FROM frames WHERE id = $1", [frameId]);

  res.status(200).send({ message: "Frame deleted successfully!", frameId });
};
