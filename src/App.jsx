import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function RegionText({ dataRow }) {
  const all = dataRow.all;
  const foreign = dataRow.foreign;
  var percentage = new Intl.NumberFormat('default', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(foreign / all);;

  return (
    <p>
      {dataRow.kunta}n {all}:sta varhaiskasvatukseen osallistuneesta lapsesta {foreign} ({percentage}) oli vieraskielisiä vuonna 2024.
    </p>);
}

function FilteredRegion({ languages }) {
  return (
    <>
      <div>
      </div>
      <h1>Päiväkotien kielitaustakone</h1>
      <div>
        <RegionText
          dataRow={languages[0]} />
      </div>

    </>
  );
}

function App() {
  return <FilteredRegion languages={LANGUAGES} />;
}

const LANGUAGES = [
  { kunta: "Akaa", all: 552, foreign: 14 },
  { kunta: "Espoo", all: 16928, foreign: 4959 },
  { kunta: "Helsinki", all: 30870, foreign: 7313 },
  { kunta: "Forssa", all: 529, foreign: 105 },
  { kunta: "Hämeenlinna", all: 2700, foreign: 308 },
  { kunta: "Kempele", all: 1331, foreign: 6 },
];

const FOREIGN_AVG = 13.91;

export default App
