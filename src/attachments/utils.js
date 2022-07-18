const config = require("../app.config");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

function saveFile(file) {
  let postdir =
    file.mimetype.includes("image") || path.extname(file.name) === ".jfif"
      ? "images"
      : file.mimetype.includes("audio")
      ? "audios"
      : file.mimetype.includes("video")
      ? "videos"
      : "attachment";

  const dir = path.join(config.path, "./attachments");
  const fileDir = path.join(dir, postdir);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir);

  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err)
        return reject({
          message: "Error while generating file name",
        });

      let extname = path.extname(file.name);
      const filename =
        buf.toString("hex") + (extname === ".jfif" ? ".png" : extname);
      const dir = path.join(fileDir, filename);

      file.mv(dir, (err) => {
        if (err)
          return reject({
            message: "Error while writing file",
          });
        
        console.log('CREATED'.yellow + ' - ' + dir.replace(config.path, "").magenta); 
        resolve({
          url: config.api + "/" + postdir + "/" + filename,
        });
      });
    });
  });
}

module.exports = {
  save(...filedNames) {
    return async (req, res, next) => {
      let temp = {};
      for (const field of filedNames) {
        const file = req.files[field];
        if (file) {
          try {
            let data = await saveFile(file);
            temp[field] = data;
          } catch (err) {
            res.status(500).send(err);
          }
        }
      }
      req.body = req.body.data
      req.files = temp;
      next();
    };
  },
};
