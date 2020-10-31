const express = require('express');
const fs = require('fs');
const Task = require('../../lib/structures/Task');
const {add, compose, log, head, split, map} = require('../../lib/utils');

const app = express();

const readFile = fileName => new Task((reject, result) => {
  fs.readFile(
    fileName,
    { encoding: 'utf-8' },
    (err, data) => (err ? reject(err) : result(data))
  );
});

const getDingoes = compose(readFile, add(__dirname));

app
  .get('/', (req, res) => res.json('Rubber baby buggy bumpers'))
  .get('/dingoes', (req, res) => getDingoes('/files/dingoes.json')
    .fork(
      error => res.json(error),
      file => res.json(file)
    ));

app.listen(5000, () => console.log('server running'));
