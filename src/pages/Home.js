import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'

const Home = () => {

  const [input, setInput] = useState('');
  // console.log(input);

  const onInputChange = ev => {
    setInput(ev.target.value);

  }



  const onSearch = () => {
    fetch(`http://api.tvmaze.com/search/shows?q=${input}`).then(r => r.json()).then(result => {
      console.log(result);
    });

  }

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch()
    }


  }

  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input}></input>
      <button type="button" onClick={onSearch}>Search</button>
    </MainPageLayout>
  )
}

export default Home
