var express = require('express');
var multer = require('multer');

var router = express.Router();

/* GET home page. */


router.get('/getData/:time', function (req, res, next) {

  setTimeout(() => {
    res.send({ success: true, data: 'done' });
  }, req.params.time);

});

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

/** API path that will upload the files */
router.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    console.log(req.file);
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    res.json({ error_code: 0, err_desc: null });
  });
});


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
