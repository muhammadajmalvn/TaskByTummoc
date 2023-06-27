import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { cityaddAPI } from '../../APIs/apiCalls'

const HomepageComp = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate()
    const [data, setData] = useState({
        city: "",
        userId: ""
    })

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const cityData = { ...data, userId: userData.id };
        await cityaddAPI(cityData)
        setData({ city: "" });
    };
    return (
        <div className='mx-4'>
            <h2 className='mt-2 text-danger'> Hi {userData?.firstName} {userData?.lastName},</h2>
            <h3>Enter your favourite cities</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 col-md-6 ">
                    <input
                        type='text'
                        placeholder='Enter a city'
                        name='city'
                        onChange={handleChange}
                        value={data.city}
                        className='form-control'
                        required
                    />
                </div>
                <button type='submit' className='mb-3 btn btn-sm btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default HomepageComp