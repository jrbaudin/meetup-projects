import { DB, logger } from '../../../index'

export const getTimezoneWithId = (timezoneId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT
        id,
        timezone,
        "offset",
        country_id
      FROM timezones
      WHERE id = $id
      ORDER BY id DESC`,
      {
        bind: {
          id: timezoneId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(timezone => {
        resolve(timezone[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Timezone with id '${timezoneId}' from db`,
          originalMessage: error.message,
        })
      })
  })
}
