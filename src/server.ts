import express from 'express';

const app = express();
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), () => {
  console.log(`Compsite Planner backend running on http://localhost:${app.get('port')}`);
});
