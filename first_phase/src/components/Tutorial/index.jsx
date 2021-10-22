import './Tutorial.css'
import {useWindowSize} from '../../utility'

const Tutorial =()=>{
  const [width, height] = useWindowSize();
    return (
    <div className="TutorialContainer">
      {width> 990 ?(<video className="videoContainer" width="750" height="500" controls >
      <source src="/videos/Tutorial_potrait.mov" type="video/mp4"/>
    </video>) : (<video className="videoContainer" width="350" height="500" controls >
      <source src="/videos/Tutorial_potrait.mov" type="video/mp4"/>
    </video>)}
      
      </div>
    );

}
export default Tutorial