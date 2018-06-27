import * as auth from 'basic-auth'
import * as jwt from 'jsonwebtoken'
import logger from '../../util/logger'

import * as authModel from '../../models/authModel'

export const loginUser = async (req, res): Promise<void> => {
  try {
    const user = auth(req)

    const username = user ? user.name.trim().toLowerCase() : ''
    const password = user ? user.pass : ''
    if (username && typeof username === 'string' && (password && typeof password === 'string')) {
      const loginResult = await authModel.checkUserCredentials(username, password)

      if (loginResult) {
        const resUserId = loginResult ? loginResult.user_id : ''
        const resUsername = loginResult ? loginResult.username : ''
        const resName = loginResult ? loginResult.name : ''
        const resEmail = loginResult ? loginResult.email : ''
        const resTimezone = loginResult ? loginResult.timezone : ''

        const tokenData = {
          user_id: resUserId,
          username: resUsername,
          name: resName,
          email: resEmail,
          timezone: resTimezone,
        }

        const result = {
          success: true,
          token: jwt.sign(tokenData, process.env.AUTH_SECRET, {
            expiresIn: '1d',
          }),
        }

        logger.info(`authController.loginUser: Login succesful!`)
        res.status(200).json(result)
      } else {
        logger.error(`authController.loginUser: Login failed`)
        const errorCode = 'auth/verification-failed'
        const errorMessage = 'Verification of user credentials failed'
        res.status(400).json({
          success: false,
          error: {
            code: errorCode,
            message: errorMessage,
          },
        })
        return
      }
    } else {
      logger.error(
        `authController.loginUser: Mandatory input parameters 'username' and 'password' were invalid. Can't continue`
      )
      const errorCode = 'auth/missing-values'
      const errorMessage = 'Mandatory input parameters username and password were invalid'
      res.status(400).json({
        success: false,
        error: {
          code: errorCode,
          message: errorMessage,
        },
      })
      return
    }
  } catch (error) {
    logger.error(`authController.loginUser: Error caught while verifying user credentials`)
    logger.debug(`authController.loginUser: error => ${error}`)
    logger.debug(`authController.loginUser: error => ${JSON.stringify(error, null, 2)}`)
    const errorCode = 'auth/unknown-error'
    const errorMessage = 'An Error was caught while verifying user credentials'
    res.status(400).json({
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
      },
    })
    return
  }
}
