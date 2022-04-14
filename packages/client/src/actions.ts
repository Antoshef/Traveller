import { CitiesResult, City, CityUpdateType } from "./city.models";

const url = "http://localhost:4000/rest/cities"

export const GetData = async () => {
  try {
    const response = await fetch(url)
    const { cities }: CitiesResult = await response.json()
    return cities
  } catch (error) {
    throw error
  };
};

export const GetOne = async (cityId: number) => {
  try {
    const response = await fetch(`${url}/${cityId}`)
    const city: City = await response.json()
    return city
  } catch (error) {
    throw error
  };
};

export const UpdateOne = async (cityId: number, data: CityUpdateType) => {
  try {
    const init = { 
      method: "PUT", 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(data) 
    }
    const response = await fetch(`${url}/${cityId}`, init)
    const city: City = await response.json()
    return city
  } catch (error) {
    throw error
  };
};