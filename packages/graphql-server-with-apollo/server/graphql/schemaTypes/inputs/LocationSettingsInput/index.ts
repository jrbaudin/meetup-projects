const LocationSettingsInput = `
    # The LocationSettingsInput represents the accepted inputs for a save location settings mutation
    input LocationSettingsInput {
      bankDetails: String
      reportEmail: String
    }
`

export default () => [LocationSettingsInput]
