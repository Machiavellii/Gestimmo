import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import {
    IconButton,
    TableSortLabel,
    Divider,
    Container,
    Button
  } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import default_avatar from "assets/profile_default.jpg";
import config from "config/config";
import { connect } from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LeftView from "./LeftView/LeftView"
import RightView from "./RightView/RightView"
import { NotificationManager } from "react-notifications";
import * as api from "service/Api";
import MenuItem from "@material-ui/core/MenuItem";
import { countryList, correspondenceList, languageList } from "constants/data.json";
import FormHelperText from '@material-ui/core/FormHelperText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(1)
  },
  toolbar: theme.mixins.toolbar,
  formControl: {
    // margin: theme.spacing(1),
    marginTop: theme.spacing(2)
  },
  coverImg: {
    width: 240,
    // height: 180,
    objectFit: "contain",
    // backgroundColor: "rgb(0,0,0,0.1)"
  }
});

class ContactPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
          avatarUrl: "",
          address: "",
          contactPartner: "",
          phone: "",
          correspondenceType: "",
          email: "",
          website: ""
        };
    }

    componentDidMount() {
      this.getContactProfile();
    }

    getContactProfile = async() => {
      const result = await api.getContactProfile();
      if(result.status){
          const contactProfile = result.contactProfile;
          this.state = contactProfile;
          this.setState({...this.state})
      }
    }
    
    handleInput = input => e => {
      this.setState({ [input]: e.target.value });
    };
  
    handleChooseContactAvatar = async event => {
      if (event.target.files.length === 0) {
        return;
      }
      const file = event.target.files[0];
      const data = new FormData();
      data.append("image", file);
      const result = await api.uploadContactAvatar(data);
      if (result.status) {
        this.setState({ avatarUrl: result.avatarUrl });
      }
    };

    handleSaveContactProfile = async() => {
      const {
        address,
        contactPartner,
        phone,
        correspondenceType,
        email,
        website
      } = this.state;

      const data = {
        address: address,
        contactPartner: contactPartner,
        phone: phone,
        correspondenceType: correspondenceType,
        email: email,
        website: website
      };

      const result = await api.updateBasicContactProfile(data);
      if(result.status){
          NotificationManager.success("Success");
      }
      else{
          NotificationManager.warning("Failed");
      }
    };

    render() {
        const { classes } = this.props;
        const {
          address,
          contactPartner,
          phone,
          correspondenceType,
          email,
          website,
          avatarUrl
        } = this.state;
        return(
            <div>
                <Header 
                    color="success"
                    brand="Gestimmo"
                    rightLinks={<HeaderLinks />}
                    fixed
                />
                <div className={classes.toolbar} />
                <div style={{ padding: 20 }}></div>
                <Container>
                <GridContainer style={{ maxWidth: 480 }}>
                  <GridItem xs={12} sm={6}>
                    <div>
                      <img
                        alt=""
                        src={avatarUrl ? config.apiBaseUrl + avatarUrl : default_avatar}
                        className={classes.coverImg}
                      />
                      <div
                        style={{
                          width: 240,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                      <Button
                        style={{ marginTop: 10 }}
                        variant="outlined"
                        component="label"
                      >
                        <input
                          accept="Image/*"
                          style={{ display: "none" }}
                          type="file"
                          onChange={this.handleChooseContactAvatar}
                        />
                        Pick up
                      </Button>
                    </div>
                  </div>
                </GridItem>
                <GridContainer style={{ marginLeft: 10 }}>
                  <GridItem md={6}>
                    <h3>Contact Name</h3>
                    <h5>Partner</h5>
                    <div style={{ display: "flex", marginTop: 4, marginBottom: 8 }}>
                      <Button variant="text" color="primary" onClick={() => {}}>
                        <EditIcon />
                      </Button>
                      <div style={{ flexGrow: 1 }} />
                      <Button variant="text" color="primary" onClick={() => {}}>
                        <DeleteIcon />
                      </Button>
                    </div>
                  </GridItem>
                </GridContainer>
                  <GridContainer style={{ marginLeft: 8 }}>
                    <GridItem xs={12} md={6}>
                      <TextField
                        id="address"
                        label="Address"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={address}
                        onChange={this.handleInput("address")}
                      />
                    </GridItem>
                    <GridItem xs={12} md={6}>
                      <TextField
                        id="phone"
                        label="Phone"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={phone}
                        onChange={this.handleInput("phone")}
                      />
                    </GridItem>
                    <GridItem xs={12} md={6} style={{ marginTop: 10 }}>
                      <FormHelperText>Contact partner</FormHelperText>
                      <Select
                        id="contact-partner"
                        label="Contact Partner"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={contactPartner}
                        onChange={this.handleInput("contactPartner")}
                      >
                        0
                      </Select>
                    </GridItem>
                    <GridItem xs={12} md={6} style={{ marginTop: 10 }}>
                      <FormHelperText>Correspondence type</FormHelperText>
                      <Select
                        id="correspondenceType"
                        label="Correspondence type"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={correspondenceType}
                        onChange={this.handleInput("correspondenceType")}
                      >
                        {correspondenceList.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={item}
                            >
                            {item}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </GridItem>
                    <GridItem xs={12} md={6}>
                      <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={email}
                        onChange={this.handleInput("email")}
                      />
                    </GridItem>
                    <GridItem xs={12} md={6}>
                      <TextField
                        id="website"
                        label="Website"
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        value={website}
                        onChange={this.handleInput("website")}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridItem xs={12}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Button
                        style={{ marginTop: 10 }}
                        variant="contained"
                        color="primary"
                        //   component="label"
                        onClick={this.handleSaveContactProfile}
                      >
                        Save Basic Changes
                      </Button>
                    </div>
                  </GridItem>
               </GridContainer>
               </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mobileOpen: state.mobileOpen,
        lang: state.menu.lang
    };
  };

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(ContactPage));