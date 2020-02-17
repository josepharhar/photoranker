const fs = require('fs');

const express = require('express');
const reactViews = require('express-react-views');

const server = express();
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

  let output = 'files:';
  for (const dirent of pictureDirents) {
    if (dirent.isFile())
      output += '\n' + dirent.name;
  }

  res.writeHead(200, {'content-type': 'text/html'});
  res.end(output);
});

server.listen(8000);
