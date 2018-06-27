import { makeExecutableSchema } from 'graphql-tools'

import resolvers from './resolvers'

import User from './schemaTypes/User'
import Ambassador from './schemaTypes/Ambassador'
import Location from './schemaTypes/Location'
import Company from './schemaTypes/Company'
import RetailerUser from './schemaTypes/RetailerUser'
import Cart from './schemaTypes/Cart'
import Sale from './schemaTypes/Sale'
import Item from './schemaTypes/Item'
import LoginResponse from './schemaTypes/LoginResponse'
import ServerResponse from './schemaTypes/ServerResponse'
import LocationSettingsInput from './schemaTypes/inputs/LocationSettingsInput'

const schemaDefinition = `
    # The Admin API schema allows the following queries:
    type Query {
        # Buyers are the app users. Filter searches the name, username, and email fields.
        buyers(filter: String, offset: Int, limit: Int): [User]
        # Fetch an individual User using the id field
        buyer(userId: Int!): User

        # Sellers are the retailers/merchants/POS. Filter searches the name, username, and email fields.
        sellers(filter: String, offset: Int, limit: Int): [RetailerUser]
        # Fetch an individual Retailer user using the user_id field
        seller(userId: Int!): RetailerUser

        # Fetch a list of all Locations (locations). Filter searches the name and description fields.
        locations(filter: String, offset: Int, limit: Int): [Location]
        # Fetch an individual Location using the id field
        location(locationId: Int!): Location

        # Companies query may receive offset and limit as arguments. Filter searches the name field.
        companies(filter: String, offset: Int, limit: Int): [Company]
        # Fetch an individual Company using the id field
        company(companyId: Int!): Company

        # Get a list of all the Ambassadors. Filter is currently disabled for this field.
        ambassadors(filter: String, offset: Int, limit: Int): [Ambassador]
        # Fetch an individual Ambassador using the id field
        ambassador(ambassadorId: Int!): Ambassador

        # Fetch an individual Cart using the id field
        cart(cartId: Int!): Cart
        # Fetch an individual Sale using the id field
        sale(saleId: Int!): Sale
        # Fetch an individual Item using the id field
        item(itemId: Int!): Item
    }
`

export const schema = makeExecutableSchema({
  typeDefs: [
    schemaDefinition,
    User,
    Ambassador,
    Location,
    Company,
    RetailerUser,
    Cart,
    Sale,
    Item,
    LoginResponse,
    ServerResponse,
    LocationSettingsInput,
  ],
  resolvers,
})
