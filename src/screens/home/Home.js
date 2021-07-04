import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../common/header/Header';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
      card: {
        maxWidth: 520,
        margin: 20,
        height: 'auto',
        marginLeft: '4%',
    },
     avatar: {
        margin: 15,
        width: 60,
        height: 60,
     },
     hr: {
        width: 460,
     },
     icon: {
        margin: theme.spacing(1),
        fontSize: 32,
     }
});

function FavoriteBorderIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 
        2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 
        5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 
        5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
      </SvgIcon>
    );
  }

  function FavoriteIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
         3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </SvgIcon>
    );
  }


class Home extends Component{
    constructor(){
        super();
        this.state = {
            profilePic: [],
            loggedIn: sessionStorage.getItem("access_token") === "null" ? false : true,
            userImages: [],
            createdTime: [],
            username: [],
            captionText:[],
            captionTag:[],
            favClick: false,
            }
        }
    UNSAFE_componentWillMount() {

            //call to API Endpoint 2 to get profile-picture

            let xhrEndPt1 = new XMLHttpRequest();
            let that = this;
            xhrEndPt1.addEventListener("readystatechange", function(){
                if (this.readyState === 4){
                    console.log(JSON.parse(this.responseText));
                     //Had to hard code the URL as none of the two API endpoints have profile_picture in the response data
                    that.setState({profilePic: JSON.parse(this.responseText).media_url});
                }
            });
           xhrEndPt1.open("GET", this.props.baseUrl+"17933678179575908?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJWRGhqWXJyVjhiZAGhJNUtOSDRWY2ZABcDU2X2xFRXhPcnE3am83SXJ1c05sTV9XSkFtZAXpCYXoxTG5ZAY2J4blkwUFVUVlNLemg3LWdzaFNXWm5WbGo3R2VobUZALMUhLWl9RUnV3VDczVUU0ZAzlLbW5zYm56dVVmX1hJ");
            xhrEndPt1.send(null);

            //call to API End point1

            let xhrEndPt2 = new XMLHttpRequest();
            let that1 = this;
            xhrEndPt2.addEventListener("readystatechange", function(){
                if (this.readyState === 4) {
                    console.log(JSON.parse(this.responseText).data);
                    that1.setState({userImages: JSON.parse(this.responseText).data});
                    console.log(JSON.parse(this.responseText));
                    }   
            });
            xhrEndPt2.open("GET",this.props.baseUrl+"me/media?fields=id,caption,media_url,timestamp,username&access_token=IGQVJWRGhqWXJyVjhiZAGhJNUtOSDRWY2ZABcDU2X2xFRXhPcnE3am83SXJ1c05sTV9XSkFtZAXpCYXoxTG5ZAY2J4blkwUFVUVlNLemg3LWdzaFNXWm5WbGo3R2VobUZALMUhLWl9RUnV3VDczVUU0ZAzlLbW5zYm56dVVmX1hJ");
            xhrEndPt2.send(null);
        }

     render() {
        const { classes } = this.props;
               return(
            <div>
                <Header 
                baseUrl={this.props.baseUrl}
                showSearchBox="true" 
                profilePic={this.state.profilePic} 
                loggedIn={this.state.loggedIn}/>
               <div>             
                <GridList cols={2} cellHeight='auto'>
                    {this.state.userImages.map(img =>(
                        <Card className={classes.card}  >
                            <CardHeader avatar={
                             <Avatar alt="profile-Pic" src={(this.state.profilePic).toString()} className={classes.avatar}/>
                            }    
                             title={img.username}     
                             subheader={<span>{new Date(img.timestamp).toDateString()}</span>}>
                            </CardHeader>
                            <CardContent>
                            <GridListTile key={"userImg"+ img.caption} className="user-image-grid-item">
                                <img src={img.media_url} className="userImage" alt={img.caption}/>
                            </GridListTile>
                            <hr className={classes.hr}/>
                            <p className="captionText">{(img.caption)}</p>
                            </CardContent>
                         </Card>
                    ))}
                 </GridList>
                 </div>
            </div>
               )
    }
}

export default withStyles(styles)(Home);