import db from "../../db.js";

export const getMaterials = async(req, resp) => {
    try {
        const {result} = await db.pool.query(`SELECT * FROM ConsultMaterials`)
        //db.pool.end()
        return resp.json(result);    
    } catch (error) {
        console.error(error);
        //db.pool.end()
        return resp.status(404).json({ error: "Error al obtener materiales" });
    }
}

export const addMaterial = async(req, resp) => {
    try {
        const {nombre, stock, unidad, precio} = req.body
        await db.pool.query('INSERT INTO material (name, unit_of_measurement) VALUES (?, ?)', [nombre, unidad])
        const materialId = await db.pool.query('SELECT LAST_INSERT_ID()').insertId
        await db.pool.query('INSERT INTO material_stock (material_id, value) VALUES (?, ?)', [materialId,stock])
        await db.pool.query('INSERT INTO material_cost (material_id, value) VALUES (?, ?)', [materialId, precio])
        //db.pool.end()
        return resp.json({message: "Material agregado exitosamente"})
    } catch (error) {
        console.error(error);
        //db.pool.end()
        return resp.status(404).json({error: "Error al agregar el materiales"})
    }
}

export const updateMaterial = async(req, resp) => {
    try {
        const {id} = req.params
        const {nombre, stock, unidad, precio} = req.body
        await db.pool.query('UPDATE material SET name = ?, unit_of_measurement = ? WHERE id = ?', [nombre, unidad, id])
        await db.pool.query('UPDATE material_stock SET value = ? WHERE material_id = ?', [stock, id])
        await db.pool.query('UPDATE material_cost SET value = ? WHERE material_id = ?', [precio, id])
        //db.pool.end()
        return resp.json({message: "Material actualizado exitosamente"})
    } catch (error) {
        console.error(error);
        //db.pool.end()
        return resp.status(404).json({error: "Error al actualizar el material"})
    }
}

export const deleteMaterial = async(req, resp) => {
    try {
        const {id} = req.params
        await db.pool.query('DELETE FROM material WHERE id = ?', [id])
        await db.pool.query('DELETE FROM material_cost WHERE material_id = ?', [id])
        await db.pool.query('DELETE FROM material_stock WHERE material_id = ?', [id])
        //db.pool.end()
        return resp.json({message: "Material eliminado exitosamente"})
    } catch (error) {
        console.error(error);
        //b.pool.end()
        return resp.status(404).json({error: "Error al eliminar el material"})
    }
}