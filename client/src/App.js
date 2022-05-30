import './App.css'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import GetPiButton from './components/GetPiBtn'
import ResetPiButton from './components/ResetPiBtn'
import { useEffect, useState } from 'react'
import { getNextPiPrecision } from './services/getPiPrecision'

function App() {
  const [piValue, setPiValue] = useState(0)
  const [sunCircumference, setSunCircumference] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const updateDisplay = (updatedPiValue, updatedSunCircumference) => {
    setPiValue(updatedPiValue)
    setSunCircumference(updatedSunCircumference)
  }

  useEffect(() => {
    function initialDisplay() {
      if (isLoading) {
        getNextPiPrecision()
          .then((res) => {
            setIsLoading(false)
            updateDisplay(res.pi, res.circumference)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
    initialDisplay()
  }, [])

  return (
    <div className="App">
      <Grid container rowSpacing={1} columnSpacing={3}>
        <Grid item xs={12}>
          <h1>Naluri Space Project</h1>
          <h2>Understanding The Sun Circumference</h2>
        </Grid>
      </Grid>

      <Grid
        container
        columns={2}
        justifyContent="center"
        marginTop={'50vmin'}
        item
      >
        <Grid
          sx={{
            marginRight: 1,
          }}
          display={'flex'}
          direction={'column'}
          item
        >
          <TextField
            sx={{
              bgcolor: '#fff',
              width: '100%',
              marginBottom: 1,
            }}
            className="piValue"
            id="filled-textarea"
            label="Value of Pi"
            defaultValue={isLoading ? 'Loading' : piValue}
            value={piValue}
            multiline
            variant="filled"
          />
          <GetPiButton updateDisplay={updateDisplay} />
        </Grid>

        <Grid sx={{ marginLeft: 1 }} display={'flex'} direction={'column'} item>
          <TextField
            sx={{
              bgcolor: '#fff',
              width: '100%',
              marginBottom: 1,
            }}
            className="sunCircumference"
            id="filled-textarea"
            label="Sun Circumference"
            defaultValue={isLoading ? 'Loading' : sunCircumference}
            value={sunCircumference}
            multiline
            variant="filled"
          />
          <ResetPiButton updateDisplay={updateDisplay} />{' '}
        </Grid>
      </Grid>
    </div>
  )
}

export default App
