# -*- coding: utf-8 -*-
# Copyright (c) 2017, Accurate Systems and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from umalqurra.hijri_date import HijriDate


class ChequeSpecification(Document):
    def autoname(self):
        um = HijriDate.today()
        year = str(um.year)[2:-2]
        self.name = make_autoname(self.naming_series + year)

    def after_insert(self):
        self.parent = self.file_number
        self.parentfield = 'cheque'
        self.parenttype = 'client'
