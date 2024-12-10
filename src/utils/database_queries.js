const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ItalianResources',
  password: 'postgres',
  port: 5432,
})

async function getConjugation(verb){
   
    try {
        var query = "select conjugation from conjugations where verb = '"+verb+"'"
        const res = await pool.query(query)
        return res.rows
     } catch (err) {
        console.error(err);
     } finally {
     }    
}


async function saveConjugation(verb,conjugation){
    
    try {
        
        var query = "insert into conjugations (verb,conjugation) values ('"+verb+"' , '"+conjugation+"' ) "
        const res = await pool.query(query)
        return res.rows
     } catch (err) {
        console.error(err);
     } finally {
     }  
}

module.exports = {getConjugation,saveConjugation}