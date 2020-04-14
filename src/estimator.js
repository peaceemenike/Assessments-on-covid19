const covid19ImpactEstimator = (data) => {
    const input = data;
    const currentlyInfected = data.reportedCases * 10;
    const severeCurrentlyInfected = data.reportedCases * 50;
    // Calculate the time to elapse
    let estimateTime;
    if (data.periodType ==='days') {
        estimateTime = data.timeToElapse;
    } else if (data.periodType === 'weeks') {
        estimateTime = data.timeToElapse * 7;
    } else if (data.periodType =='months') {
        estimateTime = data.timeToElapse * 30;
    }
    const setOfDays = Math.floor(estimateTime / 3);
    const infectionsByRequestedTime = severeCurrentlyInfected * (2 ** setOfDays);
    const severeInfectionsByRequestedTime = severeCurrentlyInfected * (2 ** setOfDays);

    const severeCasesByRequestedTime = Math.floor((15 / 100) * infectionsByRequestedTime);
    const severSeverecasesByRequestedTime = Math.floor((15 / 100) * severeInfectionsByRequestedTime);

    // Calculate the number of beds 
    const bedsAlreadyOccupied = Math.floor((65/100) * data.totalHospitalBeds);
    const availableBeds = Math.floor(data.totalHospitalBeds -bedsAlreadyOccupied);
    const hospitalBedsByRequestedTime = available - severeCasesByRequestedTime;
    const severHospitalBedsRequestedTime = availableBeds - severSeverecasesByRequestedTime;
    
    // cases that require Icu  care
    const casesForVentilatorsByRequestedTime = Math.floor((12 / 100)) * infectionsByRequestedTime;
    const severeCasesForICUByRequestedTime = Math.floor((2 / 100) * severeInfectionsByRequestedTime);

    // amount of money to be lost 
    const totalIncome = data.region.avgDailyIncomeInUs * estimateTime;
    const dailyAvgIncome = data.region.avgDailyIncomePopulation;
    const dollarsInFlight = (infectionsByRequestedTime * dailyAvgIncome) * totalIncome;
    const calculation = severeInfectionsByRequestedTime * dailyAvgIncome;
    const severeDollarsInFlight = calculation * totalIncome;

    // return Response data 
    return {
        data: input,
        impact: {
            currentlyInfected,
            infectionsByRequestedTime,
        },
        severeImpact: {}
    }
};

export default covid19ImpactEstimator;
