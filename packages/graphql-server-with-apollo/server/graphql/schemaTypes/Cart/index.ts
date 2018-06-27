import User from '../User'
import Location from '../Location'
import Sale from '../Sale'

const Cart = `
    # Cart is a collection of items a user has intended to purchase from one sale
    type Cart {
        id: Int!
        user: User # The user who created the cart
        location: Location # The location the items of the cart belong to
        sale: Sale # The sale the items of the cart belong to
        created_date: String
        deleted: Boolean
        deleted_date: String
        closed: Boolean
        closed_date: String
    }
`

export default () => [Cart, User, Location, Sale]
