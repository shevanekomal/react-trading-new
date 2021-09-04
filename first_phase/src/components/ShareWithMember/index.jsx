import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle,faTimesCircle,faUser,faUserFriends } from "@fortawesome/free-solid-svg-icons";

const ShareWithMember = () =>{

  return(
    <div>
        <div className='ShareWithMember'>
          <div><h4>Privacy and Control</h4></div>
          <div>
          <table><tbody>
         
         <tr>
           <td/>
           <td/>
           <td><FontAwesomeIcon icon={faUser} color="#17416B" size={'lg'} /></td>
            <td><FontAwesomeIcon icon={faUserFriends} color="#17416B" size={'lg'} /></td>
         </tr>
         <tr>
         <td/>
         <td/>
             <td>Account Creater</td>
             <td>Family Members</td>
         </tr>
         <tr>
             <td>View Own Profile</td>
              
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>
             <td/>  
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>
         </tr>
        
         <tr>
             <td>View all profiles</td>
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>
             <td/>  
            <td><FontAwesomeIcon icon={faTimesCircle} color="red" size={'lg'} /></td>

         </tr>
         <tr>
             <td>Edit own profile</td>
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>
             <td/>  
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>

         </tr>
         <tr>
             <td>Edit all profiles</td>
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>
             <td/>  
            <td><FontAwesomeIcon icon={faTimesCircle} color="red" size={'lg'} /></td>

         </tr>
         <tr>
             <td>WhatsApp notifications for own profile</td>
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>
             <td/>  
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>

         </tr>
         <tr>
             <td>WhatsApp notifications for all profiles</td>
             <td><FontAwesomeIcon icon={faCheckCircle} color="green" size={'lg'} /></td>
             <td/>  
            <td><FontAwesomeIcon icon={faTimesCircle} color="red" size={'lg'} /></td>

         </tr>
            </tbody>
          </table>
          <br/>
          </div>
          <div><h3><b>Who is an Account Creator?</b></h3>
          <p>An acccount creator is the one who registers with PreventEnable for the first time and creates a password with the mobile number. As an account creator, you can add upto 6 family members. You will be able to view their health profiles, manage their settings, and get their updates on your Whatsapp number. You can control these in settings.</p>
          </div>
          <br/>
          
          <div><h3><b>Who is a Family Member?</b></h3>
          <p>A family member is the one who’s profile has already been created by the account creator. The family members can view their profiles by directly logging in with OTP using the number that was used to create the member profile by the account creator. Family members can control their WhatsApp updates on their own profile’s settings page. However, family members can’t view other people’s profiles. Each family member’s information is only available to the account creator and to the family member themself.</p>
          </div>
      </div>
    </div>
    
)}
export default ShareWithMember;