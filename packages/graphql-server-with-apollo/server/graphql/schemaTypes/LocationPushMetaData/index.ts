// LocationPushMetaData Type for GraphQL
const LocationPushMetaData = `
    # The LocationPushMetaData type
    type LocationPushMetaData {
        app: String
        location_id: Int
        sale_id: Int
    }
`

export default () => [LocationPushMetaData]
