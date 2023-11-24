import BusinessRouter from './components/BusinessRouter'
import HeaderBar from './components/HeaderBar'
import { NextUIProvider } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

function App() {
    const navigate = useNavigate()
    return (
        <NextUIProvider navigate={navigate}>
            <HeaderBar />
            <BusinessRouter />
        </NextUIProvider>
    )
}

export default App
