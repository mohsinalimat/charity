console.log("user",frappe.session.user);

if(frappe.user.has_role('Researcher')) {
  console.log("1");
  frappe.route_options = {"Researcher table.email":frappe.session.user};
  console.log("22");
  frappe.set_route('List','Request Form');
  console.log("333");
}
