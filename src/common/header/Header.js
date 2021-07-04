import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import logo from '../../assets/logo.svg';
import Profile from '../../screens/profile/Profile';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { MenuList, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';

const styles = (theme => ({
    menuList: {
        width: 150,
        padding: 0,
        marginLeft: 7,
    },
}))

class Header extends Component {
    constructor() {
        super();
        this.state = {
            menuIsOpen: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
            anchorEl: null,
        }
    }




    openMenuHandler = () => {
        this.setState({ menuIsOpen: true });
    }

    closeMenuHandler = () => {
        this.setState({ menuIsOpen: false });
    }

    logoutClickHandler = () => {
        sessionStorage.removeItem("access-token");
        this.setState({ loggedIn: false });
    }

    accountClickHandler = () => {
        ReactDOM.render(<Profile baseUrl={this.props.baseUrl} />, document.getElementById('root'));

    }

    onProfileIconClickHandler = (event) => {
        this.state.anchorEl ? this.setState({ anchorEl: null }) : this.setState({ anchorEl: event.currentTarget });
        this.openMenuHandler();
    }


    render() {
        const { classes } = this.props;
        return (
            <div>
                <header className="app-header">
                    <a className="logo" href="/home">Image Viewer</a>
                    {/* Search Box Added  */}
                    {this.props.showSearchBox === "true" ?
                        <div className="searchBox" >
                            <img src={logo} className="app-logo" alt="Search Logo" />
                            <FormControl className="formControl">
                                <Input className="searchText" type="text" placeholder="Search..." disableUnderline={true}
                                    onChange={this.props.searchChangeHandler} />
                            </FormControl>
                        </div> : ""}
                    {/* User Profile Icon Added  */}
                    {this.props.loggedIn === true ?
                        <span>
                            <IconButton
                                className="iconBtn"
                                size="medium"
                                onClick={event => this.onProfileIconClickHandler(event)} >
                                <Avatar className="avatar">
                                    <img
                                        className="profilePic"
                                        src={this.props.profilePic}
                                        alt="logged in user profile pic" />
                                </Avatar>
                            </IconButton>
                            <Menu
                                className="menubar"
                                anchorEl={this.state.anchorEl}
                                open={this.state.menuIsOpen}
                                onClose={this.closeMenuHandler}>
                                <MenuList className={classes.menuList}>
                                    {this.props.showAccount === "true" ?
                                        <div>
                                            <MenuItem onClick={this.accountClickHandler}>My Account</MenuItem><Divider varient="middle" />
                                        </div> : ""}
                                    <MenuItem onClick={this.logoutClickHandler}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </span> : ""}
                </header> <br />
            </div >
        )
    }
}

export default withStyles(styles)(Header)