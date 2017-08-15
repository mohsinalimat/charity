# -*- coding: utf-8 -*-
# Copyright (c) 2017, Accurate Systems and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document


class ChequeSpecification(Document):
    def after_insert(self):
        # open an existing document
        social_benefits = frappe.get_doc("Social Benefits", self.file_number)
        if (social_benefits):
            cheque_specification = frappe.get_doc("Cheque Specification",
                                                  self.name)
            social_benefits.append("cheque_specification",
                                   cheque_specification)
            social_benefits.save()
        else:
            # insert a new document
            cheque_specification = frappe.get_doc("Cheque Specification",
                                                  self.name)
            social_benefits = frappe.get_doc({
                "doctype": "Social Benefits",
                "file_number": self.file_number,
                "full_name": self.full_name
            })
            social_benefits.append("cheque_specification",
                                   cheque_specification)
            social_benefits.insert()
