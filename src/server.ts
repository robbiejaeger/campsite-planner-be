import express from 'express';
import { Campsite } from './models';
import cors from 'cors';
import { readFile } from 'fs/promises';

const app = express();
app.set('port', process.env.PORT || 3001);

// CORS Configuration
const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};
app.use(cors(options));

// Parse campsites data file
let campsites:Campsite[] = [];

readFile('./raw_data/Backcountry_Campsites_for_2017.geojson', {encoding: 'utf-8'})
  .then(fileContents => {
    const rawSites = JSON.parse(fileContents).features as any[];
    campsites = rawSites.map(rawSite => {
      const siteProperties = rawSite.properties;
      const groupSiteBoolean = siteProperties.GroupSite === "Yes" ? true : false;
      return {
        title: siteProperties.Campsite,
        groupSite: groupSiteBoolean,
        location: {lat: siteProperties.WGS84_LAT_DD ,long: siteProperties.WGS84_LON_DD},
        datesAvailable: []
      };
    })
  })
  .catch(err => console.error('Error reading campsites data file:', err));

app.get('/api/v1/campsites', (_request, response) => {
  response.status(200).json(campsites);
});

app.listen(app.get('port'), () => {
  console.log(`Compsite Planner backend running on http://localhost:${app.get('port')}`);
});
