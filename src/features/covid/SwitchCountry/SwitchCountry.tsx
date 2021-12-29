import React from 'react'
import { makeStyles } from '@material-ui/core'
import { NativeSelect, FormControl } from '@material-ui/core'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncGetDaily, selectCountries } from '../covidSlice'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(3),
    minWidth: 320,
  },
}))

const SwitchCountry: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const countries = useSelector(selectCountries).map(({ Country }) => Country)
  if (!countries[0]) return null

  return (
    <>
      <FormControl className={classes.formControl}>
        <NativeSelect
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            dispatch(fetchAsyncGetDaily(e.target.value))
          }
        >
          {countries?.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </>
  )
}

export default SwitchCountry
