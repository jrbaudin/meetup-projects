import { DB, logger } from '../../../index'

export const getAmbassadors = async (filter?: string, offset = null, limit = null) => {
  try {
    const selectQuery = `
      SELECT
        id,
        user_id,
        created_date
      FROM user_ambassadors
      GROUP BY id, user_id
      ORDER BY created_date DESC LIMIT $limit OFFSET $offset`

    const ambassadors = await DB.query(selectQuery, {
      bind: {
        offset,
        limit,
      },
      type: DB.QueryTypes.SELECT,
    })

    return ambassadors
  } catch (error) {
    throw error
  }
}

export const getAmbassadorWithId = (ambassadorId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, user_id, created_date
      FROM user_ambassadors
      WHERE id = $id
      ORDER BY id, created_date DESC
      `,
      {
        bind: {
          id: ambassadorId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(ambassador => {
        resolve(ambassador[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Ambassador from db using id '${ambassadorId}'`,
          originalMessage: error.message,
        })
      })
  })
}

export const getAmbassadorWithUserId = (ambassadorUserId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT id, user_id, created_date
      FROM user_ambassadors
      WHERE user_id = $user_id
      ORDER BY id, created_date DESC
      `,
      {
        bind: {
          user_id: ambassadorUserId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(ambassador => {
        resolve(ambassador[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Ambassador from db using user_id '${ambassadorUserId}'`,
          originalMessage: error.message,
        })
      })
  })
}
