import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { AppBar,TextField,RaisedButton,LeftNav,Paper,Avatar,Divider,IconButton,Checkbox,FlatButton,Dialog } from 'material-ui/lib';
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn } from 'material-ui/lib/table';

import {List,ListItem} from 'material-ui/lib/lists';

import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';

import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ActionSearch from 'material-ui/lib/svg-icons/action/search';
import NavigationMenu from 'material-ui/lib/svg-icons/navigation/menu';
import ImageBrush from 'material-ui/lib/svg-icons/image/brush';
import ActionDashboard from 'material-ui/lib/svg-icons/action/dashboard';
import ActionList from 'material-ui/lib/svg-icons/action/list';
import ActionVisibility from 'material-ui/lib/svg-icons/action/visibility';
import ActionWatchLater from 'material-ui/lib/svg-icons/action/watch-later';
import ActionFace from 'material-ui/lib/svg-icons/action/face';
import ActionAccountCircle from 'material-ui/lib/svg-icons/action/account-circle';

import { Jobs,Tags } from '../api/jobs.js';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


const style = {
  height: 100,
  width: "100%",
  margin: 0,
  textAlign: 'center',
  display: 'inline-block',
  backgroundColor:'#1abc9c'
};

const styleTextPaper = {
  paddingTop: 40,
  color:'#34495e',
};

const styles = {
  mItem:{
    backgroundColor:'#34495e',
    borderRadius:'0%',
    color:'white',
    border:'solid 0px'
  },
  mItemSelected:{
      backgroundColor:'#2b3d4f',
      borderRadius:'0%',
      color:'#1abc9c',
      border:'solid 0px'
    },
  mItemAvLeft:{
    border:'solid 0px',
    borderRadius:'0%',
    backgroundColor:"#ffffffff",
    color:"#798795" 
    },
  mItemAvLeftSelected:{
    border:'solid 0px',
    borderRadius:'0%',
    backgroundColor:"#ffffffff",
    color:"#1abc9c"
    },
  mItemIconAvLeftSelected:{
    width:42,
    height:42,
    margin:0,
    },
  mItemIconAvLeft:{
    width:40,
    height:40,
    margin:0,
    },
  mItemTxt:{
    color:"#798795", 
  },
  mItemTxtSelected:{
    color:"#1abc9c",
  },

  btnCancelDialog:{
    backgroundColor:'#2C3E50',
    borderRadius:6,
    margin:2,
    color:'#ffffff',
    fontWeight:'bold',
  }
}

const customContentStyle = {
  width: '98%',
  maxWidth: 'none',
};


export default class TagText extends React.Component {
   constructor(props){
    super(props);
   } 
   render(){
      return(
           <p dangerouslySetInnerHTML={{__html:this.props.text}}></p>
      );
    }
}

export default class JobHashtagUser extends React.Component {

   constructor(props){
    super(props);
    this.state ={
      isMoserEnter:false,
    }
   } 

   componentWillMount(){
    //console.log(this.props.jobhashtag);
    }

   deleteThisJob(){
      //Meteor.call('jobs.remove',this.props.job._id);
    }
    // this.props.jobhashtag.hashtags.map(function(listValue){
    //             return
   onMouseEnterItem(){
    this.setState({isMoserEnter:true});
   }

   onMouseLeaveItem(){
    this.setState({isMoserEnter:false});
   }

   render(){
      return(
               <div style={{paddingTop:2,paddingLeft:2,flexWrap:'nowrap'}}> 
                  <FlatButton
                    style={{backgroundColor:'#1abc9c',borderRadius:6,color:'#ffffff'}}
                    label={this.props.jobhashtag.tag}
                    labelStyle={ this.state.isMoserEnter ? {color:'#ffffff',fontWeight:'bold',fontSize:'15px'}: {color:'#ffffff',fontWeight:'bold'}}
                    onClick={this.props.onClickAbc.bind(this,this.props.jobhashtag.tag)}
                    labelPosition="before"
                    onMouseLeave={this.onMouseLeaveItem.bind(this)}
                    onMouseEnter={this.onMouseEnterItem.bind(this)}
                  />
              </div>   
      );
    }
}

