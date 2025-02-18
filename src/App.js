import React from 'react';
import './App.css';
import Manager from './components/manager';
import Navbar from './components/navbar';
import Footer from './components/footer';


function App() {
  return (
    <>
    <Navbar/>
    <div className="App  absolute inset-0 -z-10 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="py-40 min-h-[80vh]">
      <Manager/>
      </div>
      </div>
      <Footer />

    </>
  );
}

export default App;
