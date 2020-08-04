import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import   "./footerBar.styles.scss";

import { Grid, Typography } from "@material-ui/core";
import { Link } from "@reach/router";


class Footer extends React.Component {
   

    render() {
      //  let { classes, auth , t, i18n } = this.props;
        const currentYear = new Date().getFullYear();
        return (
            <div className="footer">
              <p className="footerbottom"> www.a2ztechacademy.com 2020</p>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
}

//onst FooterStyles = withStyles(styles)(Footer);

//export default withTranslation('translations') (FooterStyles);
export default (Footer);