JobHashtagUser.propTypes = {
    jobhashtag: PropTypes.object.isRequired,
}
/*
 *
 * Class Job.
 *
 */
export default class Job extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  
  handleOpen(){
    this.setState({open: !this.state.open});
  }

  componentWillMount(){
    this.setText();
  }

  componentDidMount(){
    this.setText();
  }

  toggleChecked(){
      Meteor.call('jobs.setChecked',this.props.job._id,this.props.job.checked);
   }

  deleteThisJob(){
      Meteor.call('jobs.remove',this.props.job._id);
    }
  showDialog(){

  }
  setText(){
   Meteor.user();
  }  
  render(){
    const actions = [
      <FlatButton
        style={styles.btnCancelDialog}
        label="Cancel"
        labelStyle={{color:'#ffffff',fontWeight:'bold'}}
        secondary={true}
        onTouchTap={this.handleOpen.bind(this)}
      />,
      <FlatButton
        style={styles.btnCancelDialog}
        label="Submit"
        labelStyle={{color:'#ffffff',fontWeight:'bold'}}
        secondary={true}
        onTouchTap={this.handleOpen.bind(this)}
      />,
    ];

    var avatar = "http://graph.facebook.com/"+this.props.job.avatar+"/picture/?type=large";
      //const taskClassName = this.props.job.checked ? '' : '';
      return (
        <div>
          <ListItem
              style={{backgroundColor:"#293a4a",color:'white',marginBottom:2,borderRadius:12,marginRight:2,marginLeft:2}}
              primaryText={this.props.job.username}
              leftAvatar={<Avatar src={avatar}/>}
              rightIcon={<NavigationClose onTouchTap={this.deleteThisJob.bind(this)}/>  }
              secondaryText={<TagText text={this.props.job.text}/>}
              onTouchTap={this.handleOpen.bind(this)}
            />
          <Dialog
            title={
                        <h3 style={{margin:0,padding:'24px 24px 0 24px',color:'#2C3E50'}} >
                            Tiêu Đề
                           <IconButton onClick={this.handleOpen.bind(this)}style={{float:'right',bottom:'12px',left:'1%'}}><NavigationClose /> </IconButton> 
                        </h3> 
                   
                  }
            titleStyle={{color:'#2C3E50',fontWeight:'bold',borderColor:'#BDC3C7',borderStyle:'solid',borderWidth:'0px 0px 3px 0px'}}
            bodyStyle={{color:'#34495E'}}
            paperStyle={{background:'#eff0f2',backgroundColor:'#1abc9c',borderRadius:16}}
            actionsContainerStyle={{background:'#1abc9c',borderRadius:'0px 0px 16px 16px',borderColor:'#ffffff',borderStyle:'solid',borderWidth:'0px 0px 0px 0px'}}
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
          >
            
           <TagText text={this.props.job.text} />
        </Dialog>
        </div>
        );
  }
}

Job.propTypes = {
    job: PropTypes.object.isRequired,
};

/*
 *
 * Class App
 *
 */

export default class App extends React.Component {

 /*
  * Constructor....
  */
  constructor(props,context) {
    super(props,context);
    this.state = { open: false, hideCompleted: false, isSearch: false ,testShowImg:false,testShowImgTime:false,testShowImgList:false,testShowImgEye:false,isFocusTextFieldSearch:false
      ,isFocusTextFieldInsert:false,isMouseLeaveActionBar:false,avatar:"",name:"",displayTag:false,tagsUser:[""],openDialog:false};
  }

 /*
  * submit a job.....
  */
	handleSubmit(event){

    event.preventDefault();
    
    var inputText = this.refs.myField.getValue();

    if(inputText!="") {

      var patt = /#\w+(?= |)/g;
      var hashtagtext = inputText.match(patt);
      if(hashtagtext!=null){
        hashtagtext = [ ...new Set(hashtagtext)];
        for(i=0;i<hashtagtext.length;i++) { 
          inputText=inputText.replace(new RegExp(hashtagtext[i],"gm"),"<b style={{color:'#1abc9c'}}>"+hashtagtext[i]+"</b>");
          //console.log(inputText);
          }
        
        Meteor.call('jobs.insert',inputText,hashtagtext);
      }
      else {
        hashtagtext=[];
        Meteor.call('jobs.insert',inputText,hashtagtext);
      }
     this.refs.myField.setValue("");
    }

	}
 
