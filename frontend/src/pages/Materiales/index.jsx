import './Materiales.css'
import TableTitle from '../../components/Table'
import productos from './data'


export default function Materiales(){
    return(
        <>
            <div className="Container">
                <div className="materiales-container">
                    <div className="materiales-container-search">

                    </div>
                    <div className="materiales-container-table">
                        <TableTitle data={productos}/>
                    </div>
                </div>
            </div>
        </>
    )
}