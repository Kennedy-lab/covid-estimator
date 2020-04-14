const covid19ImpactEstimator = (data) => {
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
  const impactEstimation = () => {
    const currentlyInfected = data.reportedCases * 10;
    const days = duration();
    const factor = 2 ** days;
    const infectionsByRequestedTime = Math.trunc(currentlyInfected * factor);
    const severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByRequestedTime);
    const availableBeds = (35 / 100) * data.totalHospitalBeds;
    const hospitalBedsByRequestedTime = Math.trunc(availableBeds - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByRequestedTime);
    const casesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * infectionsByRequestedTime);
    const expectedAmount = data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD;
    const loss = infectionsByRequestedTime * expectedAmount;
    const dollarsInFlight = Math.trunc(loss * data.timeToElapse);
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
  const severeImpactEstimation = () => {
    const currentlyInfected = data.reportedCases * 50;
    const days = duration();
    const factor = 2 ** days;
    const infectionsByRequestedTime = Math.trunc(currentlyInfected * factor);
    const severeCasesByRequestedTime = Math.trunc((15 / 100) * infectionsByRequestedTime);
    const availableBeds = (35 / 100) * data.totalHospitalBeds;
    const hospitalBedsByRequestedTime = Math.trunc(availableBeds - severeCasesByRequestedTime);
    const casesForICUByRequestedTime = Math.trunc((5 / 100) * infectionsByRequestedTime);
    const casesForVentilatorsByRequestedTime = Math.trunc((2 / 100) * infectionsByRequestedTime);
    const expectedAmount = data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD;
    const loss = infectionsByRequestedTime * expectedAmount;
    const dollarsInFlight = Math.trunc(loss * data.timeToElapse);
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
  const impact = impactEstimation();
  const severeImpact = severeImpactEstimation();
  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