 /*
  * submit event search.....
  */
  handleSubmitSearch(event){
    event.preventDefault();
    let text = this.refs.myFieldSearch.getValue();
    if(text!=""){
      this.setState({isSearch:true,displayTag:false});
    }
  }

  
 /*
  * Render jobs.....
  */
	renderJobs(){

    let filteredJobs = this.props.jobs;//array
    
    //search ok
    if(this.state.isSearch){
        
      let text = this.refs.myFieldSearch.getValue();
      if(text!="") {
        let hs = Jobs.find({'hashtags':text}).fetch();
        filteredJobs = hs;
      }
    }

    // if(this.state.hideCompleted) {
    //   filteredJobs = filteredJobs.filter(job => !job.checked);
    // }
		return filteredJobs.map((job)=>(
		 <Job key={job._id} job={job} />
		));
	}

 /*
  * Render jobs of user.....
  */
  renderJobsOfUser(){
    //let filteredJobs = this.props.jobs;
    let filteredTags = this.props.tags;//array
    //console.log(this.props.tags);
    //filteredJobs = filteredJobs.filter(job => job.owner == Meteor.userId() );

    return filteredTags.map((tag)=>(
         <JobHashtagUser key={tag._id} jobhashtag={tag} onClickAbc={this.Abc.bind(this)}/>
        ));
  }

 /*
  * Render avatar of user.....
  */
  renderAvatar(){
    return "http://graph.facebook.com/"+this.state.avatar+"/picture/?type=large";
  }


  // toggleHideCompleted(){
  //   this.setState({
  //     hideCompleted: !this.state.hideCompleted,
  //   });
  // }
 

 /*
  * Navigation drawer.....
  */
  handleToggle(){
    this.setState({ avatar:this.props.currentUser.services.facebook.id});
    this.setState({ name:this.props.currentUser.profile.name});
		this.setState({	open: !this.state.open,displayTag:false});
	}

 /*
  * Left drawer.....
  */
  handleLogout(){
      Meteor.logout(function(err){
          if(err)
            throw new Meteor.Error('Logout faile');
          else
            FlowRouter.go('home');
        });
  }

  // <label className="hide-completed">
  //     <input type="checkbox" 
  //       readOnly
  //       checked={this.state.hideCompleted}
  //       onClick={this.toggleHideCompleted.bind(this)} 
  //     />
  //      Ẩn Tất Cả 
  // </label>

 /*
  * UI App.....
  */

  showImg(){
    this.setState({testShowImg: !this.state.testShowImg,testShowImgTime:false,testShowImgEye:false,testShowImgList:false });
  }

  showImgTime(){
    this.setState({testShowImg: false,testShowImgTime:!this.state.testShowImgTime ,testShowImgEye:false,testShowImgList:false });
  }

  showImgList(){
    this.setState({testShowImg: false,testShowImgTime:false,testShowImgEye:false,testShowImgList:!this.state.testShowImgList });
  }

  showImgEye(){
    this.setState({testShowImg: false,testShowImgTime:false,testShowImgEye:!this.state.testShowImgEye,testShowImgList:false });
  }

  onFocusTextFieldSearch(){
    this.setState({ isFocusTextFieldSearch : true });
  }

  onBlurTextFieldSearch(){
    this.setState({ isFocusTextFieldSearch : false });
  }

  onFocusTextFieldInsert(){
    this.setState({ isFocusTextFieldInsert : true });
  }

  onBlurTextFieldInsert(){
    this.setState({ isFocusTextFieldInsert : false });
  }
  onTitleActionBarMouseLeave(){
    this.setState({ isMouseLeaveActionBar : false });
  }
  
  onTitleActionBarMouseEnter(){
    this.setState({ isMouseLeaveActionBar : true });
  }
	
  onClickItemInformation(){
    console.log(this.props.currentUser.services.facebook);
    this.props.inforCurrentUser.name = this.props.currentUser.services.facebook.name;
    this.props.inforCurrentUser.age = this.props.currentUser.services.facebook.age_range.min ;
    this.props.inforCurrentUser.email = this.props.currentUser.services.facebook.email ;
    this.props.inforCurrentUser.gender = this.props.currentUser.services.facebook.gender ;
    console.log(this.props.inforCurrentUser);

    this.setState({testShowImg:true, testShowImgTime:false, testShowImgEye:false,testShowImgList:false,openDialog:!this.state.openDialog });
  }

