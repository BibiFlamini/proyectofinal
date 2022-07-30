var pool = require('./bd');

async function getPromociones() {
        var query = 'select * from promociones';
        var rows = await pool.query(query);
        return rows;
  
}

async function deletePromocionesById(id) {
        var query = 'delete from promociones where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
}

module.exports = { getPromociones, deletePromocionesById }