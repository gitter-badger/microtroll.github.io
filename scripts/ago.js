// experimental

function ago(dateString) {
  'use strict';

  var from = new Date(dateString);
  var to = new Date();
  var months = to.getMonth() - from.getMonth();
  var years = to.getFullYear() - from.getFullYear();
  var days = to.getDate() - from.getDate();
  var monthOverFlow = 0;
  var lastDayOfMonth = new Date(to.getFullYear(), to.getMonth() + 1, 0, 23, 59, 59);
  var l = new Date(to.getFullYear(), to.getMonth(), 0);
  var l1 = new Date(from.getFullYear(), from.getMonth() + 1, 0);

  months = (to.getMonth() + 12 * to.getFullYear()) - (from.getMonth() + 12 * from.getFullYear());

  if (months - (years * 12) < 0) {
    monthOverFlow = -1;
  } else {
    monthOverFlow = 1;
  }

  if (monthOverFlow < 0) {
    years = years - 1;
  }

  months = months - (years * 12);
  lastDayOfMonth = lastDayOfMonth.getDate();

  if (monthOverFlow < 0 && (from.getDate() > to.getDate())) {
    Days = lastDayOfMonth + (to.getDate() - from.getDate()) - 1;
  } else {
    days = to.getDate() - from.getDate();
  }

  if (days < 0) {
    months = months - 1;
  }

  if (days < 0) {
    if (l1 > l) {
      days = l1.getDate() + days;
    } else {
      days = l.getDate() + days;
    }
  }

  var yearText = years + ' year';
  var monthText = months + ' month';
  var dayText = days + ' day';

  if (years > 1) {
    yearText = yearText + 's';
  } else if (years === 0) {
    yearText = '';
  }

  if (months > 1) {
    monthText = monthText + 's';
  } else if (months === 0) {
    monthText = '';
  }

  if (days > 1) {
    dayText = dayText + 's';
  } else if (days === 0) {
    dayText = '';
  }

  return yearText + ', ' + monthText + ', ' + dayText + ' ago';
}
