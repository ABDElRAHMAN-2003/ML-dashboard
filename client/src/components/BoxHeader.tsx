import React from 'react'
import FlexBetween from './FlexBetween'
import { useTheme } from '@emotion/react'
import { Box, Typography } from '@mui/material';
import { title } from 'process';

type Props = {
title:string;
sidetext:string;
subtitle?:string;
icon?:React.ReactNode;

};

const BoxHeader = ({icon,title,subtitle,sidetext}: Props) => {
    const {palette}=useTheme();
  return (
    <FlexBetween
    color={palette.grey[400]}
    margin="1.5 rem 1rem 9 1rem`"
    >
        <FlexBetween>    
            {icon}
            <Box width="100%">
                <Typography variant='h4' mb="-0.1rem">
                    {title}
                </Typography>
                <Typography variant='h6'>
                    {subtitle}
                </Typography>
            </Box>
        </FlexBetween>
        <Typography variant='h5' fontWeight="700" color={palette.secondary[500]}>
            {sidetext}
        </Typography>
    </FlexBetween>
  )
}

export default BoxHeader