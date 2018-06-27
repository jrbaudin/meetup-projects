import Location from '../Location'

const RetailerUser = `
    # RetailerUser represent a Seller in the system
    type RetailerUser {
        id: Int!
        username: String
        email: String
        name: String
        phone: String
        timezone: String
        created_date: String
        last_seen_date: String
        updated_password: Boolean
        activeLocation: Location # The currently active location for this user
    }
`

export default () => [RetailerUser, Location]
