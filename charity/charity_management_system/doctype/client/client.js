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
	 	 if(frm.doc.family_members_not_included){
		 frm.doc.family_members_not_included.forEach(function(d) {
 			frappe.model.set_value(d.doctype, d.name, "age", getAge(d.date_of_birth));
 		 });
	 }
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
		frm.set_value("six_months_rent",frm.doc.yearly_rent /2);
		frm.set_value("three_months_rent",frm.doc.yearly_rent /4);
		frm.set_value("one_month_rent",frm.doc.yearly_rent /12);
	},
	national_id:function(frm) {
		// debugger;
		if(frm.doc.national_id.length < 10){
			msgprint(__("The nubmer is incomplete, you have to enter 10 digit"));
			return false;
		}
	},
	mobile_no:function(frm) {
		if(frm.doc.mobile_no.length < 10){
			msgprint(__("The nubmer is incomplete, you have to enter 10 digit"));
			return false;
		}
	},
	second_mobile_no:function(frm) {
		if(frm.doc.second_mobile_no.length < 10){
			msgprint(__("The nubmer is incomplete, you have to enter 10 digit"));
			return false;
		}
	},
	thrid_mobile_no:function(frm) {
		if(frm.doc.thrid_mobile_no.length < 10){
			msgprint(__("The nubmer is incomplete, you have to enter 10 digit"));
			return false;
		}
	},
	work_telephone_no:function(frm) {
		if(frm.doc.work_telephone_no.length < 10){
			msgprint(__("The nubmer is incomplete, you have to enter 10 digit"));
			return false;
		}
	},
	move1:function(frm) {
		$.each(frm.doc.family_tree,function(index,row) {
			if(row.__checked){
				var new_row = frm.add_child("family_members_not_included");
                new_row.full_name = row.full_name;
                new_row.date_of_birth = row.date_of_birth;
                new_row.h_date_of_birth = row.h_date_of_birth;
                new_row.place_of_birth = row.place_of_birth;
								new_row.health_status = row.health_status;
								new_row.age = row.age;
								new_row.national_id = row.national_id;
								new_row.relation_to_the_client = row.relation_to_the_client;
								new_row.social_status = row.social_status;
								new_row.education_level = row.education_level;
								new_row.notes = row.notes;
				frm.get_field("family_tree").grid.grid_rows[row.idx-1].remove();
			}
		});
		 refresh_field("family_members_not_included");

		 frappe.call({
			 "method": "frappe.client.get",
			 args: {
				 doctype: "Amount For Families",

				 filters: {
					 "family_count": frm.doc.total
				 },
			 },
			 callback: function(data) {
				 if (data.message) {
					 frm.set_value("amount_for_family", data.message.amount);
					 frm.refresh_field("amount_for_family");
				 }
			 }
		 });
	},
	move2:function(frm) {
		$.each(frm.doc.family_members_not_included,function(index,row) {
			if(row.__checked){
				var new_row = frm.add_child("family_tree");
								new_row.full_name = row.full_name;
								new_row.date_of_birth = row.date_of_birth;
								new_row.h_date_of_birth = row.h_date_of_birth;
								new_row.place_of_birth = row.place_of_birth;
								new_row.health_status = row.health_status;
								new_row.age = row.age;
								new_row.national_id = row.national_id;
								new_row.relation_to_the_client = row.relation_to_the_client;
								new_row.social_status = row.social_status;
								new_row.education_level = row.education_level;
								new_row.notes = row.notes;
				frm.get_field("family_members_not_included").grid.grid_rows[row.idx-1].remove();
			}
		});
		 refresh_field("family_tree");

		 var total = 0;
 		frm.doc.family_tree.forEach(function(d) {
 				total += 1;
 		});

 		frm.set_value("total",total);
 		frm.refresh_field("total");

		frappe.call({
			"method": "frappe.client.get",
			args: {
				doctype: "Amount For Families",

				filters: {
					"family_count": total
				},
			},
			callback: function(data) {
				if (data.message) {
					frm.set_value("amount_for_family", data.message.amount);
					frm.refresh_field("amount_for_family");
				}
			}
		});
	}
});



