// CompanyCustomerInformation Type for GraphQL
const CompanyCustomerInformation = `
    # The CompanyCustomerInformation type is used for representing additional data available for a company
    type CompanyCustomerInformation {
        company_id: Int
        contact_person: String
        contact_email: String
        contact_phone: String
        bank_details: String
        report_email: String
        website: String
        industry: String
        billing_address_street: String
        billing_address_zip: String
        billing_address_city: String
        shipping_adress_street: String
        shipping_adress_zip: String
        shipping_adress_city: String
    }
`

export default () => [CompanyCustomerInformation]
