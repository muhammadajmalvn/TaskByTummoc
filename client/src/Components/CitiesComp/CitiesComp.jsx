import React, { useEffect, useState } from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from 'mdb-react-ui-kit';
import { fetchCitiesAPI } from '../../APIs/apiCalls';

const CitiesComp = () => {
  const [cities, setCities] = useState([])
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await fetchCitiesAPI()
        setCities(data.data)
      } catch (error) {
        console.log(error);
        setError(true)
      }
    }
    fetchCities()
  }, [])

  return (
    <div>
      {error ? (
        <p className='text-danger'>An error occurred while fetching data</p>
      ) : (
        cities.length === 0 ? (
          <h2 className='text-danger'>No cities found.Please add cities......</h2>
        ) : (
          cities.map((city) => (
            <MDBCard className='m-3 col-md-8 bg-success text-white' key={city?.result?._id}>
              <MDBCardBody>
                <MDBCardTitle>{city?.result?.city}</MDBCardTitle>
              </MDBCardBody>
            </MDBCard>
          ))
        )
      )}
    </div>

  )
}

export default CitiesComp