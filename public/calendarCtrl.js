var plan = [];
var fullDate;

window.onload = function() {
  calendarSet();
  planArea();
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

  // 전달
  if (currentMonth === 1) var prevDate = [currentYear - 1, 12, currentDay];
  else var prevDate = [currentYear, currentMonth - 1, currentDay];

  // 다음달
  if (currentMonth === 12) var nextDate = [currentYear + 1, 1, currentDay];
  else var nextDate = [currentYear, currentMonth + 1, currentDay];

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

  planArea();
};

var transfer = function(date) {
  var inputDate = document.getElementById("Date");
  date = date.split(",");
  date = date[0] + "년 " + date[1] + "월 " + date[2] + "일";
  inputDate.value = date;
};

var clearForm = function() {
  var date = document.getElementById('Date');
  var period = document.getElementById('period');
  var name = document.getElementById('name');
  var subject = document.getElementById('subject');
  var discription = document.getElementById('discription');

  date.value = "";
  period.value = "";
  name.value = "";
  subject.value = "";
  discription.value = "";
};

var submitForm = function() {
  var date = document.getElementById("Date");
  var period = document.getElementById("period");
  var name = document.getElementById("name");
  var subject = document.getElementById("subject");
  var discription = document.getElementById("discription");
  var monthYear = document.getElementById("monthYear");

  if (date.value == "" || name.value == "" || subject.value == "" || discription.value == "") {
    if (date.value == "") {
      var dateScript = document.getElementById('dateScript');
      dateScript.innerHTML = "입력되지 않았습니다.";
      setTimeout(function() {dateScript.innerHTML = ""}, 2000);
    }
    if (name.value == "") {
      var nameScript = document.getElementById('nameScript');
      nameScript.innerHTML = "입력되지 않았습니다.";
      setTimeout(function() {nameScript.innerHTML = ""}, 2000);
    }
    if (subject.value == "") {
      var subjectScript = document.getElementById('subjectScript');
      subjectScript.innerHTML = "선택되지 않았습니다.";
      setTimeout(function() {subjectScript.innerHTML = ""}, 2000);
    }
    if (discription.value == "") {
      var discriptionScript = document.getElementById('discriptionScript');
      discriptionScript.innerHTML = "입력되지 않았습니다.";
      setTimeout(function() {discriptionScript.innerHTML = ""}, 2000);
    }
  }
  else {
    plan.push({
      date: date.value,
      period: period.value,
      name: name.value,
      subject: subject.value,
      discription: discription.value,
      identifying: monthYear.innerHTML
    });
    clearForm();
    planArea();
  }
};

var planArea = function() {
  var monthPlan = document.getElementById('monthPlan');
  var Module = "";

  for (var i=0;i<plan.length;i++) {
    if (plan[i].identifying == fullDate) {
      Module += '<div class="planModule">';
      Module += '<button onclick="deleteModule('+i+')">삭제</button>'
      Module += '<button onclick="popupOn('+i+')">자세히</button>'
      Module += '<div>'
      Module += '<span>'+plan[i].name+'</span> <br />';
      Module += '<span>'+plan[i].subject+'</span>';
      Module += '</div>'
      Module += '</div>';
    }
  }
  monthPlan.innerHTML = Module;
}

var deleteModule = function(value) {
  plan.splice(value, 1);
  planArea();
}

var popupOn = function(value) {
  var popupName = document.getElementById('popupName');
  var popupPeriod = document.getElementById('popupPeriod');
  var popupSubject = document.getElementById('popupSubject');
  var popupDate = document.getElementById('popupDate');
  var popupDiscription = document.getElementById('popupDiscription');

  popupName.innerHTML = plan[value].name;
  popupPeriod.innerHTML = plan[value].period;
  popupSubject.innerHTML = plan[value].subject;
  popupDate.innerHTML = plan[value].date;
  popupDiscription.innerHTML = plan[value].discription;

  var Screen = document.getElementById('screen');
  Screen.style.display = "block";
  var Popup = document.getElementById('popup');
  Popup.style.display = "block";
}

var popupOff = function() {
  var Screen = document.getElementById('screen');
  Screen.style.display = "none";
  var Popup = document.getElementById('popup');
  Popup.style.display = "none";
}

var modify = function() {
  popupOff();

  var popupName = document.getElementById('popupName');
  var popupSubject = document.getElementById('popupSubject');
  var popupDate = document.getElementById('popupDate');
  var popupDiscription = document.getElementById('popupDiscription');
  var Value = "";

  for (var i=0;i<plan.length;i++) {
    if (popupName.innerHTML == plan[i].name || popupSubject.innerHTML == plan[i].subject ||
        popupDate.innerHTML == plan[i].date || popupDiscription.innerHTML == plan[i].discription) {
      var Value = i;
      break;
    }
    else continue;
  }

  var date = document.getElementById("Date");
  var period = document.getElementById("period");
  var name = document.getElementById("name");
  var subject = document.getElementById("subject");
  var discription = document.getElementById("discription");

  date.value = plan[Value].date;
  period.value = plan[Value].period;
  name.value = plan[Value].name;
  subject.value = plan[Value].subject;
  discription.value = plan[Value].discription;

  deleteModule(Value);
};
