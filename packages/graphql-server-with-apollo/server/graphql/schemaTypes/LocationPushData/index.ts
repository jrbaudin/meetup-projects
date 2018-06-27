// LocationPushData Type for GraphQL
const LocationPushData = `
    # The LocationPushData type
    type LocationPushData {
        message: String
        num_sent: Int
        num_failed: Int
        sound_type: String
    }
`

export default () => [LocationPushData]