frappe.ui.form.on('Family Members', {
	date_of_birth: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		var date = row.date_of_birth;
		frappe.model.set_value(row.doctype, row.name, "h_date_of_birth",getHijriDate(date));
		frm.refresh_field("h_date_of_birth");

		frappe.model.set_value(row.doctype, row.name, "age", getAge(row.date_of_birth));
		frm.refresh_field("age");
	},
	national_id:function(frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		if(row.national_id.length < 10){
			msgprint(__("The nubmer is incomplete, you have to enter 10 digit"));
			return false;
		}
	},
	family_tree_add:function(frm){
		// frm.trigger("calculate_members");
		var total = 0;
		frm.doc.family_tree.forEach(function(d) {
				total += 1;
		});

		frm.set_value("total",total);
		frm.refresh_field("total");

		frappe.call({
			"method": "frappe.client.get",
			args: {
				doctype: "Amount For Families",

				filters: {
					"family_count": total
				},
			},
			callback: function(data) {
				if (data.message) {
					frm.set_value("amount_for_family", data.message.amount);
					frm.refresh_field("amount_for_family");
				}
			}
		});
	},
	family_tree_remove:function(frm){
		// frm.trigger("calculate_members");
		var total = 0;
		frm.doc.family_tree.forEach(function(d) {
				total += 1;
		});

		frm.set_value("total",total);
		frm.refresh_field("total");

		frappe.call({
			"method": "frappe.client.get",
			args: {
				doctype: "Amount For Families",

				filters: {
					"family_count": total
				},
			},
			callback: function(data) {
				if (data.message) {
					frm.set_value("amount_for_family", data.message.amount);
					frm.refresh_field("amount_for_family");
				}
			}
		});


	}
	// calculate_members:function (frm){
	//
	// }

});

frappe.ui.form.on('Unincluded Dependent', {
	date_of_birth: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		var date = row.date_of_birth;
		frappe.model.set_value(row.doctype, row.name, "h_date_of_birth",getHijriDate(date));
		frm.refresh_field("h_date_of_birth");

		frappe.model.set_value(row.doctype, row.name, "age", getAge(row.date_of_birth));
		frm.refresh_field("age");

},
national_id:function(frm, cdt, cdn) {
	var row = locals[cdt][cdn];
	if(row.national_id.length < 10){
		msgprint(__("The nubmer is incomplete, you have to enter 10 digit"));
		return false;
	}
}
});

frappe.ui.form.on('Client Debt', {
	deadline: function(frm, cdt, cdn) {
		var row = locals[cdt][cdn];
		var date = row.deadline;
		frappe.model.set_value(row.doctype, row.name, "h_deadline",getHijriDate(date));
		frm.refresh_field("h_deadline");

	}
});

frappe.ui.form.on("Offered Help", {
    amount: function(frm, cdt, cdn) {
        var total = 0;
        frm.doc.offered_help.forEach(function(d) {
            total += d.amount;
        });
        frm.set_value("total_amount", total);
        frm.refresh_field("total_amount");
    }
});

frappe.ui.form.on('Dependent worker', {
national_id:function(frm, cdt, cdn) {
	var row = locals[cdt][cdn];
	if(row.national_id.length < 10){
		msgprint(__("The nubmer is incomplete, you have to enter 10 digit"));
		return false;
	}
}
});

frappe.ui.form.on("Job", {
    salary: function(frm, cdt, cdn) {
        var total = 0;
        frm.doc.jobs.forEach(function(d) {
            total += d.salary;
        });

        frm.set_value("total_monthly_income", total);
        frm.refresh_field("total_monthly_income");

				frm.set_value("average_monthly_income", (total - frm.doc.one_month_rent)/frm.doc.total);
        frm.refresh_field("average_monthly_income");
    },jobs_remove:function(frm){
			var total = 0;
			frm.doc.jobs.forEach(function(d) {
					total += d.salary;
			});

			frm.set_value("total_monthly_income", total);
			frm.refresh_field("total_monthly_income");

			frm.set_value("average_monthly_income", (total - frm.doc.one_month_rent)/frm.doc.total);
			frm.refresh_field("average_monthly_income");
		}
});
