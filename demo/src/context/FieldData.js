import React, { Component } from 'react'
 import debounce from 'debounce-promise'
 import httpClient from './httpClient'

const FieldDataContext = React.createContext()
//const WAIT_TIME = 400

class FieldDataProvider extends Component {
  state = {
     accessToken:'',
     loginUserId:null,
     familyMembers:[{realtion:'daughter',profile:'Girl',name:'swap'}],
     cities : [{text:'Pune',value:'pune'},{text:'Mumbai',value:'mumbai'}],
     gender : [{text:'Male',value:'male'},{text:'Female',value:'female'}],
     diet : [{text:"Vegetarian diet",value:"vegetarian"},{text:"Non-vegetaran diet",value:"non-vegetarian"}],
     exercise :[{text:"Less than 30 minutes",value:"Less than 30 minutes"},
    {text:"More than 30 minutes but less than 1.5 hours",value:"More than 30 minutes but less than 1.5 hours"},
    {text:"More than 1.5 hour and less than 2.5 hours",value:"More than 1.5 hour and less than 2.5 hours"},
    {text:"More than 2.5 hours",value:"More than 2.5 hours"}],
     conditions : [
    {text:'Diabetes',name:'Diabetes',checkd:false},
    {text:'Hypertension',name:'Hypertension',checkd:false},
    {text:'Hypercholesterolemia',name:'Hypercholesterolemia',checkd:false},
    {text:'None of the above',name:'None of the above',checkd:false},
    {text:'Others',name:'Others',checkd:false}],
  
     familyHistoryConditions : [ 
    {text:'Breast or ovarian cancer',name:'Breast or ovarian cancer',checkd:false},
    {text:'Colorectal/ colon cancer',name:'Colorectal/ colon cancer',checkd:false},
    {text:'Prostate cancer',name:'Prostate cancer',checkd:false},
    {text:'None of the above',name:'None of the above',checkd:false}, {text:'Others',name:'Others',checkd:false},],
   
  }
  initialContext = { ...this.state }

  methods = {
    registerUser: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/register',
        data,
      })
      return result
    }),
     loginUser: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/login',
        data,
      })
      if(result.status){
        this.setState({
          ...this.state,
          accessToken:result.data.accessToken,
          loginUserId:result.data.user_id,
        })
        return true
      }else return false
    }),
    addDetails: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/',
        data,
      })
      return result
    }),
  }

  render() {
    return (
      <FieldDataContext.Provider
        value={{
          ...this.state,
          ...this.methods
        }}
      >
        {this.props.children}
      </FieldDataContext.Provider>
    )
  }
}
FieldDataProvider.contextType = FieldDataContext
export { FieldDataContext, FieldDataProvider }
