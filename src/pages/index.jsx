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
    return axios.get('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=9ea3ecdb37e62c29b1808d406c1a8fa1')
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
                      {data.city_name}
                    </h2> 
                  }
                  <div className={`d-flex justify-content-center`}>
                  <div className={`${styles.line} col-10`}></div>
                  </div>
                  <div className={`${styles.container} d-flex`}>
                  { data.current == undefined ? '' :
                   <h3 className={`${styles.temperature}`}>
                      {data.temp}°C
                    </h3>
                  }
                  </div>
                  { data.current == undefined ? '' :
                    <p className={`${styles.humidity}`}>Umidade: <strong>{data.humidity}%</strong></p>
                  }
                </div>
                {/* <div className={`d-flex justify-content-center`}>
                  {data.current == undefined ? '' : <img src={data.current.condition.icon} alt ='condition'/> }
                  { data.current == undefined ? '' :
                   <h3 className={`${styles.text}`}>
                      {data.current.condition.text}
                    </h3>
                  }
                </div> */}
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  )
}