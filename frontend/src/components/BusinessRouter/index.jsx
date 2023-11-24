import { Routes, Route, Navigate } from 'react-router-dom'
import ProfitsPage from '../../pages/Profits'
import Home from '../../pages/Home'
import ErrorPage from '../../pages/Error'

const BusinessRouter = () => {
    return (
        <Routes>
            <Route path='home' element={<Home />}/>
            <Route path='materials'>
                <Route index element={<div>Where materials should go</div>}/>
                <Route path='new' element={<div>Where new materials should go</div>} />
            </Route>
            <Route path='sales'>
                <Route index element={<div>Where sales should go</div>}/>
                <Route path='new' element={<div>Where new sales should go</div>} />
            </Route>
            <Route path='profits' element={<ProfitsPage />} />

            <Route path='/' element={<Navigate to='dashboard'/> }/>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    ) 
}

export default BusinessRouter
