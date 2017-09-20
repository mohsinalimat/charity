from frappe import _


def get_data():
    return {

        'fieldname': 'file_number',
        'transactions': [
            {
                'label': _('Coupon & Cheuq'),
                'items': {
                    "type": "doctype",
                    "name": "Coupon",
                    "description": _("Coupon"),
                },
                {
                    "type": "doctype",
                    "name": "Cheque Specification",
                    "description": _("Cheque Specification"),
                }
            }
        ]
    }
