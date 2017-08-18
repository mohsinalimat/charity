// Copyright (c) 2017, Accurate Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Client', {
	refresh: function(frm) {

	},
	date_of_joining: function(frm) {
		var date = frm.doc.date_of_joining;
		frm.set_value("h_date_of_joining",getHijriDate(date));
		frm.refresh_field("h_date_of_joining");

	},
	date_of_birth: function(frm) {
		var date = frm.doc.date_of_birth;
		frm.set_value("h_date_of_birth",getHijriDate(date));
		frm.refresh_field("h_date_of_birth");

	}
});
