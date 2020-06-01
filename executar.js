function executar() {

    //Querys Testes
    //update tabela set status=2, casa=3, bloco=2 where id=3 and ap=505
    //insert into tabela (nome, sobrenome) values ('carlos', 'tenorio')
    //delete from tabela where id=1


    //Elementos
    let text = document.getElementById('execucao').value
    var lineComplet = text.split(" ");
    let bkp = document.getElementById('bkp')
    let rollback = document.getElementById('rollback')

    //Ano Completo
    data = new Date();
    var ano = data.getFullYear()
    var mes = data.getMonth()+1
    var dia = data.getDate()

    if(dia < 10){
        dia = `0${dia}`
    }
    
    if(mes < 10){
        mes = `0${mes}`
    }
    
    var anocompleto = `${ano}${mes}${dia}`
    
    //Lógica
    
    if(lineComplet[0] === "Update" || lineComplet[0] === "update" || lineComplet[0] === "UPDATE"){

        bkp.innerHTML = `SELECT \n * \n INTO \n backup_${lineComplet[1]}_${anocompleto} \n FROM \n ${lineComplet[1]}`
        rollback.innerHTML = `UPDATE \n${lineComplet[1]} \nSET \n`


        for(i=0; i < text.substring(text.indexOf('set') + 3, text.indexOf('where')).split(',').length; i++){
            var linha = text.substring(text.indexOf('set') + 3, text.indexOf('where')).split(',')[i];
			    console.log('linha ' + i + ' ' + linha)
        
        for(x=0; x < linha.split('=').length; x++){
			var coluna = linha.split('=')[x]
            
            if(x % 2 == 0){

                    rollback.innerHTML += `${coluna} = ${coluna}.bkp, \n`;
                    console.log(coluna);
                }
                
            }
        }

        rollback.innerHTML += `FROM ${lineComplet[1]} T \nINNER JOIN backup_${lineComplet[1]}_${anocompleto} bkp \nON T.ID = bkp.ID \nWHERE\n `

        for(y=0; y < text.substring(text.indexOf('where')+5).split('and').length; y++ ){
            var linha2 = text.substring(text.indexOf('where')+5).split('and')[y];
            
            console.log('linha2 ' + y + ' ' + linha2)

                    rollback.innerHTML +=`T.${linha2} AND `
                    console.log(linha2);
                
            }
        
    }else if(lineComplet[0] === "Insert" || lineComplet[0] === "insert" || lineComplet[0] === "INSERT"){

        bkp.innerHTML = `SELECT \n * \n INTO \n backup_${lineComplet[2]}_${anocompleto} \n FROM \n ${lineComplet[2]}`

        rollback.innerHTML = `DELETE FROM ${lineComplet[2]} \nWHERE ${lineComplet[2]}.ID NOT IN\n(SELECT ID FROM backup_${lineComplet[2]}_${anocompleto})`

    }else if(lineComplet[0] === "delete" || lineComplet[0] === "Delete" || lineComplet[0] === "DELETE"){

        bkp.innerHTML = `SELECT \n * \n INTO \n backup_${lineComplet[2]}_${anocompleto} bkp \n FROM \n ${lineComplet[2]}`

        rollback.innerHTML = `INSERT \n INTO \n ${lineComplet[2]} \n ( INSIRA AS COLUNAS DA TABELA ENTRE OS PARÊNTESES ) \n SELECT \n INSIRA AS COLUNAS DA TABELA AQUI \n FROM \n backup_${lineComplet[2]}_${anocompleto} bkp \n WHERE \n bkp.ID NOT IN (SELECT ID FROM ${lineComplet[2]})`

    }else{
        window.alert("Insira uma query correta.")
    }
}