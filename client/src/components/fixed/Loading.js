import React from 'react'
import { LinearProgress } from '@mui/material';
export default function Loading() {
  return (
    <div className="page" >
          <div className="page-inner" >
              <LinearProgress color='success'/>
          </div>
        </div>
  )
}
