import LocationPushMetaData from '../LocationPushMetaData'
import LocationPushData from '../LocationPushData'
// LocationPushLog Type for GraphQL
const LocationPushLog = `
    # The LocationPushLog type is used for representing push log objectds for a location
    type LocationPushLog {
        log_id: Int
        log_push_data: LocationPushData
        log_meta_data: LocationPushMetaData
        log_created_at: String
        log_location_id: String
        queue_id: String
        queue_app: String
        queue_type: String
        queue_meta_data: LocationPushMetaData
        queue_sale_id: String
        queue_parsed: Boolean
        queue_cancelled: Boolean
        queue_target_date: String
        queue_created_date: String
        queue_error: String
    }
`

export default () => [LocationPushLog, LocationPushMetaData, LocationPushData]
