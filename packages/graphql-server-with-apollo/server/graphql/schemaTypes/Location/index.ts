import Company from '../Company'
import Timezone from '../Timezone'
import Currency from '../Currency'
import Country from '../Country'
import RetailerUser from '../RetailerUser'
import LocationCustomerInformation from '../LocationCustomerInformation'
import LocationPushLog from '../LocationPushLog'
import Item from '../Item'

// Location Type for GraphQL
const Location = `
    # The Location type is used for representing a physical place where food is being saved
    type Location {
        id: Int!
        name: String
        latitude: String
        longitude: String
        adress: String
        zip: String
        city: String
        created_date: String
        tint_color: String
        description: String
        phone: String
        website: String
        website_short: String
        logo_image_url: String
        feature_image_url: String
        hidden: Boolean
        deleted: Boolean
        verified: Boolean
        dvh: Boolean
        type: String
        beta: String
        company: Company
        timezone: Timezone
        currency: Currency
        country: Country
        created_by_user: RetailerUser
        customerInformation: LocationCustomerInformation # Addition information connected to this location
        pushes: [LocationPushLog] # Available pushes for this location
        sales: [Sale] # Sales for this location
        items: [Item] # Items for this location
    }
`

export default () => [
  Location,
  Company,
  Timezone,
  Currency,
  Country,
  RetailerUser,
  LocationCustomerInformation,
  LocationPushLog,
  Item,
]
