import Location from '../Location'

const UserChannelSubscriptions = `
    # These are the registered channel subscriptions for the user
    type UserChannelSubscriptions {
        id: Int!
        app: String
        channel: String
        action: String
        created_date: String
        location: Location
    }
`

export default () => [UserChannelSubscriptions, Location]
