import { DB, logger } from '../../../index'

export const getVatWithId = (vatId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT
        id,
        value
      FROM vats
      WHERE id = $id
      ORDER BY id DESC`,
      {
        bind: {
          id: vatId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(vat => {
        resolve(vat[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting VAT with id '${vatId}' from db`,
          originalMessage: error.message,
        })
      })
  })
}
