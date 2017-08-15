frappe.ui.form.on("Request Form", {
    refresh: function(frm) {
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
      frm.set_value("h_date_of_request",HijriJS.toHijri(frm.doc.date_of_request, "/"));
      frm.refresh_field("h_date_of_request");
    },
    date_of_marriage_contract:function(frm){
      frm.set_value("h_date_of_marriage_contract",HijriJS.toHijri(frm.doc.date_of_marriage_contract, "/"));
      frm.refresh_field("h_date_of_marriage_contract");
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

    }
});
