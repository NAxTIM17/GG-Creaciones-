import './Materiales.css'
import TableTitle from '../../components/Table'
import productos from './data'
import SearchBar from '../../components/SearchBar'
import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export default function Materiales(){

    const [filtro, setFiltro] = useState('')
    const navigate = useNavigate()

    

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
                        <TableTitle filtro={filtro}/>
                    </div>
                    <div className="button-add">
                        <Button color='primary' onClick={()=> navigate('/materials/new')}>
                            Agregar Material
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}