$(document).ready(() => {
    currentDate = "2019/09/16"
    const userRepository = new UserRepository(userData);
    const randomId = Math.ceil(Math.random() * 50 - 1 + 1);
    userRepository.returnCurrentUser(randomId)
    const currentPerson = userRepository.currentUser
    const currentPersonFriends = userRepository.returnCurrentUserFriends()
    const user = new User(currentPerson);
    const firstName = currentPerson.name.split(' ');
    const hydration = new Hydration(hydrationData, currentPerson.id);
    hydration.findCurrentUserHydrationData()
    const sleep = new Sleep(sleepData, currentPerson.id, userData)
    sleep.findCurrentUserSleepData()
    const activity = new Activity(activityData, currentPerson.id, userData)
    activity.findCurrentUserActivityData()
    const friend1EntireData = activity.findFriend1ActivityData(currentPersonFriends);
    const friend2EntireData = activity.findFriend2ActivityData(currentPersonFriends);
    const friend3EntireData = activity.findFriend3ActivityData(currentPersonFriends);
    const friend1WeekData = activity.friendsStepCountForWeek()
    const friend1Data = userData.find(user => {
        return friend1EntireData[0].userID === user.id
    })
    const friend2Data = userData.find(user => {
        return friend2EntireData[1].userID === user.id
    })
    const friend1Name = friend1Data.name;
    const friend2Name = friend2Data.name;
    const friend2WeekData = activity.friend2StepCountForWeek()
    const userStepCountDataForWeek = activity.userStepCountForWeek()
    const highestWeekStepsDisplay = activity.findHighestStepCount()
    activity.findDateClimbedOver50Stairs()
    activity.increasedSteps3OrMoreDays()


    $('.date').text(currentDate);
    $('.welcome-user').text(firstName[0]);
    $('.profile-name').text(currentPerson.name);
    $('.profile-address').text(currentPerson.address);
    $('.profile-email').text(currentPerson.email);
    $('.average-stepGoal').text(`Your Daily Step Goal: ${currentPerson.dailyStepGoal} (Average All Users: ${userRepository.calculateAvgStepGoalAllUsers()})`);
    $('.hydration1').text(`Your water intake for the day has been: ${hydration.calculateAmtDrankByUserSpecificDate(currentDate)} oz`);
    $('.hydration2').text(`Your water intake over each day of the last week: ${hydration.returnDrinkAmtEachDayOverWeekByUser().join(', ')} (oz)`);
    $('.hydration3').text(`Your average daily water intake: ${hydration.calculateAvgDailyAmtDrankByUserIdAllTime()} (oz)`);
    $('.sleep1').text(`Time spent sleeping for each night of the past week: ${sleep.calculateHoursSleptEachDayByUserOverSpecificWeek().join(', ')} (hours)`);
    $('.sleep2').text(`Your hours slept for the past day: ${sleep.returnHoursSleptByUserOnSpecificDate(currentDate)}`);
    $('.sleep3').text(`Your sleep quality today: ${sleep.returnSleepQualityByUserOnSpecificDate(currentDate)}`);
    $('.sleep4').text(`Your sleep quality over each night of the last week: ${sleep.calculateEachDaysSleepQualityForUserOverSpecificWeek().join(', ')} (hours)`);
    $('.sleep5').text(`Your average sleep quality: ${sleep.calculateAvgSleepQualityPerDayByUser()}`);
    $('.sleep6').text(`Your average hours of sleep per night: ${sleep.calculateAvgHoursSleptPerDayByUser()}`);
    $('.activity1').text(`Your number of steps traveled for the latest day: ${activity.returnNumberOfStepsForUserOnSpecificDate(currentDate)}`);
    $('.activity2').text(`The average number of steps completed by other users on the same date: ${activity.calculateAvgStepsTakenOnSpecificDateAllUsers(currentDate)}`);
    $('.activity3').text(`Your total activity for the latest day: ${activity.returnMinutesActiveByUserOnSpecificDate(currentDate)} minutes`);
    $('.activity4').text(`The average activity for other users on the same date: ${activity.calculateAvgMinutesActiveOnSpecificDateAllUsers(currentDate)} minutes`);
    $('.activity5').text(`Your total flights of stairs climbed for the latest day: ${activity.returnNumberOfStairsClimbedForUserOnSpecificDate(currentDate)}`);
    $('.activity6').text(`The average number of flights of stairs climbed for other users on the same date: ${activity.calculateAvgStairsClimbedOnSpecificDateAllUsers(currentDate)}`);
    $('.activity7').text(`Your total distance walked based on your stepcount for the latest day: ${activity.calculateMilesUserWalkedOnSpecificDate(currentDate)} miles`);
    $('.activity8').text(`Over the last week, you have averaged ${activity.calculateAvgMinutesActiveForUserOnSpecificWeek()} minutes of activity, ${activity.calculateAvgFlightsOfStairsClimbedForUserOnSpecificWeek()} flights of stairs, and ${activity.calculateAvgStepsTakenByUserOnSpecificWeek()} steps.`);
    $('.activity9').text(activity.findDateClimbedOver50Stairs());
    $('.activity10').text(`Dates where you had increasing steps for 3+ consecutive days: ${activity.increasedSteps3OrMoreDays().join(', ')}`);


    $('.friend1').text(`${friend1Name} took ${friend1WeekData} steps this week!`)
    $('.friend2').text(`${friend2Name} took ${friend2WeekData} steps this week!`)
    $(".currentUserActivity").text(`You took ${userStepCountDataForWeek} steps this week!`)
    $(".winnerActivity").text(highestWeekStepsDisplay)
    $(".best-sleepers").text(`Best sleepers (past week): ${sleep.findUsersWithAvgSleepQualityMoreThanThreeOverSpecificWeek(currentDate).join(', ')}`)

    $(".sleep-btn").on('click', function () {
        $(".sleep-container").toggle()
        $(".hydration-container").hide()
        $(".activity-container").hide()
        $(".friends-container").hide()
    });
    $(".hydration-btn").on('click', function() {
        $(".hydration-container").toggle()
        $(".activity-container").hide()
        $(".sleep-container").hide()
        $(".friends-container").hide()
    });
    $(".activity-btn").on('click', function() {
        $(".activity-container").toggle()
        $(".hydration-container").hide()
        $(".sleep-container").hide()
        $(".friends-container").hide()
    });
    $(".profile-btn").on('click', function () {
        $(".profile-container").toggle()
    });
    $(".friends-btn").on('click', function () {
        $(".friends-container").toggle()
        $(".hydration-container").hide()
        $(".activity-container").hide()
        $(".sleep-container").hide()
    });
});
