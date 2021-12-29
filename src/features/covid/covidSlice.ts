import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import dataDaily from './apiDataDaily.json'
import dataCountries from './apiDataCountries.json'

const apiUrl = 'https://api.covid19api.com'

type DATACOUNTRIES = typeof dataCountries
type DATADAILY = typeof dataDaily

type covidState = {
  countries: DATACOUNTRIES
  daily: DATADAILY
  country: string
}

const initialState: covidState = {
  countries: dataCountries,
  daily: dataDaily,
  country: '',
}

// 非同期Actions
export const fetchAsyncGetDaily = createAsyncThunk(
  'covid/getDaily',
  async (country: string) => {
    const { data } = await axios.get<DATADAILY>(
      `${apiUrl}/total/country/${country}`
    )
    return { data, country }
  }
)
export const fetchAsyncGetCountries = createAsyncThunk(
  'covid/getCountries',
  async () => {
    const { data } = await axios.get<DATACOUNTRIES>(`${apiUrl}/countries`)
    return { data }
  }
)

// Reducer
const covidReducer = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetCountries.fulfilled, (state, action) => {
      return {
        ...state,
        countries: action.payload.data,
      }
    })
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        daily: action.payload.data,
        country: action.payload.country,
      }
    })
  },
})

export const selectDaily = (state: RootState) => state.covid.daily
export const selectCountries = (state: RootState) => state.covid.countries
export const selectCountry = (state: RootState) => state.covid.country

export default covidReducer.reducer
