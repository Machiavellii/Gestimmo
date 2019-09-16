/*!

=========================================================
* Material Kit React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import InfoArea from "components/InfoArea/InfoArea.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import './CountryContainer.css'
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { countryList } from "constants/data.json";
import { connect } from "react-redux";
import { whiteColor, blackColor } from "assets/jss/material-dashboard-react";
import { Divider } from "@material-ui/core";

class CountryContainer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div >
          <GridContainer> 
            <GridItem xs={12} sm={12} md={12} className="country-container">
            <GridContainer justify="center">
              <Select
                //value={this.state.country}
                //onChange={this.handleChange("country")}
                
                label="Country"
                required
                style={{backgroundColor: whiteColor, marginTop: 2, width: 500}}
              >
                {countryList.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      //value={item.name[this.props.lang]}
                      value="Switzerland"
                    >
                      {item.name[this.props.lang]}
                    </MenuItem>
                  );
                })}
              </Select>
            </GridContainer>
            <GridContainer justify="center" style={{ marginTop: 10}}>
                <span>Currently we have <a href={'#'} style={{ color: whiteColor}}>189 properties</a> for sale</span>
            </GridContainer>
            <GridContainer justify="center">
            <span>Currently we have <a href={'#'} style={{ color: whiteColor}}>365 properties</a> for rent</span>
            </GridContainer>
            </GridItem>
          </GridContainer>

          <GridContainer>
          <GridItem xs={12} sm={12} md={6} className="hard-code1"></GridItem>
          <GridItem xs={12} sm={12} md={6} className="hard-code2"></GridItem>
          <GridItem xs={12} sm={12} md={6} className="hard-code3"></GridItem>
          <GridItem xs={12} sm={12} md={6} className="hard-code4"></GridItem>
          </GridContainer>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    mobileOpen: state.mobileOpen,
    lang: state.menu.lang
  };
};



export default connect(mapStateToProps)(CountryContainer);
