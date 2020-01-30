function executar(){
    
    //"Insert into rem_itens (idplano,moeda,tipoitem) values ('1245','BRL','D')"
    //"Delete from rem_itens where id = 2041"
    //"Update rem_itens set status = 7 where id = 20"

    //Textarea e Função para separar a String
    
    var executa = document.getElementById('execucao').value;
    var resposta = executa.split(" ")
    
    //Campos Backup e Rollback
    let bkp = document.getElementById('bkp')
    let rollback = document.getElementById('rollback')
    data = new Date();
    var ano = data.getFullYear()
    var mes = data.getMonth()+1
    var dia = data.getDate()
    
    if(mes < 10){
        mes = `0${mes}`
    }
    
    var anocompleto = `${ano}${mes}${dia}`
    
    //Lógica
    if(resposta[0] != "Insert" && resposta[0] != "insert" && resposta[0] != "INSERT" && resposta[0] != "Update" && resposta[0] != "update" && resposta[0] != "UPDATE" && resposta[0] != "Delete" && resposta[0] != "delete" && resposta[0] != "DELETE"){
        window.alert("Insira uma query correta!")
    
    }else if(resposta[0] == "Update" || resposta[0] == "update" || resposta[0] == "UPDATE"){
        //Backup UPDATE
        bkp.innerHTML = `select
*
into backup_${resposta[1]}_${anocompleto}
from ${resposta[1]}`
        
        //Rollback UPDATE
        rollback.innerHTML = `${resposta[0]} ${resposta[1]}
${resposta[2]}
${resposta[1]}.${resposta[3]}=bkp.${resposta[3]}
from ${resposta[1]}
JOIN backup_${resposta[1]}_${anocompleto} as bkp 
on bkp.ID=ID.${resposta[1]}`

    }else if(resposta[0] == "Insert" || resposta[0] == "insert" || resposta[0] == "INSERT"){
        //Backup INSERT
        bkp.innerHTML = `select
*
into backup_${resposta[2]}_${anocompleto}
from ${resposta[2]}`

        //Rollback INSERT
        rollback.innerHTML = `DELETE from ${resposta[2]} where ${resposta[2]}.ID not in (select ID from backup_${resposta[2]}_${anocompleto})`
        
    }else{
        //Backup DELETE
        bkp.innerHTML = `select
*
into backup_${resposta[2]}_${anocompleto}
from ${resposta[2]}`

        //ROLLBACK DELETE
        rollback.innerHTML = `INSERT into ${resposta[2]}
= backup_${resposta[2]}_${anocompleto}`

    }
}