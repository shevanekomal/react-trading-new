import React, { Component } from 'react'
import debounce from 'debounce-promise'
import httpClient from './httpClient'
const FieldDataContext = React.createContext()
class FieldDataProvider extends Component {
  state = {
     accessToken:'',
     user_id:38,
     familyMembers:[{realtion:'daughter',profile:'Girl',name:'swap'}],
     cities : [{text:'Pune',value:'pune'},{text:'Mumbai',value:'mumbai'}],
     gender : [{text:'Male',value:'male'},{text:'Female',value:'female'}],
     diet : [{text:"Vegetarian diet",value:"vegetarian"},{text:"Non-vegetaran diet",value:"non-vegetarian"}],
     alcoholIntakeOption:[{text:'Yes',value:'Yes'},{text:'No',value:'No'}],
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
    {text:'Cancer - Breast',name:'Cancer - Breast'},
    {text:'Cancer - Ovarian',name:'Cancer - Ovarian'},
    {text:'Cancer -  Colorectal / colon',name:'Cancer -  Colorectal / colon'},
    {text:'Cancer -  Prostate',name:'Cancer -  Prostate'},
    {text:'Cardiovascular disease (like coronary heart disease, heart attack, stroke)',name:'Cardiovascular disease (like coronary heart disease, heart attack, stroke)'},
    {text:'Diabetes',name:'Diabetes'},
    {text:'Kidney disease',name:'Kidney disease'},
    {text:'Liver disease',name:'Liver disease'},
    {text:'Thyroid disease',name:'Thyroid disease'}],

    otherConditions : [
      { key: "Anemia", cat: "Anemia" },
      { key: "Blood disorders", cat: "Blood disorders" },
      { key: "Bone disorders (like osteoporosis)", cat: "Bone disorders (like osteoporosis)" },
      { key: "Bronchial Asthma", cat: "Bronchial Asthma" },
      { key: "Cancer -  Colorectal / colon", cat: "Cancer -  Colorectal / colon" },
      { key: "Cancer -  Prostate", cat: "Cancer -  Prostate" },
      { key: "Cancer - Breast", cat: "Cancer - Breast" },
      { key: "Cancer - Others", cat: "Cancer - Others" },
      { key: "Cancer - Ovarian", cat: "Cancer - Ovarian" },
      { key: "Cardiovascular disease (like coronary heart disease, heart attack, stroke)", cat: "Cardiovascular disease (like coronary heart disease, heart attack, stroke)" },
      { key: "Chronic Obstructive Pulmonary Disease", cat: "Chronic Obstructive Pulmonary Disease" },
      { key: "Diabetes", cat: "Diabetes" },
      { key: "Gestational diabetes", cat: "Gestational diabetes" },
      { key: "Immunocompromised", cat: "Immunocompromised" },
      { key: "Inflammatory bowel disease", cat: "Inflammatory bowel disease" },
      { key: "Kidney disease", cat: "Kidney disease" },
      { key: "Liver disease", cat: "Liver disease" },
      { key: "Lung disease", cat: "Lung disease" },
      { key: "Pancreatic disease", cat: "Pancreatic disease" },
      { key: "Polycystic ovarian syndrome (PCOS)", cat: "Polycystic ovarian syndrome (PCOS)" },
      { key: "Prediabetes", cat: "Prediabetes" },
      { key: "Thyroid disease", cat: "Thyroid disease" }
    ],
    testsRecommanded : {
      Recommended:[
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
  Recommendedcount: 5},
  testDetails:{
        "finalResult": "This checkup is highly recommended for you Because you have an existing chronic condition that puts you at higher risk and you smoke or have smoked in the past and you drink"
  }
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
    getCheckupDetails: debounce(async (checkupId) => {
      const result = await httpClient({
        method: 'GET',
        urlEndpoint: '/gethealthPlanById/'+this.state.user_id+'/'+checkupId
      })
      if(result.status){
        this.setState({
          ...this.state,
          testDetails:result.data
        })
      }else{
        console.log("Error",result)
      }
      return result
    }),
    disableConditions: debounce(async(condition,checked)=>{
      let tempCondition = this.state[condition];
      if(!checked){
        tempCondition = tempCondition.map(el=>({name:el.name,text:el.text}))
      }else{
        tempCondition = tempCondition.map(el=>el.text !== 'None' ? ({...el,disabled:checked,checked:false}):({...el}))
      } 
      this.setState({[condition]:tempCondition})
    }),
    updateUserId : debounce(async(user_id)=>{
      this.setState({user_id})
    }),
    getHealthPlanDetails: debounce(async (id) => {
      const result = await httpClient({
        method: 'GET',
        urlEndpoint: '/getHealthPlans/'+id
      })
      if(result.status){
        this.setState({
          ...this.state,
          testsRecommanded:result.data
        })
        return true
      }else{
        console.log("Error",result)
      }
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
