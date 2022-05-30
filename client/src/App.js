import './App.css'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import GetPiButton from './components/GetPiBtn'
import ResetPiButton from './components/ResetPiBtn'
import { useEffect, useState } from 'react'
import { getNextPiPrecision } from './services/getPiPrecision'
import { LinearProgress } from '@mui/material'

function App() {
  const [piValue, setPiValue] = useState(0)
  const [sunCircumference, setSunCircumference] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const updateDisplay = (updatedPiValue, updatedSunCircumference) => {
    setPiValue(updatedPiValue)
    setSunCircumference(updatedSunCircumference)
  }

  useEffect(() => {
    document.title = 'Sun Circumference'
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
          container
          sx={{
            marginRight: 1,
            width: 1 / 3,
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
            value={isLoading ? 'Loading' : piValue}
            multiline
            variant="filled"
          />
          <GetPiButton updateDisplay={updateDisplay} />
        </Grid>

        <Grid
          container
          sx={{ marginLeft: 1, width: 1 / 3 }}
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
            className="sunCircumference"
            id="filled-textarea"
            label="Sun Circumference"
            value={isLoading ? 'Loading' : sunCircumference}
            multiline
            variant="filled"
          />
          <ResetPiButton updateDisplay={updateDisplay} />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
