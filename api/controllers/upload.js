const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = (req, res) => {
  const file = req.files.image;
  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'something broke' });
    }

    // create a new media object
    // save result.secure_url to that object

    // associate that new object with any albums arriving on the body,
    // where the currentUser is an owner or collaborator on that album

    res.status(201).json({
      success: true,
      result
    });
  });
};