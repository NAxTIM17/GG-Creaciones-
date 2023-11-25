import './Materiales.css'
import TableTitle from '../../components/Table'
import productos from './data'
import SearchBar from '../../components/SearchBar'

export default function Materiales(){
    return(
        <>
            <div className="Container">
                <div className="materiales-container">
                    <div className="materiales-container-title">
                        <h1>MATERIALES</h1>
                    </div>
                    <div className="materiales-container-search">
                        <SearchBar />
                    </div>
                    <div className="materiales-container-table">
                        <TableTitle data={productos}/>
                    </div>
                </div>
            </div>
        </>
    )
}