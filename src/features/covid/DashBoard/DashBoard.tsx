import React, { useEffect } from 'react'
import styles from './DashBoard.module.css'

import { makeStyles } from '@material-ui/styles'
import { AppBar, Toolbar, Typography, Container, Grid } from '@material-ui/core'

import Chart from '../Chart/Chart'
import PieChart from '../PieChart/PieChart'
import Cards from '../Cards/Cards'

import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAsyncGetCountries,
  fetchAsyncGetDaily,
  selectCountries,
} from '../covidSlice'
import SwitchCountry from '../SwitchCountry/SwitchCountry'

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: 85,
  },
}))

const DashBoard: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const countries = useSelector(selectCountries).map(({ Country }) => Country)

  useEffect(() => {
    dispatch(fetchAsyncGetCountries())
    dispatch(fetchAsyncGetDaily(countries[0]))
  }, [dispatch])

  return (
    <div>
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Covid 19 Live Dashboard
          </Typography>
          <Typography variant="body1">
            {new Date(Date.now()).toDateString()}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.content}>
        <div className={styles.container}>
          <SwitchCountry />
        </div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Cards />
          </Grid>
          <Grid item xs={12} md={7}>
            <Chart />
          </Grid>
          <Grid item xs={12} md={5}>
            <PieChart />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default DashBoard