  handleOpenDialog(){
    this.setState({openDialog:!this.state.openDialog });

    //console.log(this.props.inforCurrentUser);
     // { this.props.currentUser.services.facebook.name}
     //            { this.props.currentUser.services.facebook.id}
     //            { this.props.currentUser.services.facebook.email}
     //            { this.props.currentUser.services.facebook.expiresAt}
     //            { this.props.currentUser.services.facebook.first_name}
     //            { this.props.currentUser.services.facebook.last_name}
     //            { this.props.currentUser.services.facebook.gender}
     //            { this.props.currentUser.services.facebook.link}
     //            { this.props.currentUser.services.facebook.locale}
  }

  Abc(){
    console.log(arguments);

    let hs = Jobs.find({'hashtags':arguments[0]}).fetch();
    hs = hs.filter(job => job.owner == Meteor.userId() );
    this.setState({open:!this.state.open,displayTag:true,tagsUser:hs});

  }

  renderTags(){
    return this.state.tagsUser.map((job)=>(
     <Job key={job._id} job={job} />
    ));
  }

                  // <AppBar
                  //   style={{borderRadius:'6',backgroundColor:'#1abc9c'}}
                  //   title={ <strong>Bảng Công Việc</strong>}
                  //   titleStyle={ this.state.isMouseLeaveActionBar ?{color:'#354a5e'}:{color:'#ffffff'} }
                  //   iconClassNameRight="muidocs-icon-navigation-expand-more"
                  //   onLeftIconButtonTouchTap = {this.handleToggle.bind(this)}
                  //  >
                      
                  //  </AppBar>

                  // <Toolbar>
                  //   <ToolbarGroup firstChild={true} float="left">
                      
                  //     <IconButton firstChild={true} touch={true}>
                  //         <ActionDashboard />
                  //     </IconButton>
                  //     <ToolbarTitle text="ThienPhuoc" />
                  //   </ToolbarGroup>
                  // </Toolbar>

                   //  <AppBar
                   //  style={{borderRadius:'6',backgroundColor:'#1abc9c'}}
                   //  title={ <strong>Jobs</strong>}
                   //  titleStyle={ this.state.isMouseLeaveActionBar ?{color:'#354a5e'}:{color:'#ffffff'} }
                   //  onLeftIconButtonTouchTap = {this.handleToggle.bind(this)}
                   //  iconClassNameRight= { 
                   //    <div>
                   //      <FlatButton label="Default" />
                   //      <TextField  hintText="hahahaha" /> 
                   //    </div>
                   //  }
                   //  >
                   // </AppBar>
                  //  <ListItem
                  //   style={{backgroundColor:"#34495e",color:'white',width:"100%"}}
                  //   primaryText="Jobs"
                  //   leftAvatar={<Avatar src="ok-128.jpg"/>}
                  //   rightIcon={<NavigationClose/>  }
                  //   secondaryText={<div style={{color:'#798795'}}>a</div>}
                  // />

                  //  <Paper style={{display:'flex',backgroundColor:'#1abc9c',flexDirection:'row',flexWrap:'nowrap'}} zDepth={4} >
                  //   <FlatButton label="Home" style={{flex:'1'}}/>
                  
