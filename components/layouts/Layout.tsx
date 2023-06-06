import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC } from 'react'

interface Props {
  children?: React.ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ flexFlow: 1}}>
      <Box sx={{ padding: '10px 20px' }}>
        {children}
      </Box>
    </Box>
  )
}
