import './HealthPlan.css'
import {useContext,useEffect,useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList} from "@fortawesome/free-solid-svg-icons";
import TestPannel from '../TestPannel'
import { FieldDataContext } from '../../context/FieldData'
import Health from '../../assets/Health.svg'
import Health2 from '../../assets/Health2.svg'
import girl_with_plant from '../../assets/girl_with_plant.svg'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Add_test from '../../assets/Add_test.svg';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Alerts} from '../InputFields'
import {useWindowSize} from '../../utility'

const HealthPlan = (props)=> {
  const [width, height] = useWindowSize();
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  let self = false;
  const {
    getCheckupDetails,
    testsRecommanded,
    getHealthPlanDetails,
    user_id
  } = useContext(FieldDataContext)
  
  const clickHandler=(test,testName)=>{
    getCheckupDetails(test.checkup_id,props.location.state.user_id).then(result=>{
      if(result.status){
        
      }
      props.history.push({
        pathname: '/test',
        state: { ...test,testName,user_id:props.location.state.user_id}
      })
    })
  }
  useEffect(()=>{
    if(!((props.location.state && props.location.state.user_id) || user_id)){
       props.history.push('/');
      return
    }
    getHealthPlanDetails(props.location.state.user_id).then(result=>{
      if(!result){   
        props.history.push({
          pathname: '/login'
        })
      }
    });
    
  },[])
  const createCheckupHandler = () =>{
    props.history.push({
      pathname: '/createCheckup',
      state: {user_id:props.location.state.user_id,checkup_name:'',from:'healthPlan'}
    })
  }

  const editCheckupHandler = (test) =>{
    props.history.push({
      pathname: '/createCheckup',
      state: test ? {...test,user_id:props.location.state.user_id,from:'healthPlan'} :{user_id:props.location.state.user_id,checkup_name:'',from:'healthPlan'}
    })
  }
 
  const downloadPDF = () => {
    setInfoOpen(true)
    const input = document.getElementById('divToPrint');
    html2canvas(input).then((canvas) => {
    const componentWidth = input.offsetWidth
    const componentHeight = input.offsetHeight

    const orientation = componentWidth >= componentHeight ? 'l' : 'p'

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
    orientation,
    unit: 'px'
     })

    pdf.internal.pageSize.width = componentWidth
    pdf.internal.pageSize.height = componentHeight

    pdf.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
    pdf.save('Healthplans.pdf')
    setInfoOpen(false)
    setOpen(true)
  })
    
  }
    return (
      <div className='HealthPlan'>
        {width> 990 ? <div style={{marginTop:'-40px'}} className='heading'><b>Your Medical Checkups</b></div> :<div></div>}
        <div id="divToPrint" >
        <div  className='PlanHeader'>
          <div><FontAwesomeIcon style={{marginTop: '7px'}} icon={faClipboardList} color="#17416B" size={'3x'} /> </div>
          { {/*testsRecommanded.recommendedcount !== 0 */} &&  <div>
          <div>{testsRecommanded.recommendedcount} &nbsp;Recommended checkups</div>
          <div>{testsRecommanded.selfAddedcount} &nbsp; Self-added checkups</div>
          <div>{<GetAppIcon style={{cursor: 'pointer'}} onClick={downloadPDF} />} Download and Share</div>
          </div>}
          {/* testsRecommanded.recommendedcount === 0 &&  <div>
          <div className='stripes'>- Recommended checkups</div>
          <div className='stripes'>- Self-added checkups</div>
          </div*/}
        </div>
        
       
        <div><p>Recommended Checkups</p>{/* testsRecommanded.recommendedcount !== 0 && <GetAppIcon  onClick={downloadPDF} /> */}</div>
        { testsRecommanded.recommendedcount !== 0 && <div className='recommandedCheckup'>You should do all the checkups below. They are all recommended for you based on your health details.<br />
          Checkups with <img src={Health2} width="20" height="20"/> mean that you face average risk of the health conditions diagnosed by the checkup. 
          <br/>Checkups with <img src={Health} width="20" height="20" /> mean that you face above average risk based on your health details.

        </div>}
       { testsRecommanded.recommendedcount !== 0 ? (testsRecommanded.Recommended.map(test=> <TestPannel key = {test.testName} testName = {test.testName} test = {test}  planType = 'recomm' clickHandler={clickHandler} />))
        :(<> <div className='imgContainer'><img src={girl_with_plant} /></div>
        <div className='NoHealthPlanContainer'>
          <span>Update your health status to view your recommended checkups</span><br />
          <span onClick={()=>{props.history.push({pathname:'/addRisk',state:{self,user_id:props.location.state.user_id}})}}>GO TO MY HEALTH STATUS <ArrowForwardIcon /></span>
        </div>
          {/* <div style={{textAlign: 'center'}} >Update your health status to view your recommended checkups
          <button className='BackButton' onClick={()=>{props.history.push({pathname:'/addRisk',state:{self,user_id:props.location.state.user_id}})}}>GO TO MY HEALTH STATUS</button>
          
          </div> */}
          </>)}
          </div>
         
          <div className='SelfCheckup'>
          <div>Self-Added Checkups</div>
          <div className='recommandedCheckup'>You can add any other checkups you do or want to do here.</div>
          <img className='add_test' src={Add_test} onClick={createCheckupHandler} /><span style={{cursor: 'pointer'}}>Create</span>
          { testsRecommanded.selfAddedcount !== 0 && (testsRecommanded.SelfAdded.map(test=> <TestPannel key = {test.checkup_name} testName = {test.checkup_name} test = {test} planType = 'self' clickHandler={()=>editCheckupHandler(test)} />))}
        </div>
        { open &&  <Alerts
          handleClose ={()=>setOpen(false)} 
           isOpen={open} type="success" title="Success" content={'Health plans downloaded successfully'} 
           autoHideDuration = '6000'/>}
         { infoOpen &&  <Alerts
          handleClose ={()=>setInfoOpen(false)} 
           isOpen={infoOpen} type="info" title="Info" content={'Downloading in progress'} 
           autoHideDuration = '10000'/>}
      </div>
    )
}
export default HealthPlan