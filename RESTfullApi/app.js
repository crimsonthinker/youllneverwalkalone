const express = require('express')
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcrypt-nodejs')


//This function is used to create a connection to
//the local mysql database. 
function connection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'cn_ass_1'
    })
}


/*This for login. This request receives 2 params:
- email : string
- password: string
Then it check email in the database. 
- If email existed, check the password.
    - If the password is the same with it in database, return http status 200
    - Else return http status 401 Unauthorized
- If it does not return http status 404
Password is encrypted before comparing.
*/
app.get("/login", (req,res)=>{
    //Get all params
    var email = req.query.email
    var password = req.query.password

    //This query for checking the exitstence of the email
    const queryString = "SELECT * FROM users WHERE email = ?"; 
    
    //Connection to the database for checking
    connection().query(queryString,[email],(err,rows,fields)=>{
        //This error
        if(err){
            console.log("Failed to query for users: " + err.message)
            return
        }
        //If the rows.length = 1,so the email exists in the database
        if(rows.length==1){
            //Check password
            if(bcrypt.compareSync(password,rows[0].password)){
                //Login ok
                res.sendStatus(200)
                console.log("Login successfully")
                return
            }
            //Login fail. Error password
            res.sendStatus(401)
            console.log("Password failed")
            return
        }
        else{
            //The email does not exist in the database
            res.sendStatus(404)
            console.log("Email not found.")
            return
        }
    })
})


/*This for register. This request receives 7 params:
- email : string
- password : string
- username : string
- isheat : boolean (true or false)
- islight : boolean (true or false)
- ishumid : boolean (true or false)
- ishumidsoil : boolean (true or false)
Then it check email in the database. 
- If email existed, return http status 404
- If it does not, insert to the database and return http status 200
Password is encrypted before saving to the database.
*/
app.get("/register", (req,res)=>{
    //Get all params
    var email = req.query.email
    var password = req.query.password
    var username = req.query.username
    var isheat =  req.query.isheat.toLowerCase() == 'true'? 1: 0
    var ishumid = req.query.ishumid.toLowerCase()  == 'true'? 1: 0
    var islight = req.query.islight.toLowerCase()  == 'true'? 1: 0
    var ishumidsoil = req.query.ishumidsoil.toLowerCase() == 'true'? 1: 0

    //Encrypt password
    var encryptedPassword = bcrypt.hashSync(password)

    //Use to check the existence of the user email
    const queryString = "SELECT * FROM users WHERE email = ?"; 
    
    //This connection to check the existence of the user email
    connection().query(queryString,[email],(err,rows,fields)=>{
        //Error when the queryString is fail
        if(err){
            console.log("Failed to query for users: " + err.message)
            return
        }
        //If the result has one line. So that email was existed
        if(rows.length==1){
            res.sendStatus(404)
            console.log("Email existed.")
            return
        }
        else{
            //This query for inserting the user info.
            const queryString = "insert into users(email,password,username,isheat,ishumid,islight,ishumidsoil) values(?,?,?,?,?,?,?)"; 
            
            //This connection for inserting the user info
            connection().query(queryString,[email,encryptedPassword,username,isheat,ishumid,islight,ishumidsoil],(err,rows,fields)=>{
                //Check if the query was failed
                if(err){
                    console.log("Failed to query for users: " + err.message)
                    return
                }
                //Insert successful. Return http response ok
                res.sendStatus(200)
                console.log("Insert successfulley")
                return
            })
        }
    })
})


/*This will get the information of an email. This will return
- email
- isheat
- ishumid
- islight
- ishumidsoil
with the same order
*/
app.get("/getsub",(req,res)=>{
    //Get mail
    var email = req.query.email

    //This query for getting information
    const queryString = "SELECT * FROM users WHERE email = ?"; 
            
    //This connection for inserting the user info
    connection().query(queryString,[email],(err,rows,fields)=>{
        //Check if the query was failed
        if(err){
            console.log("Failed to query for users: " + err.message)
            return
        }
        //Check the information
        if(rows.length==1){
            //The email exits, return the result
            //Map for get some of the result information
            const returnValue = rows.map((row)=>{
                return {email: row.email,
                        isheat: row.isheat,
                        ishumid: row.ishumid,
                        islight: row.islight,
                        ishumidsoil: row.ishumidsoil}
            })
            res.json(returnValue)
            return
        }
        else{
            //Email does not exist. Return http status 404
            res.sendStatus(404)
            console.log("Get subcribe information fail.")
            return
        }
    })
})

/*This will update the subcribe of the email
*/
app.get("/update",(req,res)=>{
    //Get all params
    var email = req.query.email
    var isheat =  req.query.isheat.toLowerCase() == 'true'? 1: 0
    var ishumid = req.query.ishumid.toLowerCase()  == 'true'? 1: 0
    var islight = req.query.islight.toLowerCase()  == 'true'? 1: 0
    var ishumidsoil = req.query.ishumidsoil.toLowerCase() == 'true'? 1: 0

    //This query for getting information
    const queryString = "SELECT * FROM users WHERE email = ?"; 
            
    //This connection for inserting the user info
    connection().query(queryString,[email],(err,rows,fields)=>{
        //Check if the query was failed
        if(err){
            console.log("Failed to query for users: " + err.message)
            return
        }
        //Check the information
        if(rows.length==1){
            //The email exits, return the result
            const updateQuery = "UPDATE users SET isheat =?, ishumid =?, islight=?, ishumidsoil=? WHERE email = ?";
            //Connection for update
            connection().query(queryString,[isheat,ishumid,islight,ishumidsoil,email],(err,rows,fields)=>{
                //Check if the query was failed
                if(err){
                    console.log("Failed to query for users: " + err.message)
                    return
                }
                res.sendStatus(200)
                console.log("Update successfully.")
                return
            })
        }
        else{
            //Email does not exist. Return http status 404
            res.sendStatus(404)
            console.log("Update information fail.")
            return
        }
    })
})


//Open the server at the port 3000... 
//Start server by code: nodemon app.js
app.listen(3000,()=>{
    console.log("Server is starting on port 3000...")
})