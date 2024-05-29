/* ------------------  COMPONENTS -------------------*/
import Head from 'next/head'

/* ------------------ ICONS -------------------*/
import { LuWind } from "react-icons/lu";

/* ------------------ STYLES -------------------*/
import styles from './styles.module.css'

/* ------------------ RESOURCES -------------------*/
import axios from "axios"
import { useState } from 'react'

export default function Home() {
  const [city, setCity] = useState('')
  const [data, setData] = useState({}) 

  const takeDataAPI = () => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9ea3ecdb37e62c29b1808d406c1a8fa1`)
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
               className={`form-control`} 
               id="city" 
               placeholder="Insira aqui o País ou estado"
               onKeyUp={(e) => {
                setCity(e.target.value);
                }}
               />
               <div className={`d-flex justify-content-center`}>
                <button 
                  className={`${styles.search_btn} btn btn-secondary col-8 col-sm-7 col-lg-5 col-xl-3 `}
                  type='button' 
                  onClick={() => {
                    takeDataAPI()
                  }}>
                    Buscar
                 </button>
               </div>
            </div>
          </div>
          <div className={`col-12 d-flex justify-content-center`}>
            <article className={`${styles.climate_box} ${ data.main ? '' : 'd-none' } rounded-3 d-inline-flex`}>
              <div>
                <div className={`${styles.climate_infos}`}>
                  { data.main == undefined ? '' : 
                  <div className={`d-flex justify-content-center`}>
                    <h2 className={`${styles.location}`}>
                      {data.name}
                    </h2> 
                  </div>
                  }
                  <div className={`d-flex justify-content-center`}>
                    <div className={`${styles.line} col-10`}></div>
                  </div>
                  <div className={`${styles.container} d-flex`}>
                  { data.main == undefined ? '' :
                   <h3 className={`${styles.temperature} mb-0`}>
                      {(data.main.temp - 273.15).toFixed(2)}°C
                    </h3>
                  }
                  { data.main == undefined ? '' :
                   <h3 className={`${styles.feelslike} mb-0`}>
                    Sensação: <strong>{(data.main.feels_like - 273.15).toFixed(2)}°C</strong>
                    </h3>
                  }
                  </div>
                  { data.main == undefined ? '' :
                    <p className={`${styles.humidity}`}>Umidade: <strong>{data.main.humidity}%</strong></p>
                  }
                </div>
                <div className={`d-flex justify-content-start align-items-center`}>
                  {data.main == undefined ? '' : '' }
                  { data.main == undefined ? '' :
                   <h4 className={`${styles.text} mb-0 ms-0 pb-0 fs-3`}>
                     <LuWind className='text-black fs-2'/> Vento:  <strong>{data.wind.speed} m/s</strong> 
                    </h4>
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