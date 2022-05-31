import { Button } from '@mui/material'
import React from 'react'
import { resetPiPrecision } from '../services/resetPiPrecision'

function ResetPiButton({ updateDisplay }) {
  function resetPi() {
    resetPiPrecision()
      .then(() => {
        updateDisplay(3, 4.1781)
      })
      .catch((err) => {
        updateDisplay('Something went wrong')
        console.log(err)
      })
  }
  return (
    <Button
      sx={{
        width: '100%',
        textTransform: 'none',
        backgroundColor: '#CC0019',
        fontWeight: 'bold',
        ':hover': {
          backgroundColor: '#1d1d1d',
        },
      }}
      className="resetPiPrecision"
      variant="contained"
      onClick={resetPi}
    >
      Reset Pi Precision
    </Button>
  )
}

export default ResetPiButton
