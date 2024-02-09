import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className='text-center'>THREEL</h1>
      <div className="registerContainer mx-auto my-auto">
        <h2 className='text-center'>REGISTER</h2>
          <form className='form-group'>
            <input type="text" id="username" name="username" placeholder="Username" required/>

            <input type="email" id="email" name="email" placeholder="Email" required/>

            <input type="password" id="password" name="password" placeholder="Password" required/>

            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required/>

            <select id="accountType" name="accountType" placeholder="Account Type">
              <option value="" disabled defaultValue>Account Type</option>
              <option value="listener">Listener</option>
              <option value="artist">Artist</option>
            </select>

            <p className='mx-auto'>Already have an Account? <a href="#">Login Now!</a></p>

            <div className='mx-auto'>
              <button type="submit" className="registerButton">Register</button>
              <button type="button" className="cancelButton">Cancel</button>
            </div>
          </form>
      </div>
    </div>
  );
}

export default App;
