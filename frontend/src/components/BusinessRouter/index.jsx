import { Routes, Route, Navigate } from 'react-router-dom'

// import ProfitsPage from '../../pages/Profits'
// import Home from '../../pages/Home'
import ErrorPage from '../../pages/Error'
import SalesPage from '../../pages/Sales'
import SalesNewPage from '../../pages/Sales/New'
import Materiales from '../../pages/Materiales'


const BusinessRouter = () => {
    return (
        <Routes>
            <Route path='home' element={<h1>Home</h1>}/>
            <Route path='materials'>
                <Route index element={<Materiales />}/>
                <Route path='new' element={<div>Where new materials should go</div>} />
            </Route>
            <Route path='sales'>
                <Route index element={<SalesPage />}/>
                <Route path='new' element={<SalesNewPage />} />
            </Route>
            {/*<Route path='profits' element={<ProfitsPage />} />*/}
            <Route path='/' element={<Navigate to='dashboard'/> }/>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    ) 
}

export default BusinessRouter
