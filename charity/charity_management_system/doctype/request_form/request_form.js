// Copyright (c) 2017, Accurate Systems and contributors
// For license information, please see license.txt

frappe.ui.form.on('Request Form', {
	refresh: function(frm) {

	},
	onload:function (frm) {
		frm.add_custom_button(__('Coupon'),
			function() {
				frm.trigger("make_coupon");
			}, __("Make"));

			frm.add_custom_button(__('Cheque'),
				function() {
					frm.trigger("make_cheque");
				}, __("Make"));
	},make_coupon:function(frm){
alert("make_coupon")
	},make_cheque:function(frm){
alert("make_cheque")
	}
});
