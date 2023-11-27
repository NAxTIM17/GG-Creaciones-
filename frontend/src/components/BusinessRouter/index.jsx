import { Routes, Route, Navigate } from 'react-router-dom'
import ErrorPage from '../../pages/Error'
import Materiales from '../../pages/Materiales'
import NewMateriales from '../../pages/Materiales/NewMateriales'
const BusinessRouter = () => {
    return (
        <Routes>
            <Route path='home' element={<h1>Home</h1>}/>
            <Route path='materials'>
                <Route index element={<Materiales />}/>
                <Route path='new' element={<NewMateriales />} />
            </Route>
            <Route path='sales'>
                <Route index element={<h1>Ventas</h1>}/>
                <Route path='new' element={<div>Where new sales should go</div>} />
            </Route>
            <Route path='profits' element={<h1>Profit</h1>} />

            <Route path='/' element={<Navigate to='dashboard'/> }/>
            <Route path='*' element={<ErrorPage />} />
        </Routes>
    ) 
}

export default BusinessRouter
