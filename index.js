let paragraph = document.getElementById('result');
let btnExecute = document.getElementById('execute');
//main
btnExecute.onclick=async() => {

    try {
        
      paragraph.innerText="1. Requiriendo Token..";
      const token = await getToken("javierjimenez78@gmail.com");
      console.info("Token obtenido: " + token);
      paragraph.innerText="2. Obteniendo bloques..";
      const block = await getBlocks(token);
      console.info("Bloque obtenido: " + block.data);
      paragraph.innerText="3. Ordenando bloques..";
      const orderBlocks= await check(block.data, token); 
      console.info("Bloques ordenados: " + orderBlocks);
      paragraph.innerText="4. Obteniendo resultados..";
      resultado =await verify({encoded:orderBlocks.join("")},token);
      console.log("Resultado es: " + resultado);
      if(resultado) paragraph.innerText="Se resolvio correctamente";
      else paragraph.innerText="Hubo un problema al resolver el challenge";

      
    } catch (error) {
        paragraph.innerText="Hubo un error al procesar, verifique en la consola";
        console.error(error);
    }
}