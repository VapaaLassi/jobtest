import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Select from 'react-select';
import Papa from 'papaparse';
import './App.css'

function RegionText({ dataRow }) {
  const all = dataRow.all;
  const foreign = dataRow.foreign;
  const region = dataRow.region;
  var percentage = new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(foreign / all);;
  var difference = new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(foreign / all - FOREIGN_AVG / 100));

  return (
    <div>
      <h3>{region}</h3>
    <p>
      {all}:sta varhaiskasvatukseen osallistuneesta lapsesta {foreign} ({percentage}) oli vieraskielisiä vuonna 2024.

      <p>
        Tämä on {difference} {foreign / all > (FOREIGN_AVG / 100) ? 'enemmän' : 'vähemmän'} kuin koko maan keskiarvo, joka on {FOREIGN_AVG}%.
      </p>
    </p>
    </div>);
}

function FilteredRegion({ languages }) {
  const [selectedRegion, setSelectedRegion] = useState('');
  const handleRegionChange = (option) => {
    setSelectedRegion(option?.value || '');
  };

  return (
    <>
      <h1>Päiväkotien kielitaustakone</h1>
      <div>
        <h4>Valitse kunta:</h4>
        <Select className='kuntavalinta' options={languages} onChange={handleRegionChange} />
      </div>
      <div>
        <RegionText dataRow={selectedRegion} />
      </div>
    </>
  );
}

export default function App() {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    Papa.parse("/PaivakotiKielet.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        setLanguages(
          data.map(row => ({
            label: row.Kunta,
            value: {
              region: row.Kunta,
              all: +row.All,
              foreign: +row.Foreign,
            }
          }))
        );
      }
    });
  }, []);

  return <FilteredRegion languages={languages} />;
}

// const LANGUAGES = [
//   { label: "Akaa", value: { region: "Akaa", all: 552, foreign: 14 } },
//   { label: "Espoo", value: { region: "Espoo", all: 16928, foreign: 4959 } },
//   { label: "Helsinki", value: { region: "Helsinki", all: 30870, foreign: 7313 } },
//   { label: "Forssa", value: { region: "Forssa", all: 529, foreign: 105 } },
//   { label: "Hämeenlinna", value: { region: "Hämeenlinna", all: 2700, foreign: 308 } },
//   { label: "Kempele", value: { region: "Kempele", all: 1331, foreign: 6 } },
// ];

const FOREIGN_AVG = 13.91;