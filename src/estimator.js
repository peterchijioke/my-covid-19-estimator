const covid19ImpactEstimator = (data) => {
  const input = data;

  const result = {
    data: input, // the input data you got
    impact: {}, // your best case estimation
    severeImpact: {} // your severe case estimation
  };

  // result.impact.currentlyInfected = result.data.reportedCases * 10;

  result.impact.currentlyInfected = result.data.reportedCases * 10;
  result.severeImpact.currentlyInfected = result.data.reportedCases * 50;
  result.impact.infectionsByRequestedTime = Math.trunc(
    result.severeImpact.currentlyInfected * Math.exp(2, 9)
  );
  result.severeImpact.infectionsByRequestedTime = Math.trunc(
    result.severeImpact.currentlyInfected * Math.exp(2, 9)
  );

  // challeng 2 starts

  result.impact.severeCasesByRequestedTime = Math.trunc(
    0.15 * result.impact.infectionsByRequestedTime
  );
  result.severeImpact.severeCasesByRequestedTime = Math.trunc(
    0.15 * result.impact.infectionsByRequestedTime
  );

  const hospitalBed = result.data.totalHospitalBeds;
  const severeCaseImpact = result.impact.severeCasesByRequestedTime;
  const severeCaseSevereImpact = result.impact.severeCasesByRequestedTime;

  result.impact.hospitalBedsByRequestedTime = Math.trunc(
    0.35 * (hospitalBed - severeCaseImpact)
  );
  result.severeImpact.hospitalBedsByRequestedTime = Math.trunc(
    0.35 * (hospitalBed - severeCaseSevereImpact)
  );

  // challenge 3 start
  result.impact.casesForICUByRequestedTime = Math.trunc(
    0.05 * result.impact.infectionsByRequestedTime
  );
  result.severeImpact.casesForICUByRequestedTime = Math.trunc(
    0.05 * result.severeImpact.infectionsByRequestedTime
  );

  result.impact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * result.impact.infectionsByRequestedTime
  );
  result.severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    0.02 * result.severeImpact.infectionsByRequestedTime
  );

  result.impact.dollarsInFlight = Math.trunc(
    (result.impact.infectionsByRequestedTime * (0.65 * 1.5)) / 30
  );

  result.severeImpact.dollarsInFlight = Math.trunc(
    (result.severeImpact.infectionsByRequestedTime * (0.65 * 1.5)) / 30
  );

  return result;
};
// ===========================================end of covid function===========================
function impactInDays(daysData) {
  let DayImpact;

  if (daysData.periodType === 'weeks') {
    DayImpact = daysData.timeToElapse * 7;
  } else if (daysData.periodType === 'month') {
    DayImpact = daysData.timeToElapse * 30;
  } else if (daysData.periodType === 'days') {
    DayImpact = daysData.timeToElapse * 1;
  }

  return Math.trunc(DayImpact / 3);
}

const data = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};
impactInDays(data);
// const output = covid19ImpactEstimator(data);

// app.get('/api/v1/on-covid-19/json', (req, res) => {});

// app.get('/api/v1/on-covid-19/xml', (req, res) => {});

// app.get('/api/v1/on-covid-19/logs', (req, res) => {});
// console.log(output);

export default covid19ImpactEstimator;
