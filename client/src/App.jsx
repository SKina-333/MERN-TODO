import './App.css'
import MainComponent from './components/MainComponent'
import Navbar from './components/navbar'

function App() {


  return (
    <div className='lg:p-[20px] p-[25px] flex flex-col lg:gap-20 gap-5 h-dvh items-center'>
      <Navbar/>
      <MainComponent/>
    </div>
  )
}

export default App
