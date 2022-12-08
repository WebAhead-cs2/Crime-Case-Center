const db = require("./database/connection");// DB connection object import

function C3_homepage(req,res) {// send the html page as a response

    res.status(200).send(`<!DOCTYPE html> 
    <html lang="en">
    <head>
        <link rel="stylesheet" href="C3.css">
        <meta charset="UTF-8">
    
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body id="home">
        <h1> <span class="red">C</span>RIME <span class="red">C</span>ASE <span class="red">C</span>ENTER </h1> <!--design title-->
        <p class="tilt"> <span class="red">C</span>3</p> <!--design title-->
        <div class="center"> <!--father div as surrounding border-->
        <div  class="logIn" id="LI-Container"> <!--login window-->
            <h3> Investigator LogIn </h3>
             <form action="/LogIn" method="POST">
            <label for="username">Username</label>
            <input id="username" name="username" type="text">
            <label for="password">Password</label>
            <input id="password" name="password" type="password">
           
            <button type="submit">Log-In</button>
          </form>
    
         
         </div>
        </div>
     <a href="/WitnessForm" type="button"><button>Witness Input</button></a> <!--button link to witness form page-->
    
    
    </body>
    </html>`) //send html file as a response
}

async function LogIn(req,res) {
    const user=req.body;
  const result= await db.query("select * from users where username='"+user.username+"'")// find the specific user in the DB users table and put it in result as object that includes array
    //      (`select * from users where username='${user.username}'`)  second option of the previous line
    
    if (result.rows.length<1)
    res.status (403).send(`<h1> USER NOT FOUND <h1>`)

    else {

        const pass= await db.query("select * from password where userID='"+result.rows[0].id+"'")// compare password table user id to user table id
        
        if (pass.rows[0].password===user.password){ //compare password entered with password in table 
            res.redirect("/PoliceView")
        }
    
        else {res.status (403).send(`<h1> Wrong Password <h1>`)}

    }
  
}
//-------------------------------------------------------------------------------------------------------


