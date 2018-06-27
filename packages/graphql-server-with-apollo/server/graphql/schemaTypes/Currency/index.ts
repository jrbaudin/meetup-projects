// Currency Type for GraphQL
const Currency = `
    # The Currency type is used for representing a specific currency
    type Currency {
        id: Int!
        name: String
        code: String
        fraction: String
        symbol: String
        is_prefix: Boolean
    }
`

export default () => [Currency]
