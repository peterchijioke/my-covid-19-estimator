import express from 'express';
import jsontoxml from 'jsontoxml';
import data from './src/estimator';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/on-covid-19', (req, res) => {
  res.status(200).json(data);
});
app.post(' /api/v1/on-covid-19/:fileType', (req, res) => {
  const file = req.params.fileType;
  // const outcome = data.impactInDays;

  // // if (file === 'xml') {
  // //   res.setHeader('Content-Type', 'application/xml');
  // //   const outcomeXML = jsontoxml({ root: outcome });
  // //   return res.status(200).send(outcomeXML);
  // // }
  // res.send(200, outcome);

  res.send(`peter ${file}`);
});

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
