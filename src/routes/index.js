const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const Upload = require('../models/Upload');

routes.post('/uploads', multer(multerConfig).single('file'), async (req, res) => {
    
    const { originalname: name, size, filename: key, destination: url } = req.file;

    const upload = await Upload.create({
        name,
        size,
        key,
        url,
    })
    return res.json(upload);
});

routes.get('/uploads/:id?', async (req, res) => {

    const idUpload = req.params.id;

    let whereClause = {}
    if(idUpload) {
        whereClause = { _id: idUpload }
    }

    const uploads = await Upload.find(whereClause);

    return res.json(uploads);
});

routes.delete('/uploads/:id', async (req, res) => {
    
    const upload = await Upload.findById(req.params.id);
    await upload.remove();
    return res.send();
});

module.exports = routes;