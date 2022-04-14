import React, { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'
import { Container, Grid, Heading, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { City, CityRequestType, LoadingType, TypeOfCityEnum } from './city.models'
import { GetData, UpdateOne } from './actions'
import { sortCities } from './helpers'
import CityLineItem from './CityLineItem'
import { TABLE_TOP_MARGIN, COUNTRY, CITY, ROW_HEADING_WIDTH, REMOVE, VISITED } from './constants'

/**
 * Page with list of all destinations that a user had visited.
 */
export const Visited: FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState<LoadingType>({})

  const dataGET = async () => {
    try {
      const promiseData = GetData();
      const data = await Promise.resolve(promiseData)
      const filteredCities = data.filter(item => item.visited === true)
      setCities(sortCities(filteredCities))
    } catch (error) {
      throw error
    }
  }

  /**
   * Updates each destinations row state icons for visited or wishlist
   */
  const updateHandler = useCallback(async ({ id, visited, wishlist, type }: CityRequestType) => {
    try {
      setLoading((state) => ({ ...state, [id]: { isLoading: true, type }}))
      const result = await UpdateOne(id, { visited, wishlist })
      setCities((state) => {
        const updatedCities = state.filter(city => city.id !== result.id)
        return sortCities(updatedCities)
      })
      setLoading((state) => ({ ...state, [id]: { isLoading: false, type } }))
    } catch (error) {
      setLoading((state) => ({ ...state, [id]: { isLoading: false, type } }))
      throw error
    }
  }, [])

  useEffect(() => {
    dataGET()
  }, []);

  return (
    <>
      <Heading as="h1">{VISITED}</Heading>
      <Container justifyContent="center" centerContent maxW="container.xl" flexDir="row">
        <Grid marginTop={TABLE_TOP_MARGIN}>
          <TableContainer minWidth="container.sm">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{COUNTRY}</Th>
                  <Th>{CITY}</Th>
                  <Th textAlign="center" width={ROW_HEADING_WIDTH}>{REMOVE}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cities.map(city => (
                  <CityLineItem 
                    key={city.id} 
                    handleUpdate={updateHandler} 
                    city={city} 
                    loading={loading[city.id] ?? null}
                    cityType={TypeOfCityEnum.VISITED}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </>
  )
}
