class Hydration {
    constructor(hydrationData, userId) {
      this.currentHydrationData = hydrationData;
      this.userID = userId;
      this.date = hydrationData.date;
      this.numOunces = hydrationData.numOunces;
    }

    calculateAvgDailyAmtDrankByUserIdAllTime(id) {
      let weekHydrationData = this.currentHydrationData.filter(user => {
        return user.userID === id
      });
      let avgOunces = weekHydrationData.reduce((acc, day) => {
        acc += day.numOunces;
        return acc
      }, 0)/weekHydrationData.length;

      return Math.round(avgOunces)
    }

    calculateAmtDrankByUserSpecificDate(id, date) {
      const userOnSpecificDate = this.currentHydrationData.find(user => {
        return (user.userID === id && user.date === date)
      });

      return userOnSpecificDate.numOunces
    }

    returnDrinkAmtEachDayOverWeekByUser(id) {
      let weekHydrationData = this.currentHydrationData.filter(user => {
        return user.userID === id
      });

      let sevenDayData = weekHydrationData.map(day => {
        return day.numOunces
      });
      return sevenDayData.slice(-7)
    }
}

if (typeof module !== 'undefined') {
    module.exports = Hydration;
  };
