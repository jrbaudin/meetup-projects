import * as bcrypt from 'bcryptjs'

import DB from '../../database'

export const checkUserCredentials = (username, password): any => {
  return new Promise((resolve, reject) => {
    const isEmail = username.indexOf('@') > -1

    let query = `
      SELECT
        u.id AS user_id,
        k.id AS karmeleon_id,
        k.retailer_user_id,
        u.username,
        u.email,
        u.name,
        u.timezone,
        u.password_hash,
        ua.level
      FROM users u
      JOIN user_access ua ON ua.user_id = u.id AND ua.platform = 'admin' AND ua.level = 'rwx'
      JOIN karmeleons k ON k.user_id = u.id AND k.role = 'dev' AND k.level >= 2
      WHERE u.username = $username
      LIMIT 1`

    if (isEmail) {
      query = `
        SELECT
          u.id AS user_id,
          k.id AS karmeleon_id,
          k.retailer_user_id,
          u.username,
          u.email,
          u.name,
          u.timezone,
          u.password_hash,
          ua.level
        FROM users u
        JOIN user_access ua ON ua.user_id = u.id AND ua.platform = 'admin' AND ua.level = 'rwx'
        JOIN karmeleons k ON k.user_id = u.id AND k.role = 'dev' AND k.level >= 2
        WHERE u.email = $username
        LIMIT 1`
    }
    // First fetch the password hash for this user
    return DB.query(query, {
      bind: {
        username: username,
      },
    }).then(user => {
      if (user[1].rowCount > 0) {
        bcrypt.compare(password, user[0][0].password_hash, (error, result) => {
          if (error) {
            reject(error.message)
          } else {
            if (result) {
              delete user[0][0].password_hash
              resolve(user[0][0])
            } else {
              resolve(false)
            }
          }
        })
      } else {
        reject('NO_SUCH_USER')
      }
    })
  })
}
