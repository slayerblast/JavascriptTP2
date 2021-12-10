window.addEventListener("DOMContentLoaded"  , async() => {
    let totalD = 0;
    const reponse = await fetch("http://localhost:3000/depense" )
    const depenses = await reponse.json(); 
    
    document.querySelector(".table").innerHTML = genererFormsDepense(depenses);

    // gestion du nombre de tâches en cours 
    document.querySelector(".js-compteur").innerHTML = depenses.filter( depense => depense.status === false ).length; 

   
    document.querySelector(".js-compteur-D").innerHTML = depenses.filter( depense => depense.montant < 0 ).length; 
    document.querySelector(".js-compteur-R").innerHTML = depenses.filter( depense => depense.montant < 0 ).length; 

    // écouter quand on clique dans la zone table
    document.querySelector(".table").addEventListener("click" , async e => {
        e.preventDefault();
        if(e.target.className.includes("btn")){
            const form = e.target.parentNode;
            const action = e.target.value ;
            const id = form.id.value
            if(action == "modifier"){
                const data = {
                    id : id,
                    nom : form.nom.value,
                    montant : form.montant.value
                }
                const options = { method : "PUT" , body : JSON.stringify(data) , headers : {'Content-Type': 'application/json'} }
                await fetch("http://localhost:3000/depense"+id , options)
            }else if(action == "supprimer"){
                const options = {method : "DELETE"}
                await fetch("http://localhost:3000/depense"+id , options);
            }
        }
    })
})

function genererFormsDepense(data){

    if(data.length === 0) return "<p>Veuillez ajouter des tâches</p>";

    return data.map( d => {
        return `<tbody>
        <tr><form>
          <th scope="row">${d.id}</th>
          <td><input type="text" name="nom" class="form-input" value="${d.nom}"></td>
          <td><input type="text" name="montant" class="form-input" value="${d.montant}"></td>
          <td>
          <input type="submit" class="btn btn-primary mx-3" value="modifier">
          <input type="submit" class="btn btn-danger" value="supprimer">
          </td>

        </form></tr>
       
      </tbody>
    `
    } ).join("")
}