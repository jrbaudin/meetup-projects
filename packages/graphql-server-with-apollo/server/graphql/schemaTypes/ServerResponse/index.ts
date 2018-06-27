import Error from '../Error'
// ServerResponse Type for GraphQL
const ServerResponse = `
    # The result of a server action
    type ServerResponse {
        success: Boolean!
        status: Int!
        error: Error
    }
`

export default () => [ServerResponse, Error]
