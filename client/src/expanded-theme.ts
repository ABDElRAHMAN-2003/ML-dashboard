//eslint-disable-next-line
import {Palette, PaletteColor} from "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette"{
    interface PalleteColor{
        [key:number]:string
    }
    interface palette{
        tertiary:PalleteColor;
    }
}

