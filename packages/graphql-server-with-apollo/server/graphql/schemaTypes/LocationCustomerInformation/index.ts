// LocationCustomerInformation Type for GraphQL
const LocationCustomerInformation = `
    # The LocationCustomerInformation type is used for representing additional data available for a location
    type LocationCustomerInformation {
        location_id: Int
        special_report: Boolean
        contact_person: String
        bank_details: String
        report_email: String
    }
`

export default () => [LocationCustomerInformation]
