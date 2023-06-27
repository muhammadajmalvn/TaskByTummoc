import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom'
import { signupAction } from '../../Redux/Actions/actions'
import Image from '../../public/favicon.jpg'
import './SignupComp.css'
import { useForm } from 'react-hook-form'
import Loading from '../Loading'
import ErrorMessage from '../Error'

function SignupComp() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signup = useSelector(state => state.signup)
  const { loading, error, userInfo } = signup

  const onSubmit = (data) => {
    console.log(data);
    dispatch(signupAction(firstName, lastName, email, phone, password))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);



  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  return (
    <MDBContainer>
      <MDBCard className='my-4'>
        <MDBRow className='d-flex justify-content-center g-0 my-2'>
          <div md='6'>
            <MDBCardBody className='d-flex flex-column justify-content-center'>
              <img src={Image} alt="logo" className='col-md-8 mx-auto' />
              <p style={{ margin: '0' }}>{error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
                {loading ? <Loading /> : ""}
              </p>

              <div className='col-md-8 mx-auto my-3'>
                <h5 className="fw-normal my-2 pb-3" style={{ letterSpacing: '1px' }}>Create Account</h5>

                <form id='signupform' onSubmit={handleSubmit(onSubmit)}>


                  <p style={{ color: 'red', margin: '0' }}>{errors.firstName && "Enter a valid first name"}
                  </p>
                  <MDBInput wrapperClass='mb-3' label='First Name' id='formControlLg' type='text' size="md" {...register("firstName", { required: true, maxLength: '10' })} onChange={(e) => setfirstName(e.target.value)} />


                  <p style={{ color: 'red', margin: '0' }}>{errors.lastName && "Enter a valid last name"}
                  </p>
                  <MDBInput wrapperClass='mb-3' label='Last Name' id='formControlLg' type='text' size="md"  {...register("lastName", { required: true, maxLength: '10' })} onChange={(e) => setlastName(e.target.value)} />


                  <p style={{ color: 'red', margin: '0' }}>{errors.email && "Enter a valid email address"}
                  </p>
                  <MDBInput wrapperClass='mb-3' label='Email address' id='formControlLg' type='email' size="md"  {...register("email", { required: true, minLength: '10' })} onChange={(e) => setEmail(e.target.value)} />


                  <p style={{ color: 'red', margin: '0' }}>{errors.phone && "Enter a valid mobile number"}
                  </p>

                  <MDBInput wrapperClass='mb-3' label='Mobile Number' id='formControlLg' type='phone' size="md"  {...register("phone", { required: true, minLength: '10', maxLength: '10' })} onChange={(e) => setPhone(e.target.value)} />


                  <p style={{ color: 'red', margin: '0' }}>{errors.password?.message}
                  </p>
                  <MDBInput wrapperClass='mb-3' label='Password' id='formControlLg' type='password' size="md"  {...register("password", {
                    required: "Enter a valid password", minLength: { value: 6, message: "Password must be min 16 characters" }, maxLength: { value: 16, message: "Password must be max 16 characters" }, pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                      message:
                        "Password Must Contain Atleast 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
                    }
                  })} onChange={(e) => setPassword(e.target.value)} />


                  <MDBBtn className="px-5" size='md' style={{ backgroundColor: '#355B3E', width: '100%' }}>Signup</MDBBtn>

                </form>

                <Link to={'/login'}>
                  <p className="mb-5 pb-md-2" style={{ color: '#393f81' }}>Already have an account? <a style={{ color: '#393f81' }}>Login here</a></p>
                </Link>
              </div>
            </MDBCardBody>
          </div>

        </MDBRow>
      </MDBCard>

    </MDBContainer >
  )
}

export default SignupComp;