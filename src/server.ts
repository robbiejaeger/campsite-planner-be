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

function isDuplicate(uniqueCampsites:Campsite[], rawSite:any) {
  return uniqueCampsites.find(campsite => {
    return campsite.title === rawSite.properties.Campsite;
  });
}

readFile('./raw_data/Backcountry_Campsites_for_2017.geojson', {encoding: 'utf-8'})
  .then(fileContents => {
    const rawSites = JSON.parse(fileContents).features as any[];

    // iterate over the raw campsite data
    campsites = rawSites.reduce((uniqueCampsites, rawSite) => {
      if (!isDuplicate(uniqueCampsites, rawSite)) {
        const siteProperties = rawSite.properties;
        const groupSiteBoolean = siteProperties.GroupSite === "Yes" ? true : false;

        uniqueCampsites.push({
          title: siteProperties.Campsite,
          groupSite: groupSiteBoolean,
          location: {lat: siteProperties.WGS84_LAT_DD ,long: siteProperties.WGS84_LON_DD},
          datesAvailable: []
        });
      }
      return uniqueCampsites;
    }, []);
  })
  .catch(err => console.error('Error reading campsites data file:', err));

app.get('/api/v1/campsites', (_request, response) => {
  response.status(200).json(campsites);
});

app.listen(app.get('port'), () => {
  console.log(`Compsite Planner backend running on http://localhost:${app.get('port')}`);
});
