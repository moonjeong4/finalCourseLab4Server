const router = require("express").Router();
const axios = require("axios");
const cors = require("cors");

router.use(cors());

/* GET home page. */
router.get("/", async function (req, res, next) {
  // https://api.ipgeolocation.io/ipgeo?apiKey=cd6d9b2cc9a94dcbbbc891c56d26e49c&ip=
  // let remote = req.socket.remoteAddress;
  let remote = "206.167.123.9";
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=93d9a54103e64f7daef69652be148b8e&ip=${remote}`;
  let fetch = await axios.get(url);

  let lat = fetch.data.latitude;
  let lng = fetch.data.longitude;
  // console.log(fetch.data);
  res.json({ lat: lat, lng: lng });
});

router.get("/hydrants", async function (req, res, next) {
  let url = `https://www.gatineau.ca/upload/donneesouvertes/BORNE_FONTAINE.json`;
  let fetch = await axios.get(url);

  const mapData = fetch.data.features;

  let outData = [];

  let outCount = mapData.length > 10 ? 10 : mapData.length;

  for (let i = 0; i < outCount; i++) {
    const out = {
      lat: mapData[i].geometry.coordinates[1],
      lng: mapData[i].geometry.coordinates[0],
      setId: i,
      spec: mapData[i].properties.SPECIFIQUE,
    };

    outData.push(out);
  }

  res.json(outData);
});

module.exports = router;
