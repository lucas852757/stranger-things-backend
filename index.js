const express = require('express');
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);
const port = process.env.PORT;
app.use(cors());

/* source: https://www.samanthaming.com/tidbits/19-2-ways-to-convert-to-boolean/ */

// const hereIsTheUpsideDown = true;
let hereIsTheUpsideDown;
const vlBolean = process.env.UPSIDEDOWN_MODE;
if (vlBolean === 'true') {
  hereIsTheUpsideDown = true;
}
if (vlBolean === 'false') {
  hereIsTheUpsideDown = false;
}

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(/* 3000 */ port, () => {
  console.log('Escutando na porta 3000');
});
