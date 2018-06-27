import Location from '../Location'
import Cart from '../Cart'

const Sale = `
    # Sale is a collection of items that are available from one location for one day
    type Sale {
        id: Int!
        location: Location # The Location the sale belong to
        carts: [Cart] # All Cart that belong to this sale
        day: String
        created_date: String
        start_date: String
        end_date: String
        pickup_date: String
        paused: Boolean
        started: Boolean
        unverified: Boolean
        parsed: Boolean
    }
`

export default () => [Sale, Location, Cart]
