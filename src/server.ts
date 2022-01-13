import express from 'express';
import { Campsite } from './models';
import cors from 'cors';

const app = express();
app.set('port', process.env.PORT || 3001);

// CORS Configuration
const options: cors.CorsOptions = {
  origin: ['http://localhost:3000']
};
app.use(cors(options));

const campsites:Campsite[] = [
  {title: "Big Pool", location: {lat: 40.285032, long: -105.759724}, datesAvailable: [], elevation: "9,160 ft", detailsLink: "https://www.nps.gov/romo/planyourvisit/upload/072-Big-Pool-2017-2.pdf"},
  {title: "North Inlet Falls", location: {lat: 40.278834, long: -105.720641}, datesAvailable: [], elevation: "9,540 ft", detailsLink: "https://www.nps.gov/romo/planyourvisit/upload/079-North-Inlet-Falls-2021-1.pdf"}
];

app.get('/api/v1/campsites', (_request, response) => {
  response.status(200).json(campsites);
});

app.listen(app.get('port'), () => {
  console.log(`Compsite Planner backend running on http://localhost:${app.get('port')}`);
});