                  //   <TextField
                  //     ref="myFieldSearch"
                  //     underlineStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
                  //     underlineFocusStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
                  //     hintText="Bạn muốn tìm gì...?"
                  //     hintStyle={{bottom:5,paddingLeft:10,color:'#C4CACC',fontWeight:'bold',fontSize:12}}
                  //     inputStyle={{paddingLeft:10,color:'#C4CACC',fontWeight:'bold'}}
                  //     style={ this.state.isFocusTextFieldSearch ? {height:"36",width:"128",backgroundColor:'#293a4a',borderRadius:'6',border: 'solid 2px',borderColor:"#b5ebe0",float:'right',margin:'3'}:
                  //               {height:"36",width:"128",backgroundColor:'#293a4a',borderRadius:'6',border: 'solid 2px',borderColor:"#354a5e",float:'right',margin:'3'}
                  //           }
                  //     onFocus={this.onFocusTextFieldSearch.bind(this)}
                  //     onBlur ={this.onBlurTextFieldSearch.bind(this)}
                  //     icon={<ActionSearch />}
                  //     >
                  //   </TextField>
                  //   <FlatButton 
                  //         style={{borderRadius:'6',border:'solid 2px',borderColor:'#354a5e',float:'right',margin:3}}
                  //         backgroundColor='#354a5e'
                  //         label="Tìm Kiếm"
                  //         labelStyle={{fontSize:12,fontWeight:'bold'}} 
                  //         primary={true}
                  //         onTouchTap={this.handleSubmitSearch.bind(this)}
                  //        />
                  // </Paper>
  render(){

    const actions = [
      <FlatButton
        style={styles.btnCancelDialog}
        label="Cancel"
        primary={true}
        onTouchTap={this.handleOpenDialog.bind(this)}
      />,
      <FlatButton 
        style={styles.btnCancelDialog}
        label="Submit"
        primary={true}
        onTouchTap={this.handleOpenDialog.bind(this)}
      />,
    ];
		return(
				<div >
                <div>
                    <AppBar
                      style={{borderRadius:'6',backgroundColor:'#1abc9c',flexWrap:'nowrap'}}
                      title={ <strong>Jobs</strong>}
                      titleStyle={ this.state.isMouseLeaveActionBar ?{color:'#354a5e',fontSize:12}:{color:'#ffffff',fontSize:16} }
                      onLeftIconButtonTouchTap = {this.handleToggle.bind(this)}
                      iconElementRight= {
                          <div>
                              <TextField
                                ref="myFieldSearch"
                                underlineStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
                                underlineFocusStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
                                hintText="Bạn muốn tìm gì...?"
                                hintStyle={{bottom:5,paddingLeft:10,color:'#C4CACC',fontWeight:'bold',fontSize:12}}
                                inputStyle={{paddingLeft:10,color:'#C4CACC',fontWeight:'bold'}}
                                style={ this.state.isFocusTextFieldSearch ? {height:"36",width:"300%",backgroundColor:'#293a4a',borderRadius:'6',border: 'solid 2px',borderColor:"#b5ebe0",position:'absolute',right:'80%',top:'6%'}:
                                          {height:"36",width:"300%",backgroundColor:'#293a4a',borderRadius:'6',border: 'solid 2px',borderColor:"#f0ffff ",position:'absolute',right:'80%',top:'6%'}
                                      }
                                onFocus={this.onFocusTextFieldSearch.bind(this)}
                                onBlur ={this.onBlurTextFieldSearch.bind(this)}
                                >
                              </TextField>,
                              <IconButton onClick={this.handleSubmitSearch.bind(this)}>
                                <ActionSearch color='#ffffff'/>
                              </IconButton>
                         </div>  
                      }
                      >
                   </AppBar>
                </div>

                <div style={{borderRadius:6, backgroundColor:'#34495e'}}>
                 <Divider
                     style={{height:'2',backgroundColor:'#2b3d4f',marginTop:5}}
                   >
                  </Divider> 
                <div style={{paddingTop:10,paddingLeft:5,paddingRight:10}}>
                <TextField
                      style={ this.state.isFocusTextFieldInsert?{fullWidth:true,backgroundColor:'#293a4a',width:'100%',borderRadius:'6',border: 'solid 2px',borderColor:'#b5ebe0'}:
                        {fullWidth:true,backgroundColor:'#293a4a',width:'100%',borderRadius:'6',border: 'solid 2px',borderColor:'#1abc9c'}
                    }
                      ref="myField"
                      onEnterKeyDown={this.handleSubmit.bind(this)}  
                      hintText="Nhập công việc nào...!"
                      hintStyle={{bottom:35,paddingLeft:10,color:'#C4CACC',fontWeight:'bold'}}
                      inputStyle={{color:'#C4CACC',paddingLeft:10,fontWeight:'bold'}}
                      multiLine={true}
                      rows={2}
                      rowsMax={4}
                      underlineStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
                      underlineFocusStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
                      onFocus={this.onFocusTextFieldInsert.bind(this)}
                      onBlur ={this.onBlurTextFieldInsert.bind(this)}
                      />
                </div>          
                
                <div  style={{paddingLeft:5, paddingBottom:10,paddingTop:10}} >

  						  <FlatButton
                      style={{backgroundColor:'#1abc9c',borderRadius:'6',border: 'solid 2px',borderColor:'#1abc9c'}}
                      label="Thêm Việc"
                      labelStyle={{color:'#ffffff',fontWeight:'bold'}} 
                      primary={true} 
                      onTouchTap={this.handleSubmit.bind(this)}/>
                </div >
                
                
                <Divider
                     style={{height:'2',backgroundColor:'#2b3d4f',}}
                   />

                <List style={{ backgroundColor:'#34495e',borderRadius:'6'}}>
                {
                  !this.state.displayTag?this.renderJobs():this.renderTags()
                }
                </List>

                </div>

				        <LeftNav
                      style={{backgroundColor:'#34495e',borderRadius:'6'}}
    				          docked={false}
    				          open={this.state.open}
    				          onRequestChange={open => this.setState({open})}>

								  <Paper style={style} zDepth={1}>
                     <ListItem
                      style={{ color:'#34495e',}} 
                      disabled={true}
                      leftAvatar={
                        <Avatar src={this.renderAvatar()} 
                                 size={60}
                        />
                      }
                      >
                        <div style={{paddingTop:15}}><strong >{this.state.name}</strong> </div>
                     </ListItem>
                  </Paper>

                  {/*    Menu Item 1    */ }
                   <ListItem
                    style={ this.state.testShowImg ?{backgroundColor:'#2b3d4f',borderRadius:'0%',color:'#1abc9c', border: 'solid 0px'}:{backgroundColor:'#34495e',borderRadius:'0%',color:'white', border: 'solid 0px'} }
                    leftAvatar={this.state.testShowImg ? <Avatar color="#1abc9c" style={styles.mItemAvLeftSelected}  icon={<ActionAccountCircle style={styles.mItemIconAvLeftSelected}/> } /> : 
                                                             <Avatar color="#798795" style={styles.mItemAvLeft} icon={<ActionAccountCircle style={styles.mItemIconAvLeft}/>} />}
                    rightAvatar={this.state.testShowImg ? <Avatar src="check_icon2.png" /> : <Avatar src="check_icon.png"/>}
                    onClick = {this.onClickItemInformation.bind(this)}
                    primaryText={<strong>Thông Tin</strong>}
                    onMouseEnter={this.showImg.bind(this)}
                    onMouseLeave={this.showImg.bind(this)}
                    secondaryText= {this.state.testShowImg ? <div style={styles.mItemTxtSelected} > Nơi lưu trữ thông tin cá nhân của ban... </div> : <div style={styles.mItemTxt} > Nơi lưu trữ thông tin cá nhân của ban... </div>}
                  />
                  
                  {/*     Menu Item 2    */ }
                  <Divider style={{height:'2',backgroundColor:'#2b3d4f',}} />
                   <ListItem
                    style={this.state.testShowImgTime ?styles.mItemSelected:styles.mItem}
                    leftAvatar={this.state.testShowImgTime ? <Avatar color="#1abc9c" style={styles.mItemAvLeftSelected}  icon={<ActionWatchLater style={styles.mItemIconAvLeftSelected}/> } /> : 
                                                             <Avatar color="#798795" style={styles.mItemAvLeft} icon={<ActionWatchLater style={styles.mItemIconAvLeft}/>} />}
                    rightAvatar={this.state.testShowImgTime ? <Avatar src="check_icon2.png" /> : <Avatar src="check_icon.png"/>}
                    onClick = {this.showImgTime.bind(this)}
                    onMouseEnter={this.showImgTime.bind(this)}
                    onMouseLeave={this.showImgTime.bind(this)}
                    primaryText={<strong>Lịch Sử Tin Tức</strong>}
                    secondaryText= {this.state.testShowImgTime ? <div style={styles.mItemTxtSelected} > Nơi lưu trữ thông tin cá nhân của ban... </div> : <div style={styles.mItemTxt} > Nơi lưu trữ thông tin cá nhân của ban... </div>}
                  />

                  {/*     Menu Item 3    */ }
                  <Divider style={{height:'2',backgroundColor:'#2b3d4f',}} />
                  <ListItem
                    style={this.state.testShowImgList ?styles.mItemSelected:styles.mItem}
                    leftAvatar={this.state.testShowImgList ? <Avatar color="#1abc9c" style={styles.mItemAvLeftSelected}  icon={<ActionList style={styles.mItemIconAvLeftSelected}/> } /> : 
                                                             <Avatar color="#798795" style={styles.mItemAvLeft} icon={<ActionList style={styles.mItemIconAvLeft}/>} />}
                    rightAvatar={this.state.testShowImgList ? <Avatar src="check_icon2.png" /> : <Avatar src="check_icon.png"/>}
                    onClick = {this.showImgList.bind(this)}
                     onMouseEnter={this.showImgList.bind(this)}
                    onMouseLeave={this.showImgList.bind(this)}
                    primaryText={<strong>Danh Sách Bạn Bè</strong>}
                    secondaryText= {this.state.testShowImgList ? <div style={styles.mItemTxtSelected} > Hiển thị danh sách bạn bè của ban... </div> : <div style={styles.mItemTxt} > Hiển thị danh sách bạn bè của ban... </div>}
                  />

                  {/*     Menu Item 4    */ }
                  <Divider style={{height:'2',backgroundColor:'#2b3d4f',}}/>
                  <ListItem
                    style={this.state.testShowImgEye ?styles.mItemSelected:styles.mItem }
                    leftAvatar={this.state.testShowImgEye ? <Avatar color="#1abc9c" style={styles.mItemAvLeftSelected} icon={<ActionVisibility style={styles.mItemIconAvLeftSelected} />} /> : 
                                                            <Avatar color="#798795" style={styles.mItemAvLeft} icon={<ActionVisibility style={styles.mItemIconAvLeft} />} /> }
                    rightAvatar={this.state.testShowImgEye ? <Avatar src="check_icon2.png" />:<Avatar src="check_icon.png"/>}
                    onClick = {this.showImgEye.bind(this)}
                    onMouseEnter={this.showImgEye.bind(this)}
                    onMouseLeave={this.showImgEye.bind(this)}
                    primaryText={<strong>Kết Nối</strong>}
                    secondaryText= {this.state.testShowImgEye ? <div style={styles.mItemTxtSelected} > Kết nối đến những người quanh ban...</div> : <div style={styles.mItemTxt}> Kết nối đến những người quanh ban... </div>}
                  />

                  {/*     Button Logout   */ }
                  <Divider style={{height:'2',backgroundColor:'#2b3d4f'}}/>
                  <div style={{margin:10}}>  
                   <RaisedButton
                      style={{ borderRadius:'6',border: 'solid 2px',borderColor:'#1abc9c'}}
                      backgroundColor='#1abc9c'
                      hoverColor
                      label="Logout"
                      labelStyle={{fontWeight:'bold'}} 
                      primary={true} 
                      onTouchTap={this.handleLogout.bind(this)}/> 
                  </div>

                   {/*     List tag   */ }
                  <Divider style={{height:'5',backgroundColor:'white',boxShadow:'5px 1px 2px #888888'}}/>
                    {this.renderJobsOfUser()}
                </LeftNav>
        				<Dialog
                title="Thông Tin Người Dùng"
                titleStyle={{color:'#2C3E50',fontWeight:'bold',borderColor:'#ffffff',borderStyle:'solid',borderWidth:'0px 0px 0px 0px'}}
                bodyStyle={{color:'#34495E'}}
                paperStyle={{background:'#eff0f2',backgroundColor:'#1abc9c',borderRadius:16}}
                actionsContainerStyle={{background:'#1abc9c',borderRadius:'0px 0px 16px 16px',borderColor:'#ffffff',borderStyle:'solid',borderWidth:'0px 0px 0px 0px'}}
                actions={actions}
                modal={true}
                contentStyle={customContentStyle}
                open={this.state.openDialog}
              >
              {
                <div>
                <b>Tên:  </b>       <b style={{color:'#1abc9c'}}>{this.props.inforCurrentUser.name} </b> <br/><br/>
                <b>Tuổi:  </b>      <b style={{color:'#1abc9c'}}> {this.props.inforCurrentUser.age}</b><br/><br/>
                <b>Email:  </b>     <b style={{color:'#1abc9c'}}> {this.props.inforCurrentUser.email}</b><br/><br/>
                <b>Giới tính: </b>  <b style={{color:'#1abc9c'}}> {this.props.inforCurrentUser.gender}</b>
                </div>
              }
            </Dialog>
				</div>

			);
	}
}

