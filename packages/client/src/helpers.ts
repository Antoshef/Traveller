import { City } from "./city.models"

/**
 * Sort destinations by country name
 * @param input array of destinations
 */
export const sortCities = (input: City[]) => input.sort((a, b) => a.country.localeCompare(b.country))