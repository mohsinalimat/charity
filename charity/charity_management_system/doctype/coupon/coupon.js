// Copyright (c) 2017, Accurate Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Coupon', {
	refresh: function(frm) {
		if(frm.doc.__islocal){
			var today_date = frappe.datetime.nowdate();
			frm.set_value("h_date_of_coupon",getHijriDate(today_date));
			frm.set_value("h_year",getHijriYear(today_date));
			frm.refresh_field("h_date_of_coupon");
			frm.refresh_field("h_year");
		}
	},
	date_of_coupon: function(frm) {
		var date = frm.doc.date_of_coupon;
		frm.set_value("h_date_of_coupon",getHijriDate(date));
		frm.refresh_field("h_date_of_coupon");
	},item: function(frm) {
		frm.set_value("total",frm.doc.rate * frm.doc.quantity);
		frm.refresh_field("total");
	},
	quantity: function(frm) {
		frm.set_value("total",frm.doc.rate * frm.doc.quantity);
		frm.refresh_field("total");
	}
});
