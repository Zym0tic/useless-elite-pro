import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
   

   <h2>Signup</h2>
   <form onSubmit={handleFormSubmit}> 
     <div className="flex-row space-between my-2 col-12 col-md-5">
       <label htmlFor="firstName">First Name:</label>
       <input class="form-control" id="floatingInput"
         placeholder="First"
         name="firstName"
         type="firstName"
        //  id="firstName"
         onChange={handleChange}
       />
     </div>
     <div className="flex-row space-between my-2 col-12 col-md-5">
       <label htmlFor="lastName">Last Name:</label>
       <input class="form-control" id="floatingInput"
         placeholder="Last"
         name="lastName"
         type="lastName"
        //  id="lastName"
         onChange={handleChange}
       />
     </div>
     <div className="flex-row space-between my-2 col-12 col-md-5">
       <label htmlFor="email">Email:</label>
       <input class="form-control" id="floatingInput"
         placeholder="youremail@test.com"
         name="email"
         type="email"
        //  id="email"
         onChange={handleChange}
       />
     </div>
     <div className="flex-row space-between my-2 col-12 col-md-5">
       <label htmlFor="pwd">Password:</label>
       <input class="form-control" id="floatingInput"
         placeholder="******"
         name="password"
         type="password"
        //  id="pwd"
         onChange={handleChange}
       />
     </div>
     <div className="flex-row flex-end">
       <button type="submit" className="btn btn-outline-light me-2 btn-secondary">Submit</button>
     </div>
     <div>Already have an account?</div>
     <Link to="/login">← Go to Login</Link> 
   </form>
 </div>
    
    
  );
}

export default Signup;

