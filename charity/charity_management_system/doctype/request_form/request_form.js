
frappe.ui.form.on("Request Form", {
    refresh: function(frm) {
      if(frm.doc.__islocal){
  			var today_date = frappe.datetime.nowdate();
  			frm.set_value("h_date_of_request",getHijriDate(today_date));
  			frm.set_value("h_year",getHijriYear(today_date));
  			frm.refresh_field("h_date_of_request");
  			frm.refresh_field("h_year");
  		}
        frm.add_custom_button(__("Coupon"), function() {
            frappe.model.open_mapped_doc({
                method: "charity.charity_management_system.tools.make_coupon",
                frm: cur_frm
            });
        }, __("Make"));

        show_required_section(frm);
    },
    on_update: function(frm) {
        if (frappe.user_roles.indexOf("Researcher") != -1) {
            frm.set_value("date_of_research", frappe.utils.nowdate());
            frm.save();
        } else  if (frm.doc.workflow_state == "Approved for Full Aid" ||
            frm.doc.workflow_state == "Approved for Cheques Only" ||
            frm.doc.workflow_state == "Approved For Coupons Only") {
            frm.set_value("date_of_meeting", frappe.utils.nowdate());
            frm.save();
        }
    },
    date_of_request:function(frm) {
      var date = frm.doc.date_of_request;
      frm.set_value("h_date_of_request",getHijriDate(date));
      frm.refresh_field("h_date_of_request");
    },
    date_of_marriage_contract:function(frm){
      var date = frm.doc.date_of_marriage_contract;
      frm.set_value("h_date_of_marriage_contract",getHijriDate(date));
      frm.refresh_field("h_date_of_marriage_contract");
    },
    date_of_research:function(frm){
      var date = frm.doc.date_of_research;
      frm.set_value("h_date_of_research",getHijriDate(date));
      frm.refresh_field("h_date_of_research");
    },
    date_of_meeting:function(frm){
      var date = frm.doc.date_of_meeting;
      frm.set_value("h_date_of_meeting",getHijriDate(date));
      frm.refresh_field("h_date_of_meeting");
    },
    research_committee_received_date:function(frm){
      var date = frm.doc.research_committee_received_date;
      frm.set_value("h_research_committee_received_date",getHijriDate(date));
      frm.refresh_field("h_research_committee_received_date");
    }
});


frappe.ui.form.on("Requested Aid", {
    request_type: function(frm) {
        show_required_section(frm);
    }
});


function show_required_section(frm) {
    $.each(frm.doc.type_of_the_requested_aid, function(key, value) {
        console.log(key, value.request_type);
        if (value.request_type == "زواج") {
            frm.toggle_display("section_break1", true);
        }

        if (value.request_type == "أجهزة / أثاث") {
            frm.toggle_display("section_break0", true);
        }

        if (value.request_type == "مصروفات مدرسية") {
            frm.toggle_display("school_expenses", true);
        }
        if (value.request_type == "مصروفات مالية") {
            frm.toggle_display("financial_expenses", true);
        }

        if (value.request_type == "دفع الديون") {
            frm.toggle_display("debts", true);
        }
        if (value.request_type == "صحية") {
            frm.toggle_display("medical_condition", true);
        }

    });
}

frappe.ui.form.on("Financial table", {
    amount: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total = 0;
        frm.doc.financial.forEach(function(d) {
            total += d.amount;
        });

        frm.set_value("f_total", total);
        frm.refresh_field("f_total");

    }
});

frappe.ui.form.on("Medical table", {
    amount: function(frm, cdt, cdn) {
        var d = locals[cdt][cdn];
        var total = 0;
        frm.doc.medical_table.forEach(function(d) {
            total += d.amount;
        });

        frm.set_value("m_total", total);
        frm.refresh_field("m_total");
    },
    date_of_birth: function(frm) {
      var date = frm.doc.date_of_birth;
      frm.set_value("h_date_of_birth",getHijriDate(date));
      frm.refresh_field("h_date_of_birth");
    }
});

frappe.ui.form.on("Unincluded Dependent", {
    date_of_birth: function(frm) {
      var date = frm.doc.date_of_birth;
      frm.set_value("h_date_of_birth",getHijriDate(date));
      frm.refresh_field("h_date_of_birth");
    }
});

frappe.ui.form.on("Family Members", {
    date_of_birth: function(frm) {
      var date = frm.doc.date_of_birth;
      frm.set_value("h_date_of_birth",getHijriDate(date));
      frm.refresh_field("h_date_of_birth");
    }
});

frappe.ui.form.on("Coupon", {
  recommendation_table_add: function(frm, cdt, cdn) {
    var row = locals[cdt][cdn];
    frappe.model.set_value(row.doctype, row.name, 'file_number', frm.doc.file_number);
    var today_date = frappe.datetime.nowdate();
    frappe.model.set_value(row.doctype, row.name, "h_date_of_coupon",getHijriDate(today_date));
    frappe.model.set_value(row.doctype, row.name, "full_name",frm.doc.full_name);
  },
  date_of_birth: function(frm) {
    var date = frm.doc.date_of_birth;
    frm.set_value("h_date_of_birth",getHijriDate(date));
    frm.refresh_field("h_date_of_birth");
  }
});

frappe.ui.form.on("Cheque Specification", {
  cheque_add: function(frm, cdt, cdn) {
      var row = locals[cdt][cdn];
    frappe.model.set_value(row.doctype, row.name, 'file_number', frm.doc.file_number);
    var today_date = frappe.datetime.nowdate();
    frappe.model.set_value(row.doctype, row.name, "h_date_of_issue",getHijriDate(today_date));
    frappe.model.set_value(row.doctype, row.name, "name_of_client",frm.doc.full_name);
  }
});
