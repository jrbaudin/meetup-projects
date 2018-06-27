import {
  getUsers,
  getUserSettings,
  getUserWithId,
  getUserPushTokens,
  getUserDevices,
  getUserFollowedLocations,
  getUserChannelSubscriptions,
} from './database/connectors/user'

import {
  getUsers as getRetailerUsers,
  getUserWithId as getRetailerUserWithId,
  getActiveLocation,
} from './database/connectors/retailerUser'
import { getTimezoneWithId } from './database/connectors/timezone'
import { getCountryWithId } from './database/connectors/country'
import { getCurrencyWithId } from './database/connectors/currency'
import { getVatWithId } from './database/connectors/vat'
import { getPushLogs } from './database/connectors/push'
import {
  getCompanyWithId,
  getCompanies,
  getCompanyCustomerInformation,
} from './database/connectors/company'

import {
  getLocationWithId,
  getLocations,
  getLocationCustomerInformation,
} from './database/connectors/location'

import {
  getAmbassadors,
  getAmbassadorWithId,
  getAmbassadorWithUserId,
} from './database/connectors/ambassador'

import { getSaleWithId, getSalesForLocation } from './database/connectors/sale'
import { getCartWithId, getCartsForUser, getCartsForSale } from './database/connectors/cart'
import { getItemWithId, getItemsForLocation } from './database/connectors/item'

const resolveFunctions = {
  Query: {
    buyers(obj, { filter, offset, limit }, context, info) {
      return getUsers(filter, offset, limit)
    },
    buyer(obj, { userId }, context, info) {
      return getUserWithId(userId)
    },
    sellers(obj, { filter, offset, limit }, context, info) {
      return getRetailerUsers(filter, offset, limit)
    },
    seller(obj, { userId }, context, info) {
      return getRetailerUserWithId(userId)
    },
    locations(obj, { filter, offset, limit }, context, info) {
      return getLocations(filter, offset, limit)
    },
    location(obj, { locationId }, context, info) {
      return getLocationWithId(locationId)
    },
    companies(obj, { filter, offset, limit }, context, info) {
      return getCompanies(filter, offset, limit)
    },
    company(obj, { companyId }, context, info) {
      return getCompanyWithId(companyId)
    },
    ambassadors(obj, { filter, offset, limit }, context, info) {
      return getAmbassadors(filter, offset, limit)
    },
    ambassador(obj, { ambassadorId }, context, info) {
      return getAmbassadorWithId(ambassadorId)
    },
    cart(obj, { cartId }, context, info) {
      return getCartWithId(cartId)
    },
    sale(obj, { saleId }, context, info) {
      return getSaleWithId(saleId)
    },
    item(obj, { itemId }, context, info) {
      return getItemWithId(itemId)
    },
  },
  RetailerUser: {
    activeLocation(user) {
      return getActiveLocation(user.id)
    },
  },
  Location: {
    company(location) {
      return getCompanyWithId(location.company_id)
    },
    timezone(location) {
      return getTimezoneWithId(location.timezone_id)
    },
    currency(location) {
      return getCurrencyWithId(location.currency_id)
    },
    country(location) {
      return getCountryWithId(location.country_id)
    },
    created_by_user(location) {
      return getRetailerUserWithId(location.created_by_user_id)
    },
    customerInformation(location) {
      return getLocationCustomerInformation(location.id)
    },
    pushes(location) {
      return getPushLogs(location.id)
    },
    sales(location) {
      return getSalesForLocation(location.id)
    },
    items(location) {
      return getItemsForLocation(location.id)
    },
  },
  Company: {
    created_by_user(company) {
      return getRetailerUserWithId(company.created_by_user_id)
    },
    customerInformation(company) {
      return getCompanyCustomerInformation(company.id)
    },
  },
  Country: {
    timezone(country) {
      return getTimezoneWithId(country.timezone_id)
    },
    currency(country) {
      return getCurrencyWithId(country.currency_id)
    },
    vat(country) {
      return getVatWithId(country.vat_id)
    },
  },
  Timezone: {
    country(location) {
      return getCountryWithId(location.country_id)
    },
  },
  User: {
    settings(user) {
      return getUserSettings(user.id)
    },
    pushTokens(user) {
      return getUserPushTokens(user.id)
    },
    devices(user) {
      return getUserDevices(user.id)
    },
    followedLocations(user) {
      return getUserFollowedLocations(user.id)
    },
    ambassadorStatus(user) {
      return getAmbassadorWithUserId(user.id)
    },
    channelSubscriptions(user) {
      return getUserChannelSubscriptions(user.id)
    },
    carts(user) {
      return getCartsForUser(user.id)
    },
  },
  UserFollowedLocations: {
    location(root) {
      return getLocationWithId(root.location_id)
    },
  },
  Ambassador: {
    user(root) {
      return getUserWithId(root.user_id)
    },
  },
  UserChannelSubscriptions: {
    location(subscription) {
      return getLocationWithId(subscription.location_id)
    },
  },
  Cart: {
    user(cart) {
      return getUserWithId(cart.user_id)
    },
    location(cart) {
      return getLocationWithId(cart.location_id)
    },
    sale(cart) {
      return getSaleWithId(cart.sale_id)
    },
  },
  Sale: {
    location(sale) {
      return getLocationWithId(sale.location_id)
    },
    carts(sale) {
      return getCartsForSale(sale.id)
    },
  },
  Item: {
    location(item) {
      return getLocationWithId(item.location_id)
    },
    company(item) {
      return getCompanyWithId(item.company_id)
    },
  },
}

export default resolveFunctions
