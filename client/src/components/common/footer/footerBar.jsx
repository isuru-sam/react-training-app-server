import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

import { Grid, Typography } from "@material-ui/core";
import { Link } from "@reach/router";


class Footer extends React.Component {
   

    render() {
      //  let { classes, auth , t, i18n } = this.props;
        const currentYear = new Date().getFullYear();
        return (
            <div className="classes.root">
                <Grid container justify="center" alignItems="center" className="classes.con">
                    <Typography variant="caption" className="classes.text" component={Link} to="./">
                       Conditions
                    </Typography>
                    <Typography variant="caption" className="classes.text" component={Link} to="./">
                       PrivacyNotice
                    </Typography>
                    <Typography variant="caption" className="classes.text" component={Link} to="./">
                       Help
                    </Typography>
                    <Typography variant="caption" className="classes.text" component={Link} to="./">
                       Contatc
                    </Typography>
                    <Typography variant="caption" className="classes.text" component={Link} to="./">
                        {`© ${currentYear - 1}-${currentYear}, Test.com`}
                    </Typography>
                </Grid>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
}

//onst FooterStyles = withStyles(styles)(Footer);

//export default withTranslation('translations') (FooterStyles);
export default (withStyles(styles)(Footer));