import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import dataDaily from './apiDataDaily.json'

const apiUrl = 'https://api.covid19api.com/total/country'

type DATADAILY = typeof dataDaily

type covidState = {
  daily: DATADAILY
  country: string
}

const initialState: covidState = {
  daily: dataDaily,
  country: 'Japan',
}

// 非同期Actions
export const fetchAsyncGetDaily = createAsyncThunk(
  'covid/getDaily',
  async (country: string) => {
    const { data } = await axios.get<DATADAILY>(`${apiUrl}/${country}`)
    return { data, country }
  }
)

// Reducer
const covidReducer = createSlice({
  name: 'covid',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
export const selectCountry = (state: RootState) => state.covid.country

export default covidReducer.reducer
