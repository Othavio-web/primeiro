const pessoa = {
    altura: "1,80m",
    idade: 24,
    Solteiro: true,
    correr(){
      document.write("run forest")
      return "run forest"
    }
  }
  //document.write("executar uma grande logica de correr")
  
  //pessoa.correr()
  
  //array ou vetores
  //const colecaoDeBolinhas = ["blue", 15, true, {name:"My Name"}]
  //document.write(colecaoDeBolinhas[3].name)
  
  //funcionalidades
  
  function sayMyName(name){
    document.write(name)}
  sayMyName("douglas")
  sayMyName("Vanessa")
  
  const notaFinal = 7
  if(notaFinal<5){
    document.write("reprovado")
  }else{
    document.write("aprovado")
  }
  
  //loop ou repetições
  
  for(i=0;i<10;i++){
    document.write(`<p>${i}</p>`)
  }