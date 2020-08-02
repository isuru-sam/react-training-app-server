import variables from "../../../styles/variables.scss";

export default theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    backgroundColor: variables.gray6A8,
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  con: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  text: {
    textDecoration: 'none',
    marginLeft: theme.spacing(3),
  }
});