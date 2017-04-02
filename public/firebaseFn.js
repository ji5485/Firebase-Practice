var selectedKey;

var config = {
  apiKey: "AIzaSyCxT_364wsUH_-trxUIuvZa8bn5cxVsnZY",
  authDomain: "manageassessment-77a67.firebaseapp.com",
  databaseURL: "https://manageassessment-77a67.firebaseio.com/",
  storageBucket: "gs://manageassessment-77a67.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

var dbGet = function(date) {
  var dataRef = database.ref(date + '/');
  $('.planModule').remove();
  dataRef.on('child_added', fnChildAdded);
  dataRef.on('child_removed', fnChildRemoved);
  dataRef.on('child_changed', fnChildChanged);
}

var fnChildAdded = function(data) {
  var key = data.key;
  var information = data.val();
  var name = information.name;
  var subject = information.subject;

  var date = $('#monthYear').text();

  var Module = "<div class='planModule' id='"+key+"'>" +
               "<button onclick=\"dbDelete('" + key + "')\">삭제</button>" +
               "<button onclick=\"popupOn('" + key + "')\">자세히</button>" +
               "<div>" +
               "<span style='overflow-x: hidden' id='Name'>" + name + "</span> <br />" +
               "<span id='Subject'>" + subject + "</span>" +
               "</div>" +
               "</div>";

  $('#monthPlan').append(Module);
}

var fnChildRemoved = function(data) {
  var key = data.key;

  $('#monthPlan > #' + key).remove();
}

var fnChildChanged = function(data) {
  var information = data.val();
  var name = information.name;
  var subject = information.subject;

  $('#Name').text(name);
  $('#Subject').text(subject);
}

var popupOn = function(key) {
  var dataRef = database.ref($('#monthYear').text() + '/' + key)
    .once('value').then(function(snapShot) {
      $('#popupName').text(snapShot.val().name);
      $('#popupPeriod').text(snapShot.val().period);
      $('#popupSubject').text(snapShot.val().subject);
      $('#popupDate').text(snapShot.val().date);
      $('#popupDiscription').text(snapShot.val().discription);
    });

  $('.button').attr("id", key);

  $('#screen').css('display', 'block');
  $('#popup').css('display', 'block');
}

var popupOff = function() {
  $('#screen').css('display', 'none');
  $('#popup').css('display', 'none');
}

var dbDelete = function(key) {
  var date = $('#monthYear').text();
  var dataRef = database.ref(date + "/" + key);

  dataRef.remove();
  $("#" + key).remove();
}

var dbPush = function(jsonF) {
  firebase.database().ref(jsonF.identifying).push(jsonF);
}

var dbUpdate = function(jsonF) {
  firebase.database().ref(jsonF.identifying + '/' + selectedKey).update(jsonF);
}

var modify = function(key) {
  popupOff();

  var dataRef = database.ref($('#monthYear').text() + '/' + key)
    .once('value').then(function(snapShot) {
      $('#Date').val(snapShot.val().date);
      $('#period').val(snapShot.val().period);
      $('#name').val(snapShot.val().name);
      $('#subject').val(snapShot.val().subject);
      $('#discription').val(snapShot.val().discription);
    });

  selectedKey = key;
}

var clearForm = function() {
  $('#Date').val('');
  $('#period').val('');
  $('#name').val('');
  $('#subject').val('');
  $('#discription').val('');

  selectedKey = null;
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
    if (selectedKey) {
      dbUpdate({
        date: date.value,
        period: period.value,
        name: name.value,
        subject: subject.value,
        discription: discription.value,
        identifying: monthYear.innerHTML
      });
    }
    else {
      dbPush({
        date: date.value,
        period: period.value,
        name: name.value,
        subject: subject.value,
        discription: discription.value,
        identifying: monthYear.innerHTML
      });
    }
  }

  clearForm();
};
