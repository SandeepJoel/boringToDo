export const customSelectStyles = {
  indicatorSeparator: (provided, state) => ({}),
  container: (provided, state) => ({
    ...provided,
    display: 'inline-block',
    width: 250,
    border: 'none'
  }),
  control: (provided, state) => {
    return ({
      ...provided,
      // borderRadius: 3,
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer'
    })
  }, 
  option: (provided, state) => {
    return ({
      ...provided,
      cursor: 'pointer'
    })
  },
  menu: (provided, state) => ({
    ...provided,
    border: 'none',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    cursor: 'pointer'
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    padding: 0,
    cursor: 'pointer'
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    cursor: 'pointer'
  }),
}

export const customSelectTheme = theme => ({
  ...theme,
  borderRadius: 3,
  // colors: {
    // ...theme.colors,
    // primary: getCSSVar('--primary-background'),
    // primary25: getCSSVar('--primary-background'),
    // neutral0: getCSSVar('--primary-color')
  // },
})
