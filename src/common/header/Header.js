import React, {Component} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';

class Header extends Component {
    render(){
        return(
            <div>
               <header className="app-header">
               <p className="logo">Image Viewer</p>
                      {/* Search Box Added  */}
                    {this.props.showSearchBox === "true" ?
                    <div className="searchBox" >
                    <img src={logo} className="app-logo" alt="Search Logo"/> 
                    <FormControl className="formControl">
                      <Input className="searchText" type="text" placeholder="Search..." disableUnderline={true}/>
                    </FormControl>
                    </div>: ""}
                     {/* User Profile Icon Added  */}
                     {this.props.loggedIn === true ?
                      <IconButton 
                      color="primary" 
                      className="iconBtn" 
                      aria-label="add a profile pic"
                      edge="start"
                      size="medium">
                        <img className="profilePic" src={this.props.profilePic} alt="user"/>
                        </IconButton> : ""}
                     </header><br/><br/>
            </div>
        )
    }
}

export default Header