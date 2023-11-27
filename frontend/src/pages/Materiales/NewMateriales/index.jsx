import './NewMaterials.css'
import {Input, Button} from '@nextui-org/react'
import DropDownPiola from '../../../components/Dropdown'

export default function NewMateriales(){
    return(
        <>
        <div className="newMaterial">
            <div className="container">
                <h1>Agregar Material</h1>
                <div className="container-inputs">
                    <Input className='my-2'type='text' label = "Nombre"/>
                    <div className="cantidad">
                    <Input className='my-2' type='text' label = "Cantidad"/>
                    <DropDownPiola/>
                    </div>
                    <Input className='my-2' type='text' label = "Precio"/>
                </div>
                <div className="container-button">
                    <Button color='primary'>
                        Agregar
                    </Button>
                </div>
            </div>
        </div>
        </>
    )
}