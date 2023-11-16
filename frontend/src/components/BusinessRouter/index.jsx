import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom'

const BusinessRouter = () => {
    return (
        <Routes>  
            <Route path='materials'>
                <Route index element={<div>Where materials should go</div>}/>
                <Route path='new' element={<div>Where new materials should go</div>} />
            </Route>
            <Route path='sales'>
                <Route index element={<div>Where sales should go</div>}/>
                <Route path='new' element={<div>Where new sales should go</div>} />
            </Route>
            <Route path='incomes' element={<div>Where incomes should go</div>} />

            <Route path='*' element={<div>Where 404 error page should go</div>} />
        </Routes>
    ) 
}

export default BusinessRouter
