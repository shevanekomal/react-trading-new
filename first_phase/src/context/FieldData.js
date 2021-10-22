import React, { Component } from 'react'
import debounce from 'debounce-promise'
import httpClient from './httpClient'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
//import  { Redirect } from 'react-router-dom'
//import { Link } from "react-router-dom";
const FieldDataContext = React.createContext()
class FieldDataProvider extends Component {

  constructor(props) {
    super(props);
    this.positionState = {
      vertical: 'top',
      horizontal: 'center'
    };

    //const {vertical,horizontal } = this.positionState;
  }
  state = {
    open:false,
     accessToken:'',
     user_id:null,
     userHealthDetails:[{}],
     familyMembers:[{}],
     cities : [{text:'Pune',value:'pune'},{text:'Mumbai',value:'mumbai'}],
     gender : [{text:'Male',value:'male'},{text:'Female',value:'female'}],
     diet : [{text:"Vegetarian",value:"Vegetarian"},{text:"Non-vegetarian",value:"Non-vegetarian"}],
     alcoholIntakeOption:[{text:'Yes',value:'Yes'},{text:'No',value:'No'}],
     exercise :[{text:"Less than 30 minutes",value:"Less than 30 minutes"},
     {text:"More than 30 minutes and less than 1.5 hour",value:"More than 30 minutes and less than 1.5 hour"},
     {text:"More than 1.5 hour and less than 2.5 hour",value:"More than 1.5 hour and less than 2.5 hour"},
    {text:"More than 2.5 hours",value:"More than 2.5 hours"}],

    StrengthingExercise :[{text:"None",value:"None"},
     {text:"Once a week",value:"Once a week"},
     {text:"Twice a week",value:"Twice a week"},
    {text:"Thrice or more times a week",value:"Thrice or more times a week"}],

    diagnosedCondition : [
    {text:'None of the below',name:'None of the below'},
    {text:'Diabetes',name:'Diabetes'},
    {text:'Hypertension (High blood pressure)',name:'Hypertension (High blood pressure)'},
    {text:'Hypercholesterolemia (High cholesterol)',name:'Hypercholesterolemia (High cholesterol)'},
    {text:'Others',name:'Others'}],
  
     familyHistoryConditions : [ 
    {text:'None of the below',name:'None of the below'},
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
    //  { key: "Diabetes", cat: "Diabetes" },
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
             
          ]
      }
  ],
  SelfAdded:[
    {"checkup_name" : "oral","provider":"aa","provider_website":"www.abc.com"}
  ],
  recommendedcount: 5,
  selfAddedcount:1},
 /* testsRecommanded : {
    Recommended:[
    { 
    "testTypes": []
     }
],
SelfAdded:[
  {}
],
recommendedcount: 5,
selfAddedcount:1},*/
  knowYourSelfResult:{
    BMI: [],
    waist :[],
    excercise:[],
    strengthingExcercise:[],
    age:[],
    sugar:[],
    diet:[],
    alcohol:[],
    smoke:[],
    medicalCheckups:[],
  },
  testDetails:{
        "finalResult": "This checkup is highly recommended for you Because you have an existing chronic condition that puts you at higher risk and you smoke or have smoked in the past and you drink"
  },
  checkup_names : [{text:'Other'},{text:'Complete Blood Count (CBC)'},
  {text:'Lipid Profile'},
  {text:'Sugar Profile (HbA1c)'},
  {text:'Liver Function Test'},
  {text:'Kidney Function Test'},
  {text:'Thyroid profile'},
  {text:'Pancreas Profile'},
  {text:'Iron Studies'},
  {text:'Vitamin B12'},
  {text:'Vitamin D'},
  {text:'ECG'},
  {text:'ECHO'},
  {text:'Chest X-ray'},
  {text:'Bone Density Test'},
  {text:'Urine Test (Routine)'},
  {text:'Prostate Specific Antigen (PSA)'},
  {text:'Mammography'},
  {text:'CA-125'},
  {text:'Transvaginal ultrasound'},
  {text:'Pap Smear'},
  {text:'HPV DNA test'},
  {text:'Low Dose CT Scan (LDCT)'},
  {text:'Fecal occult blood test'},
  {text:'Colonoscopy'},
  {text:'Physician'},
  {text:'Geriatrician or Physician'},
  {text:'Dentist'},
  {text:'ENT'},
  {text:'Ophthalmologist'},
  {text:'Gynocologist'},
  {text:'Genetic Counseling'},
  {text:'Vaccine Influenza'},
  {text:'Vaccine Pneumonia'},
  {text:'Vaccine DPT'},
  {text:'Vaccine Zoster'},
  {text:'Vaccine Varicella'},
  {text:'Vaccine HPV'}],
}
  initialContext = { ...this.state }
