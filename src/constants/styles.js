import { getCSSVar } from '../utils/helpers';

export const customSelectStyles = {
  indicatorSeparator: (provided, state) => ({}),
  container: (provided, state) => ({
    ...provided,
    display: 'inline-block',
    width: 250,
    border: 'none'
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 3,
    backgroundColor: getCSSVar('--primary-background'),
    border: 'none',
    boxShadow: 'none'
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

export const customTheme = theme => ({
  ...theme,
  // borderRadius: 0,
  // colors: {
  //   ...theme.colors,
  //   primary: getCSSVar('--primary-color'),
  //   primary25: getCSSVar('--secondary-foreground'),
  // },
})