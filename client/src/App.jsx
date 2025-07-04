import './App.css'
import MainComponent from './components/MainComponent'
import Navbar from './components/navbar'

function App() {


  return (
    <div className='lg:p-[20px] flex flex-col gap-20 h-screen items-center'>
      <Navbar/>
      <MainComponent/>
    </div>
  )
}

export default App
