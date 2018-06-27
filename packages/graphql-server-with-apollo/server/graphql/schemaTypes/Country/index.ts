import Vat from '../Vat'
import Timezone from '../Timezone'
import Currency from '../Currency'
// Country Type for GraphQL
const Country = `
    # The Country type is used for representing a specific country
    type Country {
        id: Int!
        name: String
        alpha2: String
        alpha3: String
        timezone: Timezone
        currency: Currency
        vat: Vat
    }
`

export default () => [Country, Vat, Timezone, Currency]
