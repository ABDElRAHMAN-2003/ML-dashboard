import {useState} from 'react'
import { Link } from 'react-router-dom';
import {Box,Typography, useTheme} from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FlexBetween from '@/components/FlexBetween';
import { SignedIn, UserButton } from "@clerk/clerk-react";
type Props = {};

const Navbar = (props: Props) => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");
  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap="0.75rem" >
        <SignedIn>
            <UserButton />
        </SignedIn>
        <RemoveRedEyeIcon sx={{fontSize:"28px"}}/>
        <Typography variant='h4' fontSize="16px">
          WIDE
        </Typography>
      </FlexBetween>

      {/*RIGHT SIDE */}
      <FlexBetween gap={"2rem"}>
        <Box sx={{"&:hover":{ color : palette.primary[100] } }}>
          <Link
          to="/"
          onClick={()=>{setSelected("dashboard")}}
          style={{
            textDecoration:"inherit",
            color: selected==="dashboard"?"inherit": palette.grey[700],
          }}
          >
          Dashbboard
          </Link>
        </Box>
        <Box sx={{"&:hover":{ color : palette.primary[100] } }}>
          <Link
          to="/predictions"
          onClick={()=>{setSelected("pred")}}
          style={{
            textDecoration:"inherit",
            color: selected==="pred"?"inherit": palette.grey[700],
          }}
          >
          Predict
          </Link>
        </Box>
      </FlexBetween>

    </FlexBetween>
  );
}

export default Navbar;