import { Tr, Td, IconButton, Tooltip, theme } from "@chakra-ui/react"
import { CheckCircleIcon, CheckIcon, AddIcon } from "@chakra-ui/icons"
import React, { FC, memo } from "react"
import { City, CityRequestType, LoadingTypeObj, TypeOfCityEnum } from "./city.models"
import { CHECKBOX_ICON_HEIGHT, VISITED_TOOLTIP, WISHLIST_TOOLTIP } from "./constants"
import { useColorMode } from '@chakra-ui/react'

type Props = {
  city: City;
  handleUpdate: (data: CityRequestType) => void;
  loading: LoadingTypeObj;
}

/**
 * Display a line item with country name, city name and a button for removing the destination
 * from the list
 * @param city @example { country: United States, name: New York, id: 22, visited: true, wishlish: false } 
 * @param loading loading object with boolean to trigger button loading state
 * @param handleUpdate updates the status of a component to visited or wishlist
 */
const MainLineItem: FC<Props> = ({ city, handleUpdate, loading }) => {
  const { id, country, name, visited, wishlist } = city
  const { colorMode } = useColorMode()

  return (
    <Tr>
      <Td>{country}</Td>
      <Td>{name}</Td>
      <Td textAlign="center">
        {visited 
          ? <Tooltip label={VISITED_TOOLTIP}>
              <CheckCircleIcon 
                color={colorMode === "dark" ? theme.colors.green[50] : theme.colors.green[500]} 
                height={CHECKBOX_ICON_HEIGHT}
              />
            </Tooltip>
          : <IconButton 
              onClick={() => handleUpdate({ id, visited: true, wishlist, type: TypeOfCityEnum.VISITED })} 
              aria-label="visit-button" 
              icon={<CheckIcon />}
              isLoading={loading?.isLoading && loading?.type === TypeOfCityEnum.VISITED}
            />
        }
      </Td>
      <Td textAlign="center">
        {wishlist 
          ? <Tooltip label={WISHLIST_TOOLTIP}>
              <CheckCircleIcon 
                color={colorMode === "dark" ? theme.colors.green[50] : theme.colors.green[500]} 
                height={CHECKBOX_ICON_HEIGHT}
              />
            </Tooltip>
          : <IconButton 
              onClick={() => handleUpdate({ id, visited, wishlist: true, type: TypeOfCityEnum.WISHLIST })} 
              aria-label="wishlist-button" 
              icon={<AddIcon />} 
              isLoading={loading?.isLoading && loading?.type === TypeOfCityEnum.WISHLIST}
            />
        }
      </Td>
    </Tr>
  )
}

export default memo(MainLineItem)