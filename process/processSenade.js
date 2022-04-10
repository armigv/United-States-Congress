let senateTable = document.getElementById("senateData"); //Donde voy a posesionar datos->DOM
let senateMembers = senateDatos.results[0].members; //De donde salen los datos
console.log(senateMembers); //Prueba de data a traves de js console.log()
let select_states = document.getElementById("states"); //Datos en especificos
let filter_states = []; //vector de estados
let filter_members = []; //vector de miembros
let filter_party = []; //filtro de partidos
let statesAll = "all"; //Generar persistencia
let party_checkboxes = document.getElementsByName("party");

function filterOfMembers() {
  if (filter_party.length === 0) {
    filter_members = senateMembers;
  } else {
    filter_members = []; //operar con funcion flecha
    senateMembers.forEach((members) => {
      if (member.party === "D" && filter_party.includes("D")) {
        filter_members.push(member);
      } else if (member.party === "R" && filter_party.includes("R")) {
        filter_members.push(member);
      } else if (member.party === "I" && filter_party.includes("I")) {
        filter_members.push(member);
      }
    });
  }
  if (statesAll === "all") {
    filter_members = filter_members;
  } else {
    filter_members = filter_members.filter(
      (member) => member.state === statesAll
    );
  }
}
function loadTable() {
  senateTable.innerHTML = ""; //Limpiar zona objetivo de DOM
  filterOfMembers();
  filter_members.forEach((member) => {
    let item = document.createElement("tr"); //Crear rows o filas
    item.innerHTML = `<td><a target='_blank' href='${member.url}'>
       ${member.first_name},${member.middle_name || ""}  
       ${member.last_name}</a></td>
       <td>${member.party}</a></td>   
       <td>${member.state}</a></td>  
       <td>${member.seniority}</a></td>  
       <td>${member.total_votes}</a></td>`;
    senateTable.appendChild(item); //lista de componentes de datos visuales
  });
}
loadTable();
