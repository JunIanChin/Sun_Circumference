import { Button } from '@mui/material'
import React from 'react'
import { getNextPiPrecision } from '../services/getPiPrecision'

function GetNextPiButton({ updateDisplay }) {
  function getPi() {
    getNextPiPrecision()
      .then((data) => {
        updateDisplay(data.pi, data.circumference)
      })
      .catch((err) => console.log(err))
  }
  return (
    <Button
      sx={{
        width: '100%',
        textTransform: 'none',
        backgroundColor: '#228B22',
        fontWeight: 'bold',
        ':hover': {
          backgroundColor: '#1d1d1d',
        },
      }}
      className="getPiPrecision"
      variant="contained"
      onClick={getPi}
    >
      Get Next Precision
    </Button>
  )
}

export default GetNextPiButton
