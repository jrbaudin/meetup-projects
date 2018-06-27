import Location from '../Location'
import Company from '../Company'

const Item = `
    # Item represents one unit of food sold by a location
    type Item {
        id: Int!
        location: Location
        company: Company
        title: String
        description: String
        deleted: Boolean
        created_date: String
    }
`

export default () => [Item, Location, Company]