App.defaultProps={
      inforCurrentUser:{
      name:'None',
      age:'None',
      email:'None@gmail.com',
      gender:'None',
      }
};
App.propTypes = {
  jobs: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
  tags: PropTypes.array,
  inforCurrentUser: PropTypes.object,
};

//Higher Component ....
export default createContainer(() => {
  Meteor.subscribe('jobs');
  Meteor.subscribe('user');
  Meteor.subscribe('tags');
  return {
         jobs: Jobs.find({},{sort:{createdAt:-1}}).fetch(),
         currentUser: Meteor.user(),
         tags: Tags.find({}).fetch(),
  };
}, App);



const stylePaperHome = {
    textAlign: 'center',
    backgroundColor: Colors.orange200,
    color:Colors.orange50,
    fontSize: "20px"
  };

const styleMain = {
    position:'fixed',
    alignItems:'center',
    textAlign: 'center',
    alignContent:'center',
    backgroundColor: Colors.orange500,
    color:Colors.grey50,
    top: 0,
    bottom: 0,
    right :0 ,
    left :0 ,
  };
const styleMainChild = {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap:'wrap',
    alignItems:'center',
    alignContent:'center'
  };

const styleButton = {
    color:Colors.grey50
  };



MainLayout = React.createClass({
  render() {
    return <div style={styleMain} >{this.props.content}</div>
  }
});

