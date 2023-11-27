import db from "../../db.js";

export const getMaterials = async(req, resp) => {
    try {
        const result = await db.query(`SELECT * FROM ConsultMaterials`)
        db.release()
        return resp.json(result);    
    } catch (error) {
        console.error(error);
        db.release()
        return resp.status(404).json({ error: "Error al obtener materiales" });
    }
}

export const addMaterial = async(req, resp) => {
    try {
        const {nombre, stock, unidad, precio} = req.body
        await db.query('INSERT INTO material (name, unit_of_measurement) VALUES (?, ?)', [nombre, unidad])
        const materialId = await db.query('SELECT LAST_INSERT_ID()').insertId
        await db.query('INSERT INTO material_stock (material_id, value) VALUES (?, ?)', [materialId,stock])
        await db.query('INSERT INTO material_cost (material_id, value) VALUES (?, ?)', [materialId, precio])
        db.release()
        return resp.json({message: "Material agregado exitosamente"})
    } catch (error) {
        console.error(error);
        db.release()
        return resp.status(404).json({error: "Error al agregar el materiales"})
    }
}

export const updateMaterial = async(req, resp) => {
    try {
        const {id} = req.params
        const {nombre, stock, unidad, precio} = req.body
        await db.query('UPDATE material SET name = ?, unit_of_measurement = ? WHERE id = ?', [nombre, unidad, id])
        await db.query('UPDATE material_stock SET value = ? WHERE material_id = ?', [stock, id])
        await db.query('UPDATE material_cost SET value = ? WHERE material_id = ?', [precio, id])
        db.release()
        return resp.json({message: "Material actualizado exitosamente"})
    } catch (error) {
        console.error(error);
        db.release()
        return resp.status(404).json({error: "Error al actualizar el material"})
    }
}

export const deleteMaterial = async(req, resp) => {
    try {
        const {id} = req.params
        await db.query('DELETE FROM material WHERE id = ?', [id])
        await db.query('DELETE FROM material_cost WHERE material_id = ?', [id])
        await db.query('DELETE FROM material_stock WHERE material_id = ?', [id])
        db.release()
        return resp.json({message: "Material eliminado exitosamente"})
    } catch (error) {
        console.error(error);
        db.release()
        return resp.status(404).json({error: "Error al eliminar el material"})
    }
}