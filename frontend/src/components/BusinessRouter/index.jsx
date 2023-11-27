import { Routes, Route, Navigate } from 'react-router-dom'

// import Home from '../../pages/Home'
import ErrorPage from '../../pages/Error'
import SalesPage from '../../pages/Sales'
import SalesNewPage from '../../pages/Sales/New'
import Materiales from '../../pages/Materiales'
import NewMateriales from '../../pages/Materiales/NewMateriales'
import ProfitsPage from '../../pages/Profits'


const BusinessRouter = () => {
    return (
        <Routes>
            <Route path='home' element={<h1>Home</h1>}/>
            <Route path='materials'>
                <Route index element={<Materiales />}/>
                <Route path='new' element={<NewMateriales />} />
            </Route>
            <Route path='sales'>
                <Route index element={<SalesPage />}/>
                <Route path='new' element={<SalesNewPage />} />
            </Route>
            <Route path='profits' element={<ProfitsPage />} />
            <Route path='/' element={<Navigate to='home'/> }/>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    ) 
}

export default BusinessRouter
