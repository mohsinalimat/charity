// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

// frappe.provide('erpnext');

// add toolbar icon
$(document).bind('toolbar_setup', function() {

	//$('.navbar-home').html('<img class="erpnext-icon" src="'+
		//	frappe.urllib.get_base_url()+'/assets/charity/images/sihat_logo.jpg" />');
});


function getHijriDate(date) {
	return HijriJS.toHijri(convertDate(date), "-").toString();
}

function getHijriYear(date) {
	var year = HijriJS.toHijri(convertDate(date), "-");
	return year.toFormat("yyyy").substring(2);
}

function convertDate(date) {
  date = new Date(date);
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return (ddChars[1]?dd:"0"+ddChars[0]) + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + yyyy;
}
