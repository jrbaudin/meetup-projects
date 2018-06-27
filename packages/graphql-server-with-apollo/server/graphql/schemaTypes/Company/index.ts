import RetailerUser from '../RetailerUser'
import CompanyCustomerInformation from '../CompanyCustomerInformation'
const Company = `
    # The Company type is used for representing a company
    type Company {
        id: Int!
        name: String
        created_date: String
        status: String
        owner: String
        owner_initials: String
        created_by_user: RetailerUser
        karmeleon_id: Int
        customerInformation: CompanyCustomerInformation # Addition information connected to this company
    }
`

export default () => [Company, RetailerUser, CompanyCustomerInformation]
