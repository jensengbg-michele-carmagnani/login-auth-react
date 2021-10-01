import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react'
import AuthContext from '../../store/auth-context';
import {useHistory}from 'react-router-dom'


const ProfileForm = () => {
 const authCtx = useContext(AuthContext)
  const newPasswordInput = useRef()
  const history = useHistory()
  
  const submitHandler = () => {
    const eneredNewPassword = newPasswordInput.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAVncISV0WpRS0N1gbNe2O1TW36RLipeu0", {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: eneredNewPassword,
          returnSecureToken:false
        })
        ,
        headers: { 'Content-Type': 'application/json'}
      }
    ).then(res => {
      // assuming always succed
      history.replace('/')
    });
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInput} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
