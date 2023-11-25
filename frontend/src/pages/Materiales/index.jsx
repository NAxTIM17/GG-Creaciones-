import './Materiales.css'
import TableTitle from '../../components/Table'
import productos from './data'
import SearchBar from '../../components/SearchBar'
import { useState } from 'react'

export default function Materiales(){

    const [filtro, setFiltro] = useState('')


    return(
        <>
            <div className="Container">
                <div className="materiales-container">
                    <div className="materiales-container-title">
                        <h1>MATERIALES</h1>
                    </div>
                    <div className="materiales-container-search">
                        <SearchBar value = {setFiltro} />
                    </div>
                    <div className="materiales-container-table">
                        <TableTitle filtro={filtro} onFilterChange = {setFiltro}/>
                    </div>
                </div>
            </div>
        </>
    )
}