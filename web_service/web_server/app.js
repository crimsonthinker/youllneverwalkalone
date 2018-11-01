const express = require('express')
const app = express()
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const saltRounds = 10



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
                const updateQuery = "UPDATE users SET lastlogin =? WHERE email = ?";
                //Connection for update
                connection().query(updateQuery,[new Date(),email],(err,rows,fields)=>{
                //Check if the query was failed
                    if(err){
                        console.log("Failed to query for users: " + err.message)
                    }
                    console.log("Update lastlogin successfully.") 
                })

                //Return the list of subcribe
                const returnValue = rows.map((row)=>{
                            return {email: row.email,
                                    username: row.username,
                                    isheat: row.isheat,
                                    ishumid: row.ishumid,
                                    islight: row.islight,
                                    ishumidsoil: row.ishumidsoil}
                })
                res.json(returnValue)
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


/*This for logout. When the user logout this will be call.
The input param is email.
*/

app.get("/logout",(req,res)=>{
    //Get mail
    var email = req.query.email
    
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
            const updateQuery = "UPDATE users SET lastlogout =? WHERE email = ?";
            //Connection for update
            connection().query(updateQuery,[new Date(),email],(err,rows,fields)=>{
                //Check if the query was failed
                if(err){
                    console.log("Failed to query for users: " + err.message)
                    res.sendStatus(404)
                    return
                }
                console.log("Update lastlogin successfully.")
                res.sendStatus(200)
                return
            })
        }
        else{
            res.sendStatus(404)
            console.log("Check email failed")
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
    var salt = bcrypt.genSaltSync(saltRounds)
    var encryptedPassword = bcrypt.hashSync(password,salt)

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
//An error here

app.get("/current_login",(req,res)=>{
    //This query for getting information
    const queryString = "SELECT * FROM users WHERE lastlogin >= lastlogout"; 
            
    //This connection for inserting the user info
    connection().query(queryString,[],(err,rows,fields)=>{
        //Check if the query was failed
        if(err){
            console.log("Failed to query for users: " + err.message)
            return []
        }
        //Check the information
        if(rows.length>0){
            //The email exits, return the result
            //Map for get some of the result information
            const returnValue = rows.map((row)=>{
                return {email: row.email,
                        isheat: row.isheat,
                        ishumid: row.ishumid,
                        islight: row.islight,
                        ishumidsoil: row.ishumidsoil}
            })
            console.log("Get list current login successfully")
            res.json(returnValue)
            return
        }
        console.log("No current login here.")
        res.sendStatus(404)
        return
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
            connection().query(updateQuery,[isheat,ishumid,islight,ishumidsoil,email],(err,rows,fields)=>{
                //Check if the query was failed
                if(err){
                    console.log("Failed to query for users: " + err.message)
                    return
                }
                console.log("Update successfully.")

                const returnValueQuery = "select * from users where email = ?";
                connection().query(returnValueQuery,[email],(err,rows,fields)=>{
                    if(err){
                        console.log("Error query: " + err.message)
                        res.sendStatus(404)
                        return
                    }
                    const returnValue = rows.map((row)=>{
                        return {email: row.email,
                                username: row.username,
                                isheat: row.isheat,
                                ishumid: row.ishumid,
                                islight: row.islight,
                                ishumidsoil: row.ishumidsoil}
                    })
                    res.json(returnValue)
                    return
                })
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


//Open the server at the port ... 
//Start server by code: nodemon app.js
app.listen(6969,()=>{
    console.log("Server is starting on port 6969...")
})