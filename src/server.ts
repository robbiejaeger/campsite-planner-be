import express from 'express';
import { Campsite } from './models';

const app = express();
app.set('port', process.env.PORT || 3001);

const campsites:Campsite[] = [
  {title: "Big Pool", location: {lat: 40.2744767, long: -105.7643305}, datesAvailable: [], elevation: "9,160 ft", detailsLink: "https://www.nps.gov/romo/planyourvisit/upload/072-Big-Pool-2017-2.pdf"},
  {title: "North Inlet Falls", location: {lat: 40.269919, long: -105.7248948}, datesAvailable: [], elevation: "9,540 ft", detailsLink: "https://www.nps.gov/romo/planyourvisit/upload/079-North-Inlet-Falls-2021-1.pdf"}
];

app.get('/api/v1/campsites', (_request, response) => {
  response.status(200).json(campsites);
});

app.listen(app.get('port'), () => {
  console.log(`Compsite Planner backend running on http://localhost:${app.get('port')}`);
});
