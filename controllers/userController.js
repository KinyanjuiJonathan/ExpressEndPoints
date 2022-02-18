const mssql = require('mssql')
const config = require('../config/db')

async function getUsers (req,res){
    try{
        await mssql.connect(config)
        const result = await (await mssql.query("SELECT * FROM users")).recordset
        res.json(result)
    } catch (err){
        console.log(err);
    }
}
async function getUser (req,res){
    const id = req.params.id
    try{
        let pool = await mssql.connect(config)
        let result1 = await pool.request()
        .query(`select * from users where id = ${id}`)
        res.json(result1.recordset)

    } catch (err){
        console.log(err);
    }
}
async function addUser (req,res){
    const{firstname, secondname, email, project, password} = req.body
    try{
        let pool = await mssql.connect(config)
        await pool.request()
        .query(`INSERT INTO users(firstname, secondname, email, project, password)
            VALUES('${firstname}','${secondname}','${email}','${project}','${password}')`)
        res.json("user added successfully")

    } catch (err){
        console.log(err);
    }
}
async function updateUser (req,res){
    const{firstname, secondname, email, project, password} = req.body
    const id = req.params.id
    try{
        let pool = await mssql.connect(config)
        await pool.request()
        .input('id', mssql.Int, id)
        .input('firstname', mssql.VarChar, firstname)
        .input('secondname', mssql.VarChar, secondname)
        .input('email', mssql.VarChar, email)
        .input('project', mssql.Text, project)
        .input('password', mssql.VarChar, password)
        .query('UPDATE users SET firstname = @firstname, secondname = @secondname, email = @email, project = @project, password = @password WHERE id = @id')

        res.json("user added successfully")

    } catch (err){
        console.log(err);
    }
}
async function deleteUser (req,res){
    const id = req.params.id
    try{
        let pool = await mssql.connect(config)
        let result1 = await pool.request()
        .query(`DELETE from users where id = ${id}`)
        res.json("User deleted successfully")

    } catch (err){
        console.log(err);
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}