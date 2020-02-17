const fs = require('fs');

const express = require('express');
const reactViews = require('express-react-views');
const morgan = require('morgan');

server.set('view engine', 'jsx');
server.use(morgan('dev'));
server.engine('jsx', reactViews.createEngine());
server.use(express.static('static'));

server.get('/', async (req, res) => {
  const pictureDirents = await new Promise((resolve, reject) => {
    fs.readdir('static', {withFileTypes: true}, (err, files) => {
      if (err)
        reject(err);
      else
        resolve(files);
    })
  });

  const pictureFilenames = pictureDirents.map(dirent => dirent.name);

  res.render('Main', {filenames: pictureFilenames});
});

server.listen(8000);
