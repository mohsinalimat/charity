# -*- coding: utf-8 -*-
# Copyright (c) 2017, Accurate Systems and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from umalqurra.hijri_date import HijriDate

class Coupon(Document):
    pass

    def autoname(self):
        um = HijriDate.today()
        year = str(um.year)[2:-2]
        self.name = make_autoname(self.naming_series + year)

    # def after_insert(self):
    #     # open an existing document
    #     social_benefits = frappe.get_doc("Social Benefits", self.file_number)
    #     if (social_benefits):
    #         coupon = frappe.get_doc("Coupon", self.name)
    #         social_benefits.append("coupon", coupon)
    #         social_benefits.save()
    #     else:
    #         # insert a new document
    #         coupon = frappe.get_doc("Coupon", self.name)
    #         social_benefits = frappe.get_doc({
    #             "doctype": "Social Benefits",
    #             "file_number": self.file_number,
    #             "full_name": self.full_name
    #         })
    #         social_benefits.append("coupon", coupon)
    #         social_benefits.insert()

    def befor_print(self):
        self.copy =1;
        print "############## copy = {}".format(self.copy)

    def on_print(self):
        self.copy =1;
        print "&&&&&&&&&&&&& copy = {}".format(self.copy)
