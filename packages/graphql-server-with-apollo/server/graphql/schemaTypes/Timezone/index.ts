import Country from '../Country'
// Timezone Type for GraphQL
const Timezone = `
    # The Timezone type is used for representing a specific timezone
    type Timezone {
        id: Int!
        timezone: String
        offset: String
        country: Country
    }
`

export default () => [Timezone, Country]
