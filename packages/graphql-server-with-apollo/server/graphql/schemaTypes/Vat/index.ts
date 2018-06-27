// Vat Type for GraphQL
const Vat = `
    # The Vat type is used for representing a specific VAT (Value Added Tax)
    type Vat {
        id: Int!
        value: String
    }
`

export default () => [Vat]