function Police_form(req,res) {// send the html page as a response

    res.status(200).send(

        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <link rel="stylesheet" href="C3.css">
            <meta charset="UTF-8">
        
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body Id="Witness">
            <h1> <span class="red">C</span>RIME <span class="red">C</span>ASE <span class="red">C</span>ENTER </h1>
            <p class="tilt"> <span class="red">C</span>3</p>
            <div class="center"> 
            <div class="witness" id="LI-Container">
                <h3> Police Input Form </h3>
                 <form action="Police-input" method="POST">
                <label for="CrimeID">Crime ID</label>
                <input id="CrimeID" name="CrimeID" type="text">
        
               
               <label for="CrimeDate">DATE</label>  <!--Crime Date search-->
                <input id="CrimeDate" name="CrimeDate" type="date">
        
                <label for="Type">Choose Crime Type:</label> <!--crime type list-->
                <select name="Type" id="Type">
                  <option value="trafic">Trafic</option>
                  <option value="murder">Murder</option>
                  <option value="drugs">Drugs</option>
                  <option value="shooting">Shooting</option>
                </select>
        
                <label for="Location">Location</label> <!--location input-->
                <input id="Location" name="Location" type="text">
        
                <label for="Time">Choose Time:</label> <!--time choice-->
                <select name="Time" id="Time">
                  <option value="01:00">00:00</option>
                  <option value="01:00">01:00</option>
                  <option value="02:00">02:00</option>
                  <option value="03:00">03:00</option>
                  <option value="04:00">04:00</option>
                  <option value="05:00">05:00</option>
                  <option value="06:00">06:00</option>
                  <option value="07:00">07:00</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                  <option value="23:00">23:00</option>
                  
                </select>
        <br>
                <label for="CrimeTitle">Crime Title</label><!--crime title input-->
                <input class="CrimeTitle" id="CrimeTitle" name="CrimeTitle" type="text">
        <br>
                <textarea placeholder="Write Crime Details Here" id="text" name="text" type="text"></textarea><!--crime details input window-->
               
                <button type="submit">Create Case</button>
              </form>
        
             
             </div>
            </div>
         
        
        
        </body>
        </html>`

    )}


//--------------------------------------------------------------------------------------------------------------------

function police_view(req,res) {// send the html page as a response

    res.status(200).send(
        ` <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="C3.css">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><!--import CSS icons folder online-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body Id="Witness">
    <h1> <span class="red">C</span>RIME <span class="red">C</span>ASE <span class="red">C</span>ENTER </h1>
    <p class="tilt"> <span class="red">C</span>3</p>
    <div class="center"> 
    <div class="witness" id="LI-Container">
        <h3> Police View </h3>
        
        <label for="CrimeID">Crime ID</label> 
        <input id="CrimeID" name="CrimeID" type="text">

       
        <button class="search"><i class="fa fa-search"></i></button><!--search icon-->
      
      
        <a href="/PoliceForm" type="button"> <button class="creatbutton" type="submit">Creat New Case</button></a><!--button link to create page-->
       
      
<div id="CrimeList">
 <div class="CrimeItem">
    <h4>title</h4> 
    <a href="/PoliceForm" type="button"> <button class="edit"> <i class="fa fa-edit"></i>  </button></a><!--button link to edit page-->
    
 </div>   
</div>
     
     </div>
    </div>
 


</body>
</html>`
    )}




//--------------------------------------------------------------------------------------------------------------------


function witness_form(req,res) {// send the html page as a response

    res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="C3.css">
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><!--import CSS icons folder online-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body Id="Witness">
        <h1> <span class="red">C</span>RIME <span class="red">C</span>ASE <span class="red">C</span>ENTER </h1>
        <p class="tilt"> <span class="red">C</span>3</p>
        <div class="center"> 
        <div class="witness" id="LI-Container">
            <h3> Witness Input Form </h3>
             <form action="witness-input" method="POST">
            <!-- <label for="CrimeID">Crime ID</label> 
            <input id="CrimeID" name="CrimeID" type="text"> -->
    
            <label for="CrimeDate">DATE</label>  <!--Crime Date search-->
            <input id="CrimeDate" name="CrimeDate" type="date">
    
            <label for="Type">Choose Crime Type:</label><!--crime type choice-->
            <select name="Type" id="Type">
              <option value="trafic">Trafic</option>
              <option value="murder">Murder</option>
              <option value="drugs">Drugs</option>
              <option value="shooting">Shooting</option>
            </select>
    
            <label for="Location">Choose a Location:</label><!--crime location choice-->
            <select name="Location" id="Location">
              <option value="Nazareth">Nazareth</option>
              <option value="Kofor maser">Kofor maser</option>
              <option value="Arab elshibli">Arab elshibli</option>
              <option value="Haifa">Haifa</option>
            </select>
    
            <label for="Time">Choose Time:</label><!--time choice-->
            <select name="Time" id="Time">
              <option value="01:00">00:00</option>
              <option value="01:00">01:00</option>
              <option value="02:00">02:00</option>
              <option value="03:00">03:00</option>
              <option value="04:00">04:00</option>
              <option value="05:00">05:00</option>
              <option value="06:00">06:00</option>
              <option value="07:00">07:00</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
              <option value="13:00">13:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
              <option value="18:00">18:00</option>
              <option value="19:00">19:00</option>
              <option value="20:00">20:00</option>
              <option value="21:00">21:00</option>
              <option value="22:00">22:00</option>
              <option value="23:00">23:00</option>
              
            </select>
            <button class="search"><i class="fa fa-search"></i></button> <!--search button icon-->
           <h2 id="Crime-Title">Crime title appears here</h2>
            <textarea placeholder="Write your input here" id="text" name="text" type="text"></textarea><!--text box for details input-->
           
            <button type="submit">Save</button>
          </form>
    
         
         </div>
        </div>
     
    
    
    </body>
    </html>`)}


module.exports= {C3_homepage,Police_form,police_view,witness_form,LogIn}; //export function