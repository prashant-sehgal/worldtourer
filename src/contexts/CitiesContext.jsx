import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

const CitiesContext = createContext()

const BASE_URL = 'http://localhost:8000'

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: ''
}

function reducer(state, action) {
  switch(action.type) {
    
    case 'loading':
      return {...state,isLoading: true}

    case 'cities/loaded':
      return {...state, isLoading: false, cities: action.payload}

    case 'city/loaded':
      return {...state, isLoading: false,currentCity: action.payload}
    
    case 'city/created':
      return {...state, isLoading: false,cities: [...state.cities, action.payload]}

    case 'city/deleted':
      return {...state, isLoading: false,cities: state.cities.filter(city => city.id !== action.payload)}


    case 'rejected':
      return {...state,isLoading: false,error: action.payload}

    default:
      throw new Error('Unknown action type')
      
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([])
  // const [currentCity, setCurrentCity] = useState({})
  // const [isLoading, setIsLoading] = useState(false)
  const [{cities,currentCity,isLoading,error}, dispatch] = useReducer(reducer,initialState)

  useEffect(function () {
    async function fetchCities() {
      dispatch({type: 'loading'})
      try {
        const response = await fetch(`${BASE_URL}/cities`)
        const data = await response.json()

        dispatch({type: 'cities/loaded', payload: data})
      } catch (error) {
        dispatch({type: 'rejected',payload: 'There wan an error in loading data'})
      } 
    }
    fetchCities()
  }, [])

  async function getCity(id) {
    if (Number(id) === currentCity.id) return
    try {
      dispatch({type: 'loading'})
      const response = await fetch(`${BASE_URL}/cities/${id}`)
      const city = await response.json()
      dispatch({type:'city/loaded', payload: city})
    } catch (error) {
      dispatch({type: 'rejected', payload: 'There was an error in loading data'})
    }
  }

  async function createCity(newCity) {
    try {
      dispatch({type: 'loading'})
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      dispatch({type: 'city/created',payload: data })

    } catch (error) {
      dispatch({type: 'rejected', payload: 'There was an error in creating data'})
    } 
  }

  async function deleteCity(id) {
    try {
      dispatch({type: 'loading'})
      const response = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      
      })

      const data = await response.json()
      dispatch({type: 'city/deleted', payload: id})

    } catch (error) {

      dispatch({type: 'rejected', payload: 'There was an error in deleting city'})
    } 
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        currentCity,
        isLoading,
        error,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined)
    throw new Error('useCities hook must be used within a CitiesProvider')

  return context
}

export { CitiesProvider, useCities }
