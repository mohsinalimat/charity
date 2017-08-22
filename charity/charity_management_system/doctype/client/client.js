// Copyright (c) 2017, Accurate Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Client', {
	onload: function(frm) {
		frm.set_value("age",getAge(frm.doc.date_of_birth));
		frm.refresh_field("age");

		frm.doc.family_tree.forEach(function(d) {
			frappe.model.set_value(d.doctype, d.name, "age", getAge(d.date_of_birth));
		 });

		 frm.doc.family_members_not_included.forEach(function(d) {
 			frappe.model.set_value(d.doctype, d.name, "age", getAge(d.date_of_birth));
 		 });
		 //this check is not working
		 if(frm.doc.__unsaved){
			 frm.save();
		 }
	},
	date_of_joining: function(frm) {
		var date = frm.doc.date_of_joining;
		frm.set_value("h_date_of_joining",getHijriDate(date));
		frm.refresh_field("h_date_of_joining");

		frm.set_value("age",getAge(frm.doc.date_of_birth));
		frm.refresh_field("age");
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


frappe.ui.form.on('Family Members', {
	date_of_birth: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		frappe.model.set_value(row.doctype, row.name, "h_date_of_birth",getHijriDate(date));
		frm.refresh_field("h_date_of_birth");

		frappe.model.set_value(row.doctype, row.name, "age", getAge(row.date_of_birth));
		frm.refresh_field("age");
	}
});

frappe.ui.form.on('Unincluded Dependent', {
	date_of_birth: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		frappe.model.set_value(row.doctype, row.name, "h_date_of_birth",getHijriDate(date));
		frm.refresh_field("h_date_of_birth");

		frappe.model.set_value(row.doctype, row.name, "age", getAge(row.date_of_birth));
		frm.refresh_field("age");
	}
});
