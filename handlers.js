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
            res.cookie("LoggerUserID",result.rows[0].id,{maxAge:600000});
            res.redirect("/PoliceView")
         }
    
        else {res.status (403).send(`<h1> Wrong Password <h1>`)}

    }
  
}
//-------------------------------------------------------------------------------------------------------

function Police_form_create(req,res) {// send the html page as a response

    res.status(200).send(
        Police_form_template("create",{type:'',location:'',date:new Date(),time:'',userID:-1,description:'',title:''})// returns the html in create mode with the text "create" in the type 
        

    )}

    async function Police_form_edit(req,res) {// send the html page as a response
        console.log(req.params.crimeID);
        const ResultsItemDetails= await db.query(`select * from crime where id = ${req.params.crimeID}`) // use crime ID send in the URL and pull the relevant details from the DB per this ID
            const CaseItemDetails = ResultsItemDetails.rows[0]
            console.log(CaseItemDetails)
        res.status(200).send(
            Police_form_template("edit",CaseItemDetails)// returns the html in Edit mode with the text "edit" in the type 
            
    
        )}
async function police_form_view(req,res){
    const ResultsItemDetails= await db.query(`select * from crime where id = ${req.params.crimeID}`) // use crime ID send in the URL and pull the relevant details from the DB per this ID
    const CaseItemDetails = ResultsItemDetails.rows[0];
    const ResultsWitnessInput= await db.query(`select description from witness where crimeID = ${req.params.crimeID}`) // use crime ID send in the URL and pull the relevant details from the DB per this ID
    const WitnessInputs = ResultsWitnessInput.rows.map(x=>x.description).join("\r\n ******************************************************\r\n");
    res.status(200).send(
        Police_form_template("view",CaseItemDetails,WitnessInputs)// returns the html in Edit mode with the text "edit" in the type 
        

    )
} 
function Police_form_template(type,data,witnessData=""){
      let times=[];
      for(let i=0;i<24;i++){
        let time=i<10?"0"+i+":00":i+":00";
        times.push(time)
      }
      console.log(data);
     let submitButtonText =  type==='edit'?'Save':'Create Crime';// switch the button name between save and creat depending on the form usage
     let formAction =  type==='edit'?`/EditCrime/${data.id}`:'/CreateCrime';
     return  `<!DOCTYPE html>
     <html lang="en">
     <head>
         <link rel="stylesheet" href="/C3.css">
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
              <form action="${formAction}" method="POST">
             <label for="CrimeID">Crime ID</label>
             <input id="CrimeID" name="CrimeID" type="text" disabled value="${data.id?data.id:""}">
     
            
            <label for="CrimeDate">DATE</label>  <!--Crime Date search-->
             <input id="CrimeDate" name="CrimeDate" type="date" value="${data.date.toISOString().substring(0,10)}"><!--choosing the first 10 digits of the date format "2022-12-08T22:00:00.000Z"-->
     
             <label for="Type">Choose Crime Type:</label> <!--crime type list-->
             <select name="Type" id="Type" value="${data.type}">
               <option value="trafic" ${data.type.trim()=='trafic'&&'selected'}>Trafic</option>
               <option value="murder" ${data.type.trim()=='murder'&&'selected'}>Murder</option>
               <option value="drugs" ${data.type.trim()=='drugs'&&'selected'}>Drugs</option>
               <option value="shooting" ${data.type.trim()=='shooting'&&'selected'}>Shooting</option>
             </select>
     
             <label for="Location">Location</label> <!--location input-->
             <input id="Location" name="Location" type="text" value="${data.location}">
     
             <label for="Time">Choose Time:</label> <!--time choice-->
             <select name="Time" id="Time">
               ${times.map(x=>`<option value="${x}" ${x===data.time.substring(0,5)?"selected":""}>${x}</option>`)}<!--gives list of hours and select the right hour when bringing time details to the edit form-->
              
             </select>
     <br>
             <label for="CrimeTitle">Crime Title</label><!--crime title input-->
             <input class="CrimeTitle" id="CrimeTitle" name="CrimeTitle" type="text" value="${data.title}">
     <br>
             <textarea placeholder="Write Crime Details Here" id="text" name="text" type="text">${data.description}</textarea><!--crime details input window-->
             <br>
             <textarea  id="text" name="text" type="text" style="visibility: ${type=="view"?"visible":"hidden"}" disabled>${witnessData}</textarea><!--crime details input window-->
            
             <button type="submit" style="visibility: ${type=="view"?"hidden":"visible"}" >${submitButtonText}</button>
           </form>
     
          
          </div>
         </div>
      
     
     
     </body>
     </html>`
}


