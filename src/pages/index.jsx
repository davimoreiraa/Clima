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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap" rel="stylesheet" />
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
               className={`form-control`} 
               id="city" 
               placeholder="Insira aqui a cidade"
               onChange={(e) => {
                setCity(e.target.value)
                }}
                value={city}
               />
               <div className={`d-flex justify-content-center`}>
                <button 
                  className={`${styles.search_btn} btn btn-secondary col-8 col-sm-7 col-lg-5 col-xl-3 `}
                  type='button'
                  onClick={() => {
                    takeDataAPI()
                    setCityToBeExbithed(city)
                    console.log(data)
                  }}>
                    Buscar
                 </button>
               </div>
            </div>
          </div>
          <div className={`col-12 d-flex justify-content-center`}>
            <article className={`${styles.climate_box} ${ data.current ? '' : 'd-none' } rounded-3 d-inline-flex`}>
              <div>
                <div className={`${styles.climate_infos}`}>
                  { data.current == undefined ? '' : 
                    <h2 className={`${styles.location}`}>
                      {data.location.name}, {data.location.region} - {data.location.country} 
                    </h2> 
                  }
                  <div className={`d-flex justify-content-center`}>
                  <div className={`${styles.line} col-10`}></div>
                  </div>
                  <div className={`${styles.container} d-flex`}>
                  { data.current == undefined ? '' :
                   <h3 className={`${styles.temperature}`}>
                      {data.current.temp_c}°C
                    </h3>
                  }
                  { data.current == undefined ? '' :
                   <h3 className={`${styles.feelslike}`}>
                    Sensação: <strong>{data.current.feelslike_c}°C</strong>
                    </h3>
                  }
                  </div>
                  { data.current == undefined ? '' :
                    <p className={`${styles.humidity}`}>Umidade: <strong>{data.current.humidity}%</strong></p>
                  }
                </div>
                <div className={`d-flex justify-content-center`}>
                  {data.current == undefined ? '' : <img src={data.current.condition.icon} /> }
                  { data.current == undefined ? '' :
                   <h3 className={`${styles.text}`}>
                      {data.current.condition.text}
                    </h3>
                  }
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  )
}