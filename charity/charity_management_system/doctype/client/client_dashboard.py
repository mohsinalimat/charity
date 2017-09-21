from frappe import _


def get_data():
return {
    'fieldname': 'file_number',
    'transactions': [
        {
            'label': _('Coupon & Cheuq'),
            'items': ['Coupon', 'Cheque Specification']
        }
    ]
}
