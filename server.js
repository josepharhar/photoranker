const fs = require('fs');

const express = require('express');
const reactViews = require('express-react-views');
const morgan = require('morgan');

const server = express();

server.set('view engine', 'jsx');
server.use(morgan('dev'));
server.engine('jsx', reactViews.createEngine());
server.use('/static', express.static('static'));
server.use('/images', express.static('images'));

server.get('/', async (req, res) => {
  res.render('Main', {filenames: await readList()});
});

async function handleUpDown(upOrDown, req, res) {
  try {
    const rankingList = await readList();
    const targetFilename = req.params.filename;
    const targetIndex = rankingList.indexOf(targetFilename);
    console.log('  targetFilename: ' + targetFilename);
    console.log('  targetIndex: ' + targetIndex);

    if (targetIndex < 0) {
      throw new Error('targetIndex < 0 for targetFilename: ' + targetFilename);
    }

    if (upOrDown === 'up') {
      if (targetIndex === 0) {
        // overflow
      } else {
        rankingList[targetIndex] = rankingList[targetIndex - 1];
        rankingList[targetIndex - 1] = targetFilename;
      }
    } else {
      if (targetIndex === rankingList.length - 1) {
        // underflow
      } else {
        rankingList[targetIndex] = rankingList[targetIndex + 1];
        rankingList[targetIndex + 1] = targetFilename;
      }
    }

    await writeList(rankingList);

    res.writeHead(303, {
      'content-type': 'text/plain',
      location: '/'
    });
    res.end('successful /' + upOrDown);

  } catch (error) {
    res.writeHead(500, {'content-type': 'text/plain'});
    res.end('server error:\n\n' + error);
  }
}
server.post('/up/:filename', (req, res) => handleUpDown('up', req, res));
server.post('/down/:filename', (req, res) => handleUpDown('down', req, res));

server.listen(8000);

const rankingsFilepath = 'rankings.json';

async function writeList(list) {
  return new Promise((resolve, reject) => {
    fs.writeFile(rankingsFilepath, JSON.stringify(list, null, 2), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function readList() {
  return new Promise(async (resolve, reject) => {
    const imageFilenamesOnDisk = await readImageFilenames();
    const imageFilenamesInRankFile = await new Promise((resolve, reject) => {
      fs.readFile(rankingsFilepath, (err, data) => {
        if (err) {
          if (err.code == 'ENOENT') {
            resolve([]);
          } else {
            reject(err);
          }
        } else {
          try {
            const arrayObj = JSON.parse(data);
            resolve(arrayObj);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

    // remove deleted filenames from the ranking list
    for (const imageFilenameInRankFile of imageFilenamesInRankFile) {
      const indexOnDisk = imageFilenamesOnDisk.indexOf(imageFilenameInRankFile);
      if (indexOnDisk < 0) {
        const indexInRankFile = imageFilenamesInRankFile.indexOf(imageFilenameInRankFile);
        imageFilenamesInRankFile.splice(indexInRankFile, 1);
      }
    }

    // append any new filenames to the ranking list
    for (const imageFilenameOnDisk of imageFilenamesOnDisk) {
      const indexOnDisk = imageFilenamesInRankFile.indexOf(imageFilenameOnDisk);
      if (indexOnDisk < 0) {
        imageFilenamesInRankFile.push(imageFilenameOnDisk);
      }
    }

    resolve(imageFilenamesInRankFile);
  });
}

async function readImageFilenames() {
  return (await readImagesDir()).map(dirent => dirent.name);
}

async function readImagesDir() {
  return new Promise((resolve, reject) => {
    fs.readdir('images', {withFileTypes: true}, (err, files) => {
      if (err)
        reject(err);
      else
        resolve(files);
    })
  });
}
