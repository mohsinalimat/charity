// Copyright (c) 2017, Accurate Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Client', {
	onload: function(frm) {
		if(frm.doc.date_of_birth){
			console.log("frm.doc.date_of_birth",frm.doc.date_of_birth);
			console.log("getAge(frm.doc.date_of_birth) =",getAge(frm.doc.date_of_birth));
			frm.set_value("age",getAge(frm.doc.date_of_birth));
			frm.refresh_field("age");
		}
		frm.set_value("the_joining_period",frappe.datetime.get_day_diff(frappe.datetime.nowdate(), frm.doc.date_of_joining ));
		frm.refresh_field("the_joining_period");
		if(frm.doc.family_tree){
		frm.doc.family_tree.forEach(function(d) {
			frappe.model.set_value(d.doctype, d.name, "age", getAge(d.date_of_birth));
		 });
	 }

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

frappe.ui.form.on('Client Debt', {
	deadline: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		var date = row.deadline;
		frappe.model.set_value(row.doctype, row.name, "h_deadline",getHijriDate(date));
		// frm.set_value("h_deadline",getHijriDate(date));
		frm.refresh_field("h_deadline");

	}
});

frappe.ui.form.on("Offered Help", {
    amount: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total = 0;
        frm.doc.offered_help.forEach(function(d) {
            total += d.amount;
        });
        frm.set_value("total_amount", total);
        frm.refresh_field("total_amount");
    }
});
