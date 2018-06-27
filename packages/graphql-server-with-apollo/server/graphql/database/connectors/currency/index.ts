import { DB, logger } from '../../../index'
export const getCurrencyWithId = (currencyId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT
        id,
        name,
        is_prefix,
        fraction,
        code,
        symbol
      FROM currencies
      WHERE id = $id
      ORDER BY id DESC`,
      {
        bind: {
          id: currencyId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(currency => {
        resolve(currency[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Currency with id '${currencyId}' from db`,
          originalMessage: error.message,
        })
      })
  })
}
