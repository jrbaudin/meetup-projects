import { DB, logger } from '../../../index'
import * as _ from 'lodash'

export const getCompanies = async (filter?: string, offset = null, limit = null) => {
  try {
    const selectQuery = `
      SELECT
        id,
        name,
        created_date,
        status,
        owner,
        owner_initials,
        created_by_user_id,
        karmeleon_id
      FROM companies
      ORDER BY id DESC LIMIT $limit OFFSET $offset`

    const companies = await DB.query(selectQuery, {
      bind: {
        offset,
        limit,
      },
      type: DB.QueryTypes.SELECT,
    })

    if (filter && !_.isEmpty(filter)) {
      return _.filter(companies, (company: any) => {
        return _.includes(_.toUpper(company.name), _.toUpper(filter))
      })
    } else {
      return companies
    }
  } catch (error) {
    throw error
  }
}

export const getCompanyWithId = (companyId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT
        id,
        name,
        created_date,
        status,
        owner,
        owner_initials,
        created_by_user_id,
        karmeleon_id
      FROM companies
      WHERE id = $id
      ORDER BY id DESC`,
      {
        bind: {
          id: companyId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(company => {
        resolve(company[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Company with id '${companyId}' from db`,
          originalMessage: error.message,
        })
      })
  })
}

export const getCompanyCustomerInformation = (companyId: Number) => {
  return new Promise((resolve, reject) => {
    DB.query(
      `
      SELECT
        company_id,
        contact_person,
        contact_email,
        contact_phone,
        report_email,
        bank_details,
        website,
        industry,
        billing_address_street,
        billing_address_zip,
        billing_address_city,
        shipping_adress_street,
        shipping_adress_zip,
        shipping_adress_city
      FROM company_customer_information
      WHERE company_id = $id
      ORDER BY company_id DESC`,
      {
        bind: {
          id: companyId,
        },
        type: DB.QueryTypes.SELECT,
      }
    )
      .then(companyInfo => {
        resolve(companyInfo[0])
      })
      .catch(error => {
        reject({
          message: `ERROR When getting Company Customer Info with id '${companyId}' from db`,
          originalMessage: error.message,
        })
      })
  })
}
