import { Tr, Td, IconButton, theme } from "@chakra-ui/react"
import { NotAllowedIcon } from "@chakra-ui/icons"
import React, { FC, memo } from "react"
import { City, CityRequestType, LoadingTypeObj, TypeOfCityEnum } from "./city.models"

type Props = {
  city: City;
  handleUpdate: (data: CityRequestType) => void;
  loading: LoadingTypeObj | null;
  cityType: TypeOfCityEnum;
}

/**
 * Display a line item with country name, city name and a button for removing the destination
 * from the list
 * @param city @example { country: United States, name: New York, id: 22, visited: true, wishlish: false } 
 * @param loading loading object with boolean to trigger button loading state
 * @param cityType value for where the component should be displayed
 * @param handleUpdate handler to remove the component from current list
 */
const CityLineItem: FC<Props> = ({ city, handleUpdate, loading, cityType }) => {
  const { id, country, name, visited, wishlist } = city
  
  return (
    <Tr>
      <Td>{country}</Td>
      <Td>{name}</Td>
      <Td textAlign="center">
        <IconButton 
          onClick={() => handleUpdate(
            { 
              id, 
              visited: cityType === TypeOfCityEnum.VISITED ? false : visited, 
              wishlist: cityType === TypeOfCityEnum.WISHLIST ? false : wishlist, 
              type: cityType
            }
          )} 
          aria-label="visit-button" 
          icon={<NotAllowedIcon />} 
          color={theme.colors.white}
          backgroundColor={theme.colors.red[600]}
          _hover={{ backgroundColor: theme.colors.red[700]}}
          isLoading={loading?.isLoading && loading?.type === cityType}
        />
      </Td>
    </Tr>
  )
}

export default memo(CityLineItem)