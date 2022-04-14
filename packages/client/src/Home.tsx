import React, { memo, useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'
import { 
  Container, 
  InputRightElement, 
  Input, 
  Heading, 
  InputGroup, 
  IconButton, 
  VStack,
  Grid, 
  TableContainer, 
  Table, 
  Thead, 
  Tr, 
  Th, 
  Tbody 
} from '@chakra-ui/react'
import { Search2Icon, CloseIcon } from '@chakra-ui/icons';
import { 
  ADD_TO_VISITED, 
  ADD_TO_WISHLIST, 
  CITY, 
  CLOSE_ICON_LABEL, 
  COUNTRY, 
  INPUT_BUTTON_HEIGHT, 
  INPUT_BUTTON_MARGIN, 
  ROW_HEADING_WIDTH, 
  SEARCH_ICON_LABEL, 
  SMART_TRAVELLER, 
  TABLE_TOP_MARGIN 
} from './constants';
import { City, CityRequestType, LoadingType } from './city.models';
import MainLineItem from './MainLineItem';
import { GetData, UpdateOne } from './actions';
import { sortCities } from './helpers';

/**
 * Page with a searchbar that displays a list with available destinations with countries and city names
 */
const Home: FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [searchBox, setSearchBox] = useState("")
  const [loading, setLoading] = useState<LoadingType>({})

  const searchHandler = (value: string) => setSearchBox(value)

  const dataGET = async () => {
    try {
      const promiseData = GetData();
      const cities = await Promise.resolve(promiseData)
      setFilteredCities(sortCities(cities))
      setCities(sortCities(cities))
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
      setFilteredCities((prevState) => {
        const index = prevState.findIndex(city => city.id === result.id)
        const updatedCities = [ ...prevState ]
        updatedCities[index] = result;
        return updatedCities
      })
      setLoading((state) => ({ ...state, [id]: { isLoading: false, type } }))
    } catch (error) {
      setLoading((state) => ({ ...state, [id]: { isLoading: false, type } }))
      throw error
    }
  }, [])

  useEffect(() => {
    dataGET()
    return () => {
      setCities([])
    }
  }, []);

  /**
   * Filters the data for each searchbox value change
   */
  useEffect(() => {
    const transformedSearchBox = searchBox.toLocaleLowerCase()
    setFilteredCities(() => {
      return cities.filter(city => {
        const transformedCity = city.name.toLocaleLowerCase()
        const transformedCountry = city.country.toLocaleLowerCase()
        return transformedCity.includes(transformedSearchBox) || transformedCountry.includes(transformedSearchBox)
      })
    })
  }, [searchBox])

  return (
    <VStack spacing="8">
      <Heading as="h1">{SMART_TRAVELLER}</Heading>
      <Container maxW="container.xl">
        <InputGroup alignItems="center">
          <Input 
            value={searchBox} 
            onChange={(e) => searchHandler(e.target.value)}
            type="text"
            autoFocus
          />
          {searchBox.length && (
            <InputRightElement 
              right={INPUT_BUTTON_MARGIN} onClick={() => searchHandler("")} 
              children={<IconButton aria-label={CLOSE_ICON_LABEL} icon={<CloseIcon />} />} 
              height={INPUT_BUTTON_HEIGHT}
              top="unset"
              sx={{ "& button": { height: INPUT_BUTTON_HEIGHT } }}
            />
          )}
          <InputRightElement 
            children={<IconButton aria-label={SEARCH_ICON_LABEL} icon={<Search2Icon />} />} 
            height={INPUT_BUTTON_HEIGHT} 
            top="unset"
            sx={{ "& button": { height: INPUT_BUTTON_HEIGHT } }}
          />
        </InputGroup>
        <Grid marginTop={TABLE_TOP_MARGIN}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>{COUNTRY}</Th>
                  <Th>{CITY}</Th>
                  <Th textAlign="center" width={ROW_HEADING_WIDTH}>{ADD_TO_VISITED}</Th>
                  <Th textAlign="center" width={ROW_HEADING_WIDTH}>{ADD_TO_WISHLIST}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCities.map(city => 
                  <MainLineItem 
                    handleUpdate={updateHandler} 
                    key={city.id} 
                    city={city} 
                    loading={loading[city.id] ?? null}
                  />
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </VStack>
  )
}   

export default memo(Home)
