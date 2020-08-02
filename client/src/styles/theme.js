import {createMuiTheme} from "@material-ui/core/styles";
import variables from "./variables.scss";

const theme = createMuiTheme({
    typography:{
        fontFamily: ['Roboto','Archivo', 'Futura'],
        fontSize:16,
        h1:{
            fontFamily:'ArchivoBlack',
            fontSize: '6rem',
            fontWeight:'normal',
            lineHeight:1.33,
            letterSpacing:'0.09375em',
            color: variables.blackAvatarin
        },
        h2:{
            fontFamily:'Archivo',
            fontSize: '3.75rem',
            fontWeight:'normal',
            lineHeight:1.13,
            letterSpacing:'-0.03125em',
             color: variables.blackAvatarin
        },
        h3:{
            fontFamily:'Archivo',
            fontSize: '3rem',
            fontWeight:'bold',
            lineHeight:1.08,
            color: variables.blackAvatarin
        },
        h4:{
            fontFamily:'Archivo',
            fontSize: '2.125rem',
            lineHeight:1.18,
            letterSpacing:'0.015625em',
            color: variables.blackAvatarin
        },
        h5:{
            fontFamily:'Archivo',
            fontSize:'1.5rem',
            lineHeight:1.17,
            color: variables.blackAvatarin
        },
        h6:{
            fontFamily:'Archivo',
            fontSize:'1.25rem',
            lineHeight:1.2,
            letterSpacing:'0.009375em',
            color: variables.blackAvatarin
        },
        subtitle1:{
            fontFamily:'Roboto',
            fontSize:'1rem',
            lineHeight:1.5,
            letterSpacing:'0.009375em',
            color: variables.blackAvatarin
        },
        subtitle2:{
            fontFamily:'Roboto',
            fontSize:'0.875rem',
            lineHeight:1.71,
            letterSpacing:'0.00625em',
            color: variables.blackAvatarin
        },
        body1:{
            fontFamily:'Roboto',
            fontSize:'1rem',
            lineHeight:1.5,
            letterSpacing:'0.03125em',
            color: variables.blackAvatarin
        },
        body2:{
            fontFamily:'Roboto',
            fontSize:'0.875rem',
            lineHeight:1.43,
            letterSpacing:'0.015625em',
            color: variables.blackAvatarin
        },
        button:{
            fontFamily:'Roboto',
            fontSize:'0.875rem',
            fontStretch:'normal',
            fontStyle:'normal',
            fontWeight:500,
            lineHeight:1.14,
            letterSpacing:'0.078125em',
            color: variables.blackAvatarin
        },
        caption:{
            fontFamily:'Roboto',
            fontSize:'0.75rem',
            fontWeight:'normal',
            fontStretch:'normal',
            fontStyle:'normal',
            lineHeight:1.33,
            letterSpacing:'0.025em',
            color: variables.blackAvatarin
        },
        overline: {
            fontFamily:'Roboto',
            fontSize:'0.625rem',
            fontWeight:500,
            lineHeight: 1.6,
            letterSpacing:'0.09375em',
            color: variables.blackAvatarin
        }

    }
});

export default theme;