MainLayoutContent = React.createClass({
  render() {
    return <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'#34495e'}}>{this.props.content}</div>
  }
});

BlogHome = React.createClass({

  goTo() {
    Meteor.loginWithFacebook({}, function(err){
            if (err) {
              throw new Meteor.Error("Error login!Please Try Again");
            }
            else{
               FlowRouter.go('phuoc')
            }
        });
  },

  render() {
  return (
    <div style={styleMainChild} >
          <h2 style={{fontSize:'100%'}}>This is the home page of our blog</h2>
          <img style={{height:'50%'}} src="logo1.png" />
          <br/>
           <TextField
            underlineStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
            underlineFocusStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
            hintText="Bạn muốn tìm gì...?"
            hintStyle={{bottom:5,paddingLeft:10,color:'#C4CACC',fontWeight:'bold',fontSize:12}}
            inputStyle={{paddingLeft:10,color:'#C4CACC',fontWeight:'bold'}}
            style={ {height:"36",backgroundColor:'#293a4a',borderRadius:'6',border: 'solid 2px',borderColor:"#f0ffff ",marginBottom:'1.5%'}}
            />
          <br/>
            <TextField
            underlineStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
            underlineFocusStyle={{borderColor:'none',borderRadius:'0',height:'0',borderBottom: 'solid 0px',bottom: 0}}  
            hintText="Bạn muốn tìm gì...?"
            hintStyle={{bottom:5,paddingLeft:10,color:'#C4CACC',fontWeight:'bold',fontSize:12}}
            inputStyle={{paddingLeft:10,color:'#C4CACC',fontWeight:'bold'}}
            style={ {height:"36",backgroundColor:'#293a4a',borderRadius:'6',border: 'solid 2px',borderColor:"#f0ffff ",marginBottom:'1.5%'}}
            />
          <br/>
          <ListItem
          	style={{backgroundColor:"#1A237E",color:'#ffffff',marginLeft:'12%',marginRight:'12%',borderRadius:6,bottom:'1.5%'}}
	          primaryText="Login With Facebook"
	          leftAvatar={<Avatar src="facebook_icon.png" />}
	          onClick={this.goTo}
	      />
          <br/>  
    </div>
  );
  }
});

BlogPost = React.createClass({
  render() {
    return (
      <div>
        <p>
          <a href="/">Back</a> <br/>
          This is a single blog post
        </p>
      </div>
    );
  }
});