getProfilePicture=(relation)=>{
  switch(relation){
    case 'daughter':
      return 'Girl'
    case 'father':
      return 'Old-man'
    case 'mother':
      return 'Old-woman'
    case 'son':
      return 'Boy'
    case 'wife':
     return 'Woman'
     case 'husband':
       return 'Man'
  }
}
  methods = {
    registerUser: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/register',
        data,
      })
      if(result.status){
        this.setState({
          ...this.state,
          loginUserId:result.data.user_id,
        })
        window.localStorage.setItem('x-access-token',result.data.accessToken)
        window.localStorage.setItem('user_id',result.data.user_id)
      }
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
        window.localStorage.setItem('x-access-token',result.data.accessToken)
        window.localStorage.setItem('user_id',result.data.user_id)
      } return result
    }),
    addDetails: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/update',
        data,
      })
      return result
    }),
    getCheckupDetails: debounce(async (checkupId,user_id) => {
      let current_user_id = user_id ? user_id : this.state.user_id
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/gethealthPlanById/'+current_user_id+'/'+checkupId
      })
      if(result.status){
        this.setState({
          ...this.state,
          testDetails:result.data
        })
      }
      return result
    }),
    disableConditions: debounce(async(condition,checked)=>{
      let tempCondition = this.state[condition];
      if(!checked){
        tempCondition = tempCondition.map(el=>({name:el.name,text:el.text}))
      }else{
        tempCondition = tempCondition = tempCondition.map(el=>el.text !== 'None of the below' ? ({...el,disabled:checked,checked:false}):({...el}))
      } 
      this.setState({[condition]:tempCondition})
    }),
    disableHistoryConditions: debounce(async(condition,checked)=>{
      let tempCondition = this.state[condition];
      if(!checked){
        tempCondition = tempCondition.map(el=>({name:el.name,text:el.text}))
      }else{
        tempCondition = tempCondition = tempCondition.map(el=>el.text !== 'None of the below' ? ({...el,disabled:checked,checked:false}):({...el}))
      } 
      this.setState({[condition]:tempCondition})
    }),
    updateUserId : debounce(async(user_id)=>{
      this.setState({user_id})
    }),
    getHealthPlanDetails: debounce(async (id) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/getHealthPlans/'+id
      })
      if(result.status){
        this.setState({
          ...this.state,
          testsRecommanded:result.data
        })
        return true
      }else{
        this.setState({ ...this.state,open:true})
        return false
      }
    }),
    getFamilyMembers:debounce(async(user_id)=>{
      const result = await httpClient({
        method: 'POST',
        //urlEndpoint: '/getFamilyMembers/'+this.state.user_id
        urlEndpoint: '/getFamilyMembers/'+user_id
      })
      if(result.status){
        //process result.data here
        this.setState({
          ...this.state,
          familyMembers:result.data
        })
        return true
      }else{
        this.setState({ ...this.state,open:true})
        return false
      }
    }),
    //below 2 calls added by swap
    getHealthStatusDetails:debounce(async(user_id)=>{
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/getHealthStatusDetails/'+user_id
      })
      if(result.status){
        //process result.data here
        this.setState({
          ...this.state,
          userHealthDetails:result.data
        })
        
      }
      return result
    }),
    deleteMemberProfile:debounce(async(user_id)=>{
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/deleteMemberProfile/'+user_id
      })
     return result
    }),
    deleteCheckupEventPlan:debounce(async(data)=>{
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/deleteEvent',
        data
      })
     return result
    }),
    addMember: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/addMember',
        data,
      })
      return result
    }),
   /* createSelfAddedPlan: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/createSelfAddedPlan',
        data,
      })
      return result
    }),*/
    createEvent: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/createEvent',
        data,
      })
      return result
    }),
    getUserNotifications:debounce(async(user_id,user_type)=>{
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/getUserNotifications/'+user_id+'/'+user_type
      })
      if(result.status){
        this.setState({
          ...this.state,
        //  userHealthDetails:result.data
        })
       
      }
      return result
    }),
    getRecommendedAndSelfAddedCount:debounce(async(user_id)=>{
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/getRecommendedAndSelfAddedCount/'+user_id
      })
      if(result.status){
        this.setState({
          ...this.state,
        //  userHealthDetails:result.data
        })
       
      }
      return result
    }),
    getAppointments:debounce(async(user_id)=>{
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/getUserEventsById/'+user_id
      })
        return result
    }),
    UpdateKnowYourselfDetails: debounce(async (data) => {
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/updateKnowYourselfDetails',
        data,
      })
      return result
    }),
    getKnowYourSelfResult:debounce(async(user_id,name)=>{
      const result = await httpClient({
        method: 'POST',
        urlEndpoint: '/knowYourselfEvaluation/'+user_id+'/'+name
      })
      if(result.status){
        this.setState({
          ...this.state,
          knowYourSelfResult:result.data
        })
        return true
      }else{
        this.setState({ ...this.state,open:true})
        return false
      }
    }),
  }

  render() {
    return (
      <>
         <FieldDataContext.Provider
        value={{
          ...this.state,
          ...this.methods
        }}
      >
        {this.props.children}
      </FieldDataContext.Provider>
      { this.state.open && <Snackbar style={{ height: "160%" }}
        open={this.state.open} autoHideDuration='6000' onClose={()=>this.setState({open:false})}  >
      <Alert
        severity={'error'}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={()=>this.setState({open:false})} 
            >
              <CloseIcon  fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
        <AlertTitle><b>{'Error'}</b></AlertTitle>
        {'Logged out. Please login again'}
        </Alert>
        </Snackbar>}
    
      </>
    )
  }
}
FieldDataProvider.contextType = FieldDataContext
export { FieldDataContext, FieldDataProvider }
