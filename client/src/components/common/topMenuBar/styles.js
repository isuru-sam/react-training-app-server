import variables from "./../../../styles/variables.scss";

export default theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    // fontFamily: 'Futura',
    fontSize: '1rem',
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 1.2,
    letterSpacing: '0.009em',
    color: variables.white25587,
    textDecoration: 'none',
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: variables.gray6A8,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(2),
  },
  toolBar: {
    padding: theme.spacing(0),
  },
  avatarinYourBusinessBtn: {
    marginRight: '1.9%',
  },
  signUpBtn: {
    marginRight: '1.7%',
  },
  moreVertBtn: {
    padding: 0,
    color: variables.whiteD1d,
    marginRight: '1.7%',
  },
  loginBtn: {
    padding: theme.spacing(1.2, 3),
  },
  panel: {
    height: '22.75rem',
    width: '25.4375rem'
  },
  avatar: {
    height: '3.5rem',
    width: '3.5rem'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  avatarContainner: {
    padding: 12
  },
  row: {
    padding: " 1rem"
  },
  fade_text: {
    fontFamily: "Roboto",
    fontSize: "0.875rem",
    fontWeight: "normal",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.43",
    letterSpacing: "normal",
    color: "#a5a6a8"
  },
  arrow_r: {
    height: "0.75rem",
    backgroundColor: "var(--black)"
  },
  p_2: {
    paddingLeft: "1.4rem !important",
  },
  link: {
    color: "#1a6fd0"
  },
  align_right: {
    float: 'right'
  }
});