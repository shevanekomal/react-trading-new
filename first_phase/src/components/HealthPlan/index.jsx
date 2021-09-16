import './HealthPlan.css'
import {useContext,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList,faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TestPannel from '../TestPannel'
import { FieldDataContext } from '../../context/FieldData'
import Health from '../../assets/Health.svg'
import Health2 from '../../assets/Health2.svg'
import girl_with_plant from '../../assets/girl_with_plant.svg'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Add_test from '../../assets/Add_test.svg';

const HealthPlan = (props)=> {
  let self = false;
  const {
    getCheckupDetails,
    testsRecommanded,
    getHealthPlanDetails,
    user_id
  } = useContext(FieldDataContext)
  const clickHandler=(test,testName)=>{
    
    getCheckupDetails(test.checkup_id,props.location.state.user_id).then(result=>{
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
    getHealthPlanDetails(props.location.state.user_id)
  },[])
  const createCheckupHandler = () =>{
    props.history.push({
      pathname: '/createCheckup',
      state: {user_id:props.location.state.user_id}
    })
  }
 
  const downloadPDF = () => {
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
  })
    
  }
    return (
      <div className='HealthPlan'>
        <div id="divToPrint" >
        <div  className='PlanHeader'>
          <div><FontAwesomeIcon icon={faClipboardList} color="#17416B" size={'3x'} /></div>
          { testsRecommanded.recommendedcount !== 0 &&  <div>
          <div>{testsRecommanded.recommendedcount} Recommended checkups</div>
          <div>{testsRecommanded.selfAddedcount} Self-added checkups</div>
          </div>}
          { testsRecommanded.recommendedcount === 0 &&  <div>
          <div>- Recommended checkups</div>
          <div>- Self-added checkups</div>
          </div>}
        </div>
        
        <div>
          <p>Recommended Checkups</p>
          <div>You should do all the checkups below. They are all recommended for you based on your health details.</div>
          <div>
          Checkups with <img src={Health2} width="20" height="20"/> mean that you face average risk of the health conditions diagnosed by the checkup. 
          <br/>Checkups with <img src={Health} /> mean that you face above average risk based on your health deatils.

        </div>
        </div>
       { testsRecommanded.recommendedcount !== 0 ? (testsRecommanded.Recommended.map(test=> <TestPannel key = {test.testName} testName = {test.testName} test = {test} clickHandler={clickHandler} />))
        :(<div> <img src={girl_with_plant} />
          <div>Update your health status to view your recommended checkups</div>
          <button className='BackButton' onClick={()=>{props.history.push({pathname:'/addRisk',state:{self,user_id:props.location.state.user_id}})}}>GO TO MY HEALTH STATUS</button>
          </div>)}
          </div>
          <button  onClick={downloadPDF} >Download</button>
         
          <div className='SelfCheckup'>
          <div>Self-Added Checkups</div>
          <img className='add_test' src={Add_test} onClick={()=>createCheckupHandler()}/><span onClick={()=>createCheckupHandler()}>Create</span>
    
        </div>
      </div>
    )
}
export default HealthPlan