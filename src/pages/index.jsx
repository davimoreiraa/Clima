/* ------------------  COMPONENTS -------------------*/
import Head from 'next/head'
import Image from 'next/image'

/* ------------------ STYLES -------------------*/
import styles from './styles.module.css'

/* ------------------ RESOURCES -------------------*/
import { useState, useEffect } from 'react'

export default function Home() {
  const [city, setCity] = useState('Hong Kong')
  const [data, setData] = useState({})

  useEffect(() => {
    takeDataAPI()
    console.log('ativou o useeffect')
  }, [])

  function takeDataAPI() {
    const fetchData = () => {
      return fetch("https://randomuser.me/api/")
            .then((response) => response.json())
            .then((data) => console.log(data));
    }

    fetch(`http://api.weatherapi.com/v1/current.json?key=99ee11124ee04eed822233932222707&q=${city}&aqi=no`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((data) => data.json())
    .then((data) => {
      setData(data)
    })
    .catch((err) => console.log(err))
    console.log(data)
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
            <h1 onClick={() => console.log(data)} >Previsão do tempo</h1>
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
                takeDataAPI()
              }}
               />
               <button>Buscar</button>
            </div>
          </div>
          <article className={`${styles.climate_box}`}>
            <div className={`${styles.climate_infos}`}>
              <h2>{city}</h2>
              <h2>{data.current.feelslike_c}</h2>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}
