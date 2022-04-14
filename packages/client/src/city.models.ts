export type City = {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export type CitiesResult = {
  cities: City[]
  total: number
}

export type CityUpdateType = Omit<City, "id" | "name" | "country">

export enum TypeOfCityEnum {
  VISITED = "visited",
  WISHLIST = "wishlist"
}

export type LoadingTypeObj = {
  isLoading:  boolean,
  type: TypeOfCityEnum
}

export type LoadingType = {
  [id: number]: LoadingTypeObj
}

export type CityRequestType = {
  id: number
  type: TypeOfCityEnum
} & CityUpdateType