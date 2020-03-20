import { getCSSVar } from '../utils/helpers';

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
      backgroundColor: getCSSVar('--primary-background'),
      border: 'none',
      boxShadow: 'none'
    })
  }, 
  option: (provided, state) => {
    return ({
      ...provided,
    })
  },
  menu: (provided, state) => ({
    ...provided,
    backgroundColor: getCSSVar('--primary-background'),
    color: getCSSVar('--primary-foreground'),
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: getCSSVar('--primary-foreground'),
  }),
  clearIndicator: (provided, state) => ({
    ...provided,
    padding: 0,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: getCSSVar('--primary-foreground'),
  }),
}

export const customSelectTheme = theme => ({
  ...theme,
  borderRadius: 3,
  colors: {
    ...theme.colors,
    primary: getCSSVar('--primary-color'),
    primary25: getCSSVar('--primary-color'),
  },
})
