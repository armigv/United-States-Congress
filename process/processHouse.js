let houseTable = document.getElementById("houseData");//Donde voy a posesionar datos->DOM
let houseMembers = houseDatos.results[0].members;//De donde salen los datos
let select_states = document.getElementById('states');//Datos en especificos
let filter_states=[];//vector de estados
let filter_members=[];//vector de miembros
let filter_party=[];//filtro de partidos
let statesAll='all';//Generar persistencia
let party_checkboxes=document.getElementsByName('party');
console.log(houseMembers);
var cond=0,conr=0,coni=0;

function filterOfMembers()
{
    if(filter_party.length===0)
    { filter_members=houseMembers;}
    else
    {filter_members=[];
       houseMembers.forEach(member => {
          if(member.party ==='D' && filter_party.includes('D') )
          {
              filter_members.push(member)
              cond++;
          }
          else
          if(member.party ==='R' && filter_party.includes('R') )
          {
              filter_members.push(member)   
              conr++;           
          }
          else
          if(member.party ==='I' && filter_party.includes('I') )
          {
              filter_members.push(member)  
              coni++;            
          }
       })    
    }
   if(statesAll==='all')
    { filter_members=filter_members; 
    }
   else{
        filter_members=filter_members.filter(member => member.state===statesAll)//Considere a all
    }
}
console.log(cond);console.log(conr);console.log(coni);

function createTable()
{ houseTable.innerHTML = '' //Para formatear cuerpo de la tabla->tbody
  filterOfMembers()
  filter_members.forEach(member => {
    let item=document.createElement('tr')
    item.innerHTML = `<td><a target='_blank' href='${member.url}'>
                     ${member.first_name},${member.middle_name || ""}  
                     ${member.last_name}</a></td>
                     <td>${member.party}</a></td>   
                     <td>${member.state}</a></td>  
                     <td>${member.seniority}</a></td>  
                     <td>${member.total_votes}</a></td>`  
                     houseTable.appendChild(item)  
   })
}
//createTable();
houseMembers.forEach(member =>   //senateMembers
    { if(!filter_states.includes(member.state))
        {  filter_states.push(member.state)
        }
    })
//Se puede generar un orden por estados
filter_states.sort();

filter_states.forEach(state => {
    let option = document.createElement('option')
    option.innerHTML = state
    option.value=state
    select_states.appendChild(option)
})

party_checkboxes.forEach(checkbox =>{
    checkbox.addEventListener('change',(event) =>{
        let checkboxSel  = event.target.value
        let checkLiber = event.target.checked
        if(filter_party.includes(checkboxSel) && !checkLiber)
        {
            filter_party=filter_party.filter(party => party !== checkboxSel)
        }
        else if(!filter_party.includes(checkboxSel) && checkLiber)
        { filter_party.push(checkboxSel)
        }
        createTable();//actualizar DOM
    })
})
select_states.addEventListener('change', (event)=>{
    let sel_state=event.target.value
    statesAll=sel_state
    createTable();//actualizar DOM
})
createTable();