import BusinessRouter from './components/BusinessRouter'
import HeaderBar from './components/HeaderBar'
import { NextUIProvider } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

function App() {
    const navigate = useNavigate()
    return (
        <NextUIProvider navigate={navigate}>
            <div className='min-h-screen flex flex-col'>
                <HeaderBar />
                <BusinessRouter />
            </div>
        </NextUIProvider>
    )
}

export default App
