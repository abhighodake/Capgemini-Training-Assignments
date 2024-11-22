let empId = []

let empInfo = []

let btn = document.getElementById("submit-btn");

btn.addEventListener("click", ()=>{

    const row = document.getElementById("input-row");

    const inp = row.querySelectorAll("input");
    let n = inp[0].value;
    let id = inp[1].value;
    let s = inp[2].value;
    let d = inp[3].value;
    let dep = inp[4].value;

    empInfo.push({name:n,empId :parseInt(id) ,skill:s, doj:d, department:dep});
    empId.push(empInfo.length);
    alert(`Employee ${n} is added successfully`);
    updateEmplView();
});

function updateEmplView(){
    const res = document.getElementById("res");
    let result = document.createElement("div")

    
    empInfo.forEach(ele =>{
        result.innerHTML = `<div>
        <b>name: ${ele.name},  id: ${ele.empId}, skill: ${ele.skill}, doj: ${ele.doj}, department : ${ele.department}<b>
        </div>`
        res.appendChild(result);
        // console.log(typeof ele.empId);ss
        
    })
}

const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", ()=>{
    const searchRow = document.getElementById("resultRow");
    const seIn = searchRow.querySelector("input");
    let searchId = seIn.value;
    const resDiv = document.getElementById("search");
    let newse = document.createElement("div");
    let counter =0;
  
    for(let i=0;i<empInfo.length;i++)
    {
        
        if(empInfo[i].empId === parseInt(searchId))
        {
            counter++;
            alert("Found")
            newse.innerHTML = `<div>
                    <b>name: ${empInfo[i].name},  id: ${empInfo[i].empId}, skill: ${empInfo[i].skill}, doj: ${empInfo[i].doj}, department : ${empInfo[i].department}<b>
                </div>`
            resDiv.appendChild(newse);
            break
        }
    }
    if(counter===0)
        alert("Emp not found");
});