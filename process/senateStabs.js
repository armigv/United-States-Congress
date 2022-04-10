//let senateMembers=senateDatos.results[0].members;
//console.log(senateMembers);
let senate_statics={  //objeto estadistico para pintarlo en DOM House
    democrats:[],
    republicans:[],
    independents:[],
    democrats_average_party:0,
    republicans_average_party:0,
    independents_average_party:0,
    most_engaged:[],
    least_engaged:[],
    most_loyalty:[],
    least_loyalty:[]
}
let senateMembers=senateDatos.results[0].members.filter(member =>member.total_votes != 0);
//Calculo de senadores por estados
function loadSenatePartyMember(party,caract)
{   senate_statics[party]=senateMembers.filter(member =>member.party===caract)
}
//Llamar a la funcion por cada partido
loadSenatePartyMember('democrats','D');
loadSenatePartyMember('republicans','R');
loadSenatePartyMember('independents','ID');
//--------------------------------------------------------
//Calculo de porcentaje de votos por partido
function estimateSenateAverageVotes(party,membersVotes)
{
    senate_statics[party].forEach(member =>{
        senate_statics[membersVotes]=senate_statics[membersVotes]+
                                    member.votes_with_party_pct/senate_statics[party].length;
                                   
    })
}
//Llamar a la funcion por cada partido
estimateSenateAverageVotes('democrats','democrats_average_party');
estimateSenateAverageVotes('republicans','republicans_average_party');
estimateSenateAverageVotes('independents','independents_average_party');
//--------------------------------------------------------
//Estimacion de mas/menos comprometidos/leales(Attendance/Loyalty)
function estimateStatsMembers(votes, most, least)
{   senateMembers.sort((membermin,membermay)=>{
     if(membermin[votes]>membermay[votes])
        return 1;
    if(membermin[votes]<membermay[votes])
        return -1;
    return 0
    })
    for(let i=0; i < (Math.round(senateMembers.length*0.1));i++)
    {  senate_statics[most].push(senateMembers[i]);       }//Creciente

    for(let j=senateMembers.length-1;  j > senateMembers.length -1 -(Math.round(senateMembers.length*0.1));j--)
    {  senate_statics[least].push(senateMembers[j]);  }  //Decreciente
}
estimateStatsMembers("missed_votes_pct", 'most_engaged','least_engaged')
estimateStatsMembers("votes_against_party_pct", 'most_loyalty','least_loyalty')



