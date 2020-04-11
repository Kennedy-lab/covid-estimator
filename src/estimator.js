const inputData = {
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
const covid19ImpactEstimator = () => {
  const impact = () => {
    const { reportedCases } = inputData;
    const currentlyInfected = reportedCases * 10;
    const duration = () => {
      let numberOfThreeDayPeriods;
      let durationInDays;
      let durationInWeeks;
      let durationInMonths;
      if (durationInDays) {
        numberOfThreeDayPeriods = Math.trunc(durationInDays / 3);
      } else if (durationInWeeks) {
        numberOfThreeDayPeriods = Math.trunc((durationInWeeks * 7) / 3);
      } else {
        numberOfThreeDayPeriods = Math.trunc((durationInMonths * 30) / 3);
      }
      return numberOfThreeDayPeriods;
    };
    const infectionsByRequestedTime = currentlyInfected * (2 ** duration);
    const severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByRequestedTime);
    const { totalHospitalBeds } = inputData;
    const availableBeds = Math.trunc((35 / 100) * totalHospitalBeds);
    const hospitalBedsByRequestedTime = availableBeds - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByRequestedTime);
    const casesForVentilatorsByRequestedTime = (2 / 100) * infectionsByRequestedTime;
    const { avgDailyIncomePopulation } = inputData;
    const { avgDailyIncomeInUSD } = inputData;
    const loss = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const dollarsInFlight = Math.trunc(loss / duration);
    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };
  const severeImpact = () => {
    const { reportedCases } = inputData;
    const currentlyInfected = reportedCases * 50;
    const duration = () => {
      let numberOfThreeDayPeriods;
      let durationInDays;
      let durationInWeeks;
      let durationInMonths;
      if (durationInDays) {
        numberOfThreeDayPeriods = Math.trunc(durationInDays / 3);
      } else if (durationInWeeks) {
        numberOfThreeDayPeriods = Math.trunc((durationInWeeks * 7) / 3);
      } else {
        numberOfThreeDayPeriods = Math.trunc((durationInMonths * 30) / 3);
      }
      return numberOfThreeDayPeriods;
    };
    const infectionsByRequestedTime = currentlyInfected * (2 ** duration);
    const severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByRequestedTime);
    const { totalHospitalBeds } = inputData;
    const availableBeds = Math.trunc((35 / 100) * totalHospitalBeds);
    const hospitalBedsByRequestedTime = availableBeds - severeCasesByRequestedTime;
    const casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByRequestedTime);
    const casesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * infectionsByRequestedTime);
    const { avgDailyIncomePopulation } = inputData;
    const { avgDailyIncomeInUSD } = inputData;
    const loss = infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD;
    const dollarsInFlight = Math.trunc(loss / duration);
    return {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  };
  return ({
    inputData,
    impact,
    severeImpact
  });
};
export default covid19ImpactEstimator;