async function EditCrime(req,res) {
    const CrimeDetails=req.body;

       console.log(CrimeDetails)
   
   await db.query(
    `UPDATE crime SET type='${CrimeDetails.Type}',location='${CrimeDetails.Location}',date='${CrimeDetails.CrimeDate}',time='${CrimeDetails.Time}',userID=${req.cookies.LoggerUserID},description='${CrimeDetails.text}',title='${CrimeDetails.CrimeTitle}' where id=${req.params.crimeID}`//insert a crime item details from the create form in the DB crime table
   )
   res.redirect("/PoliceView")// redirect to the Police view page after creating a new case
}
    async function CreateCrime(req,res) {
        const CrimeDetails=req.body;
           
       
       await db.query(
        `INSERT INTO crime (type,location,date,time,userID,description,title) VALUES ('${CrimeDetails.Type}', '${CrimeDetails.Location}', '${CrimeDetails.CrimeDate}', '${CrimeDetails.Time}','${req.cookies.LoggerUserID}','${CrimeDetails.text}','${CrimeDetails.CrimeTitle}')`//insert a crime item details from the create form in the DB crime table
       )
       res.redirect("/PoliceView")// redirect to the Police view page after creating a new case
    }
//--------------------------------------------------------------------------------------------------------------------

async function police_view(req,res) {// send the html page as a response
const CrimeListResult =await db.query( "select * from crime") //bring all crime DB
const CrimeList = CrimeListResult.rows // represent crime items

    res.status(200).send(
        ` <!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="/C3.css"><!--"/" for css when placing it in public-->
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
        <form action="/policeSearchCrime" method="POST">
        <label for="CrimeID">Crime ID</label> 
        <input id="CrimeID" name="CrimeID" type="text">

       
        <button type="submit" class="search"><i class="fa fa-search"></i></button><!--search icon-->
      </form>
      
        <a href="/PoliceForm" type="button"> <button class="creatbutton" type="submit">Creat New Case</button></a><!--button link to create page-->
       
      
<div id="CrimeList">

 ${CrimeList.map(x=>`<div onClick="window.location.href='/Police_Form_View/${x.id}'" class="CrimeItem">
 <h4>${x.title}</h4> 
 <a href="/PoliceForm/${x.id}" type="button"> <button class="edit"> <i class="fa fa-edit"></i>  </button></a><!--button link to edit page-->
 
</div>   `)}
 
</div>
     
     </div>
    </div>
 


</body>
</html>`
    )}
    async function policeSearchCrime(req,res){
        const ResultsItemDetails= await db.query(`select * from crime where id = ${req.body.CrimeID}`) // use crime ID send in the URL and pull the relevant details from the DB per this ID
        const CaseItemDetails = ResultsItemDetails.rows[0];
        const ResultsWitnessInput= await db.query(`select description from witness where crimeID = ${req.body.CrimeID}`) // use crime ID send in the URL and pull the relevant details from the DB per this ID
        const WitnessInputs = ResultsWitnessInput.rows.map(x=>x.description).join("\r\n ******************************************************\r\n");
        res.status(200).send(
            Police_form_template("view",CaseItemDetails,WitnessInputs)// returns the html in Edit mode with the text "edit" in the type 
            
    
        )
    }

    



//--------------------------------------------------------------------------------------------------------------------

  function witness_form_template(crimeID,crimeTitle,saveEnabled,locations){
    let times=[];
    for(let i=0;i<24;i++){
      let time=i<10?"0"+i+":00":i+":00";
      times.push(time)
    }

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="/C3.css">
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
             <form action="/searchCrime" method="POST">
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
              ${locations.map(x=>`<option value="${x}">${x}</option>`)}
             
            </select>
    
            <label for="Time">Choose Time:</label><!--time choice-->
            <select name="Time" id="Time">
            ${times.map(x=>`<option value="${x}" >${x}</option>`)} <!--gives list of hours-->
              
              
            </select>
            <button type="submit" class="search"><i class="fa fa-search"></i></button> <!--search button icon-->
            </form>
            <form action="/addWitnessInput/${crimeID}" method="POST">
           <h2 id="Crime-Title">${crimeTitle}</h2>
            <textarea placeholder="Write your input here" id="text" name="text" type="text"></textarea><!--text box for details input-->
           
            <button type="submit" ${saveEnabled?"":"disabled"}>Save</button>
          </form>
    
         
         </div>
        </div>
     
    
    
    </body>
    </html> `
}
async function searchCrime(req,res){
  const x=req.body
  console.log(x);
  const result = await db.query("select location from crime group by location");
  const locations = result.rows.map(x=>x.location);
  const CrimeSearchResult= await db.query(`select id,title from crime where date='${x.CrimeDate}' and type='${x.Type.trim()}' and location='${x.Location.trim()}' and time='${x.Time+":00"}'`)
  if (CrimeSearchResult.rows.length>0) res.status(200).send(witness_form_template(CrimeSearchResult.rows[0].id,CrimeSearchResult.rows[0].title,true,locations))
  else res.redirect("/WitnessForm")
}
async function saveWitnessInput(req,res){
    await db.query(`INSERT INTO witness (description,crimeID) VALUES ('${req.body.text}',${req.params.crimeID})`)
    res.redirect("/")
}
async function witness_form(req,res) {// send the html page as a response
    const result = await db.query("select location from crime group by location");
    const locations = result.rows.map(x=>x.location);
 

    res.status(200).send(witness_form_template(-1,"#######",false,locations))}


module.exports= {C3_homepage,Police_form_create,Police_form_edit,police_view,witness_form,LogIn,CreateCrime,EditCrime,searchCrime,saveWitnessInput,police_form_view,policeSearchCrime}; //export function