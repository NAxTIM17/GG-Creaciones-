import db from "../../db";

export const getMaterials = async(req, resp) => {
    try {
        const result = await db.query(`
            SELECT material.name AS Nombre, material_stock.value AS Stock, material_cost.value AS Precio 
            FROM material
            INNER JOIN material_stock ON material.id = material_stock.material_id
            INNER JOIN material_cost ON material.id = material_cost.material_id
            `)
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
        const {nombre, stock, precio} = req.body
        await db.query('INSERT INTO material (name) VALUES ?', [nombre])
        const materialId = await db.query('SELECT LAST_INSERT_ID()').insertId
        await db.query('INSERT INTO material_stock (material_id, value) VALUES ?', [materialId,stock])
        await db.query('INSERT INTO material_cost (material_id, value) VALUES ?', [materialId, precio])
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
        const {nombre, stock, precio} = req.body
        await db.query('UPDATE material SET name = ? WHERE id = ?', [nombre, id])
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