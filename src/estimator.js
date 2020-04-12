/* eslint-disable no-unused-vars */
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
const duration = () => {
  let numberOfThreeDayPeriods;
  if (data.periodType === 'days') {
    numberOfThreeDayPeriods = Math.trunc(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    numberOfThreeDayPeriods = Math.trunc((data.timeToElapse * 7) / 3);
  } else if (data.periodType === 'months') {
    numberOfThreeDayPeriods = Math.trunc((data.timeToElapse * 30) / 3);
  }
  return numberOfThreeDayPeriods;
};
const impact = () => {
  const currentlyInfected = data.reportedCases * 10;
  const days = duration();
  const factor = 2 ** days;
  const infectionsByRequestedTime = currentlyInfected * factor;
  const severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByRequestedTime);
  const availableBeds = Math.trunc((35 / 100) * data.totalHospitalBeds);
  const hospitalBedsByRequestedTime = availableBeds - severeCasesByRequestedTime;
  const casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = (2 / 100) * infectionsByRequestedTime;
  const expectedAmount = data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD;
  const loss = infectionsByRequestedTime * expectedAmount;
  const dollarsInFlight = Math.trunc(loss / days);
};
const severeImpact = () => {
  const currentlyInfected = data.reportedCases * 50;
  const days = duration();
  const factor = 2 ** days;
  const infectionsByRequestedTime = currentlyInfected * factor;
  const severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByRequestedTime);
  const availableBeds = Math.trunc((35 / 100) * data.totalHospitalBeds);
  const hospitalBedsByRequestedTime = availableBeds - severeCasesByRequestedTime;
  const casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * infectionsByRequestedTime);
  const expectedAmount = data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD;
  const loss = infectionsByRequestedTime * expectedAmount;
  const dollarsInFlight = Math.trunc(loss / days);
};
const impactEstimation = impact();
const severeImpactEstimation = severeImpact();
const covid19ImpactEstimator = () => ({
  data,
  impactEstimation,
  severeImpactEstimation
});
export default covid19ImpactEstimator;
