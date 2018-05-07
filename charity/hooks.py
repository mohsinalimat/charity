# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "charity"
app_title = "Charity Management System"
app_publisher = "Accurate Systems"
app_description = "The Charity management system is a type of non-profit organization"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "info@accuratesystems.com.sa"
app_license = "MIT"

# fixtures = [
#     "Workflow", "Workflow State", "Workflow Action", "Case Type",
#     "Property Type", "Requested Aid Type", "City", "Client Relation",
#     "Education Status", "Health Status", "Household Type", "Neighborhood",
#     "Social Status", "Translation", "Naming Series"
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/charity/css/charity.css"
app_include_js = "/assets/js/charity.js"
website_context = {
    "favicon": "/assets/charity/images/sihat_logo.png",
    "splash_image": "/assets/charity/images/sihat_splash.png"
}

# include js, css files in header of web template
# web_include_css = "/assets/charity/css/charity.css"
# web_include_js = "/assets/charity/js/charity.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
doctype_list_js = {"Request Form" : "public/js/request_form_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "charity.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "charity.install.before_install"
# after_install = "charity.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

notification_config = "charity.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
	# "all": [
	# 	"charity.tasks.all"
	# ],
	"daily": [
		"charity.charity_management_system.tools.stop_hoard"
	],
	# "hourly": [
	# 	"charity.tasks.hourly"
	# ],
	# "weekly": [
	# 	"charity.tasks.weekly"
	# ]
	# "monthly": [
	# 	"charity.tasks.monthly"
	# ]
}

# Testing
# -------

# before_tests = "charity.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "charity.event.get_events"
# }
