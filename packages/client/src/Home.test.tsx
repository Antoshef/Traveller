import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, screen } from '@testing-library/react'
import { render } from './test-utils'
import { CLOSE_ICON_LABEL, SEARCH_ICON_LABEL, SMART_TRAVELLER } from './constants'
import Home from './Home'

describe('<Home /> component', () => {
  it('renders the Header content', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    const HeadingComponent = screen.getByText(SMART_TRAVELLER)
    expect(HeadingComponent).toBeInTheDocument()
  })

  it('renders the searchbar with its search icon', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    const InputField = screen.getByRole("textbox")
    const SearchIcon = screen.getByLabelText(SEARCH_ICON_LABEL)
    expect(InputField).toHaveFocus()
    expect(SearchIcon).toBeInTheDocument()
  })

  test('search field to accept text value, then clear value field by clicking close button, then hide the button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    const InputField = screen.getByRole("textbox")
    
    fireEvent.change(InputField, { target : { value: "Sofia" } })
    expect(InputField).toHaveValue("Sofia")

    const CloseButton = screen.getByLabelText(CLOSE_ICON_LABEL)
    fireEvent.click(CloseButton)
    
    expect(InputField).toHaveValue("")
    expect(CloseButton).not.toBeInTheDocument()
  })
})
