// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react'

import styles from './Form.module.css'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import useUrlPosition from '../hooks/useUrlPosition'
import Message from './Message'
import Spinner from './Spinner'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from '../contexts/CitiesContext'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

function Form() {
  const navigate = useNavigate()
  const [lat, lng] = useUrlPosition()
  const {createCity, isLoading} = useCities()

  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState('')
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
  const [emoji, setEmoji] = useState()
  const [geoCodingError, setGeoCodingError] = useState('')


  useEffect(function() {
    if (!lat || !lng) return
    async function fetchCityData() {
      try {
        setIsLoadingGeoCoding(true)
        setGeoCodingError('')
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await response.json()
        
        if (!data.countryCode) 
          throw new Error(`That doen't seems to be a city. Click somewhere else`)

        setCityName(data.city || data.locality || '')
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))

      } catch (error) {
        setGeoCodingError(error.message)
        
      } finally {
        setIsLoadingGeoCoding(false)
      }
    }
    fetchCityData()
  }, [lat,lng])


  async function handleSubmit(event) {
    event.preventDefault()
    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat, lng}
    }
    await createCity(newCity)
    navigate('/app/cities')

  }

  if (!lat || !lng) return <Message message="Start by clicking somewhere on the map" />
  if (isLoadingGeoCoding) return <Spinner />
  if (geoCodingError) return <Message message={geoCodingError} />

  return (
    <form className={`${styles.form} ${isLoading? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker id='date' selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  )
}

export default Form
