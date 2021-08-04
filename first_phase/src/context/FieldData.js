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
     alcoholIntakeOption:[{text:'Yes',value:'yes'},{text:'No',value:'no'}],
     exercise :[{text:"Less than 30 minutes",value:"Less than 30 minutes"},
    {text:"More than 30 minutes but less than 1.5 hours",value:"More than 30 minutes but less than 1.5 hours"},
    {text:"More than 1.5 hour and less than 2.5 hours",value:"More than 1.5 hour and less than 2.5 hours"},
    {text:"More than 2.5 hours",value:"More than 2.5 hours"}],

    diagnosedCondition : [
    {text:'None',name:'None'},
    {text:'Diabetes',name:'Diabetes'},
    {text:'Hypertension',name:'Hypertension'},
    {text:'Hypercholesterolemia',name:'Hypercholesterolemia'},
    {text:'Others',name:'Others'}],
  
     familyHistoryConditions : [ 
    {text:'None',name:'None'},
    {text:'Breast or ovarian cancer',name:'Breast or ovarian cancer'},
    {text:'Colorectal/ colon cancer',name:'Colorectal/ colon cancer'},
    {text:'Prostate cancer',name:'Prostate cancer'},
    {text:' Cardiovascular disease (like coronary heart disease, heart attack, stroke)',name:'Cardiovascular disease'},
    {text:'Diabetes',name:'Diabetes'},,
    {text:'Thyroid disease',name:'Thyroid disease'},
    {text:'Liver disease',name:'Liver disease'}],
    otherConditions : [
      { key: "Bone disorders (like osteoporosis)", cat: "Bone disorders (like osteoporosis)*" },
      { key: "Gestational diabetes", cat: "Gestational diabetes" },
      { key: "Inflammatory bowel disease", cat: "Inflammatory bowel disease" },
      { key: "Kidney disease", cat: "Kidney disease" },
      { key: "Liver disease", cat: "Liver disease" },
      { key: "Polycystic ovarian syndrome (PCOS)", cat: "Polycystic ovarian syndrome (PCOS)" },
      { key: "Prediabetes", cat: "Prediabetes" }
    ],
    testsRecommanded : {
      testData:[
      {
          "testName": "Blood Test",
          "testTypes": [
              {
                  "checkup_id": 1,
                  "checkup_name": "Prostate Specific Antigen (PSA)",
                  "recomm_level": 1
              },
              {
                  "checkup_id": 2,
                  "checkup_name": "Complete Blood Count (CBC)",
                  "recomm_level": 2
              },
              {
                  "checkup_id": 4,
                  "checkup_name": "CA-125",
                  "recomm_level": 1
              }
          ]
      },
      {
          "testName": "Diagnostic",
          "testTypes": [
              {
                  "checkup_id": 3,
                  "checkup_name": "Mammography",
                  "recomm_level": 0
              },
              {
                  "checkup_id": 5,
                  "checkup_name": "Transvaginal ultrasound",
                  "recomm_level": 0
              }
          ]
      }
  ],
  Recommendedcount: 5}
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
        urlEndpoint: '/update',
        data,
      })
      return result
    }),
    getCheckupDetails: debounce(async (params) => {
      const result = await httpClient({
        method: 'GET',
        urlEndpoint: '/getCheckupDetails',
        params,
      })
      return result
    }),
    disableConditions: debounce(async(condition,checked)=>{
      let tempCondition = this.state[condition];
      tempCondition = tempCondition.map(el=>el.text!='None' ? ({...el,disabled:checked}):({...el}))
      console.log(tempCondition)
      this.setState({[condition]:tempCondition})
    })
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
