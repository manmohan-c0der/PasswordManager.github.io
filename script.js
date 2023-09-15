function maskPassword(pass){
    let str=""
    for (let index = 0; index < pass.length; index++) {
        str+="*"
        
    }
    return str
}

function copyText(txt){
    navigator.clipboard.writeText(txt).then(
        ()=>{
        //  alert("Copied the text : "+txt);
         document.getElementById('alert').style.display="inline"
         setTimeout(()=>{
             document.getElementById('alert').style.display="none"

         },2000);
        },
        ()=>{
            alert(failed)
        },
    );
}




const deletePassword = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdate = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdate))
    confirm(`Sucessfully deleted ${website}'s Password`)
    showUpdate()
}
// logic to fill table content 

const showUpdate = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length==0) {
        tb.innerHTML = "NO Data To Show"
    }
    else {
        tb.innerHTML = `<tr>
    <th>Website</th>
    <th>UserName</th>
    <th>Password</th>
    <th>Action</th>
  </tr>`
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];




            str += `<tr>
       <td>${element.website}<img onclick="copyText('${element.website}')" src="copy.svg" alt="Copy" width="24" height="24">
</td>
       <td>${element.username}<img onclick="copyText('${element.username}')" src="copy.svg" alt="Copy" width="24" height="24">
</td>
       <td>${maskPassword(element.password)}<img onclick="copyText('${element.password}')" src="copy.svg" alt="Copy" width="24" height="24">
</td>
       <td><button class="button1" onclick="deletePassword('${element.website}')">Delete</button></td>
       </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    website.value=""
    username.value=""
    password.value=""
}



console.log("Working")
showUpdate()
document.querySelector('.btn').addEventListener('click', (e) => {
    e.preventDefault()
    console.log("clicked")
    // console.log(username.value,password.value) 
    let passwords = localStorage.getItem("passwords")
    // console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("Password is Saved")
        localStorage.setItem("passwords", JSON.stringify(json))




    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("Password is Saved")
        localStorage.setItem("passwords", JSON.stringify(json))




    }
    showUpdate()
})