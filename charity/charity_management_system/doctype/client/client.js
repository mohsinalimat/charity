// Copyright (c) 2017, Accurate Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Client', {
	onload: function(frm) {
		console.log("frm.doc.date_of_birth",frm.doc.date_of_birth);
		console.log("getAge(frm.doc.date_of_birth) =",getAge(frm.doc.date_of_birth));
		frm.set_value("age",getAge(frm.doc.date_of_birth));
		frm.refresh_field("age");

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

	},
	yearly_rent: function (frm) {
		frm.set_value("6_months_rent",frm.doc.yearly_rent /2);
		frm.set_value("3_months_rent",frm.doc.yearly_rent /4);
		frm.set_value("1_month_rent",frm.doc.yearly_rent /12);
	}
});
