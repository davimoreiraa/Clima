/* ------------------  COMPONENTS -------------------*/
import Head from 'next/head'

/* ------------------ STYLES -------------------*/
import styles from './styles.module.css'

/* ------------------ RESOURCES -------------------*/
import axios from "axios"
import { useState } from 'react'

export default function Home() {
  const [city, setCity] = useState('')
  const [cityToBeExbithed, setCityToBeExbithed] = useState('')
  const [data, setData] = useState({}) 

  const takeDataAPI = () => {
    return axios.get(`http://api.weatherapi.com/v1/current.json?key=99ee11124ee04eed822233932222707&q=${city}&aqi=no`)
        .then((response) => setData(response.data))
        .catch((err) => console.log(err))
  }

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Website que exibe o clima de uma cidade escolhida"
        />
        <link rel="icon" href="/sun.png" />
      </Head>
      <main className={`${styles.content} d-flex justify-content-center`}>
        <div className={`${styles.container} col-11 `}>
          <div className={`${styles.title_container} d-flex justify-content-center`}>
            <h1>Previsão do tempo</h1>
          </div>
          <div className={`d-flex justify-content-center`}>
            <div className={`${styles.input_container} col-10 col-md-7 `}>
              <input
               type="text" 
               className="form-control" 
               id="city" 
               placeholder="Insira aqui a cidade"
               onChange={(e) => {
                setCity(e.target.value)
              }}
              value={city}
               />
               <button 
               onClick={() => {
                takeDataAPI()
                setCityToBeExbithed(city)
                console.log(data)
                }}>
                  Buscar
                </button>
            </div>
          </div>
          <article className={`${styles.climate_box}`}>
            <div>
              {data.current == undefined ? '' : <img src={data.current.condition.icon} /> }
            </div>
            <div className={`${styles.climate_infos}`}>
              <h2>{cityToBeExbithed}</h2>
              {data.current == undefined ? '' : <h2>{data.current.feelslike_c}</h2>}
            </div>
          </article>
        </div>
        <div>
        </div>
      </main>
    </div>
  )
}