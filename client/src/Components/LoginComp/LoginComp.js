import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import ErrorMessage from '../Error';
import Loading from '../Loading';
import './LoginComp.css'
import { loginAction } from '../../Redux/Actions/actions';
import Image from '../../public/favicon.jpg'
import GoogleComp from './GoogleComp';


function LoginComp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLoginData = useSelector(state => state.login)
  const { error, loading, userLoginDetails } = userLoginData

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginAction(email, password))
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <MDBContainer className='my-5'>
      <MDBCard className='mb-5'>
        <MDBRow className='d-flex justify-content-center g-0 my-2'>
          <div md='6'>
            <MDBCardBody className='d-flex flex-column justify-content-center'>
              <img src={Image} alt="logo" className='col-md-8 mx-auto' />
              <p className='mx-auto mt-2' style={{ margin: '0' }}>{error ? <ErrorMessage variant='danger'>{error}</ErrorMessage> : " "}
                {loading ? <Loading /> : ""}
              </p>

              <div className='col-md-8 mx-auto my-3'>
                <h5 className="fw-normal my-2 pb-3" style={{ letterSpacing: '1px' }}>Login to your Account</h5>

                <form id='loginform' onSubmit={handleSubmit(onSubmit)} className='mb-2'>

                  <p style={{ color: 'red', margin: '0' }}>{errors.email && "Enter a valid email address"}
                  </p>
                  <MDBInput wrapperClass='mb-3' label='Email address' id='formControlLg' type='email' size="lg"  {...register("email", { required: true })} onChange={(e) => setEmail(e.target.value)} />

                  <p style={{ color: 'red', margin: '0' }}>{errors.password?.message}
                  </p>
                  <MDBInput wrapperClass='mb-3' label='Password' id='formControlLg' type='password' size="lg"  {...register("password", {
                    required: "Enter a valid password", minLength: { value: 6, message: "Password must be min 16 characters" }, maxLength: { value: 16, message: "Password must be max 16 characters" }, pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{6,16}$/,
                      message:
                        "Password Must Contain Atleast 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character",
                    }
                  })} onChange={(e) => setPassword(e.target.value)} />
                  <MDBBtn className="px-5" size='lg' style={{ backgroundColor: '#355B3E', width: '100%' }}>Login</MDBBtn>
                </form>
                <GoogleComp />
                <Link to={'/signup'}>
                  <p className="pb-lg-2" style={{ color: '#393f81' }}>Don't have an account? <a style={{ color: '#393f81' }}>Register here</a></p>
                </Link>
              </div>
            </MDBCardBody>
          </div>

        </MDBRow>
      </MDBCard>
    </MDBContainer >
  );
}


export default LoginComp;