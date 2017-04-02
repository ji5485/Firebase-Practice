var plan = [];
var fullDate;

window.onload = function() {
  calendarSet();
}

var calendarSet = function(date) {
  if (typeof(date) !== 'undefined') {
    date = date.split(",");
    var date = new Date(date[0], date[1] - 1, date[2]);
  }
  else var date = new Date();

  var calendar = '';

  var currentYear = date.getFullYear();
  var currentMonth = date.getMonth() + 1;
  var currentDay = date.getDate();
  var currentWeek = date.getDay();

  // 10월 이하인 달 앞에 "0" 추가
  if (currentMonth < 10) var currentFullMonth = "0" + currentMonth;
  else currentFullMonth = currentMonth;

  var currentFullDate = currentYear + "년 " + currentMonth + "월";
  dbGet(currentFullDate);

  // 전달
  if (currentMonth === 1) {
    var prevDate = [currentYear - 1, 12, currentDay];
    var prevFullDate = (currentYear - 1) + "년 12월";
  }
  else {
    var prevDate = [currentYear, currentMonth - 1, currentDay];
    var prevFullDate = currentYear + "년 " + (currentMonth - 1) + "월";
  }

  // 다음달
  if (currentMonth === 12) {
    var nextDate = [currentYear + 1, 1, currentDay];
    var nextFullDate = (currentYear + 1) + "년 1월";
  }
  else {
    var nextDate = [currentYear, currentMonth + 1, currentDay];
    var nextFullDate = currentYear + "년 " + (currentMonth + 1) + "월";
  }

  fullDate = currentYear + "년 " + currentMonth + "월"
  var today = '<span><a href="#" class="glyphicon glyphicon-menu-left" onClick="calendarSet(\''+prevDate+'\')"></a> </span><span ng-model="days">'
              + fullDate + '</span><span> <a href="#" class="glyphicon glyphicon-menu-right" onClick="calendarSet(\''+nextDate+'\')"></a></span>';

  var weekList = ['Sun', 'Mon', 'Tue', 'Wed', 'Tur', 'Fri', 'Sat'];
  var dateNumber = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((currentYear % 4 == 0 && currentYear % 100 != 0) || currentYear % 400 == 0) dateNumber[1] = 29;

  date.setDate(1);
  var firstDay = date.getDay();

  var day = 1;  var date = 1;

  // 날짜 넣는 반복문
  for (var i=1; i<=6; i++) {
    calendar += "<tr>";
    for (var j=1;j<=7;j++) {
      if (day <= firstDay || firstDay + dateNumber[currentMonth - 1] < day) calendar += '<td></td>';
      else calendar += '<td class="'+weekList[j-1]+' selector" onclick="transfer(\''+[currentYear, currentMonth, date]+'\')">'+(date++)+'</td>';
      day++;
    }
    calendar += "</tr>";
  }

  var htmlCalendar = document.getElementById('calendarBody');
  var calendarHead = document.getElementById('TodayDate');
  var monthYear = document.getElementById('monthYear');
  htmlCalendar.innerHTML = calendar;
  calendarHead.innerHTML = today;
  monthYear.innerHTML = fullDate;
};

var transfer = function(date) {
  var inputDate = document.getElementById("Date");
  date = date.split(",");
  date = date[0] + "년 " + date[1] + "월 " + date[2] + "일";
  inputDate.value = date;
};
