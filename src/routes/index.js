const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const Upload = require('../models/Upload');

routes.post('/uploads', multer(multerConfig).single("file"), async (req, res) => {

  const { originalname: name, size, key, location: url = "" } = req.file;

  const upload = await Upload.create({
    name,
    size,
    key,
    url
  });

  return res.json(upload);

});

routes.get('/uploads/:id?', async (req, res) => {

    const idUpload = req.params.id;
    
    const upload = await Upload.findById(idUpload);

    return res.status(200).json(upload);
});

routes.delete('/uploads/:id', async (req, res) => {

    const idUpload = req.params.id;

    const upload = await Upload.findById(idUpload);
    await upload.remove();
    return res.status(200).send("Deletado com sucesso");
});

module.exports = routes;