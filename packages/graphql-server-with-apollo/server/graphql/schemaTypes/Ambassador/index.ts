import User from '../User'

const Ambassador = `
    type Ambassador {
        id: Int!
        user: User #
        created_date: String
    }
`

export default () => [Ambassador, User]
