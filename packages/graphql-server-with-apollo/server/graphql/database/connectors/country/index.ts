import { DB, logger } from '../../../index'

export const getCountryWithId = (countryId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT
        id,
        name,
        alpha3,
        alpha2,
        vat_id,
        currency_id,
        timezone_id
      FROM countries
      WHERE id = $id
      ORDER BY id DESC`,
      {
        bind: {
          id: countryId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(country => {
        resolve(country[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Country with id '${countryId}' from db`,
          originalMessage: error.message,
        })
      })
  })
}
