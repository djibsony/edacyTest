//alert("test");
init();

// Click sur le bouton btShowFormEleve pour afficher le popup du formulaire éléve
document.getElementById("btShowFormEleve").addEventListener("click", function(){
	$("#modalFormEleve").modal("show");
});

// Click sur le bouton btShowFormClasse pour afficher le popup du formulaire classe
document.getElementById("btShowFormClasse").addEventListener("click", function(){
	$("#modalFormClasse").modal("show");
});


document.getElementById("btSaveEleve").addEventListener("click", function(){
	var fieldPrenomEleve   = document.getElementById("fieldPrenomEleve").value
	var fieldNomEleve      = document.getElementById("fieldNomEleve").value
	var fieldDateNaissance = document.getElementById("fieldDateNaissance").value
	var ddClasseEleve      = document.getElementById("ddClasseEleve").value
	var fieldAnneeAcademique      = document.getElementById("fieldAnneeAcademique").value
	

	var jsonEleves = JSON.parse(localStorage.getItem("eleves"));
	jsonEleves['eleves'].push(
		{
			"prenom"        : fieldPrenomEleve, 
			"nom"           : fieldNomEleve, 
			"datenaissance" : fieldDateNaissance,
			"classe"        : ddClasseEleve,
			"annee"         : fieldAnneeAcademique
		}
	)

	localStorage.setItem("eleves", JSON.stringify(jsonEleves))
	document.getElementById("fieldPrenomEleve").value     = ""
	document.getElementById("fieldNomEleve").value        = ""
	document.getElementById("fieldDateNaissance").value   = ""
	document.getElementById("ddClasseEleve").value        = ""
	document.getElementById("fieldAnneeAcademique").value = ""
	console.log(jsonEleves);

	alert("Eléve ajouté avec succés!")
	loadEleves();
	$("#modalFormEleve").modal("hide");
})



document.getElementById("btSaveClasse").addEventListener("click", function(){
	var fieldLibelleClasse = document.getElementById("fieldLibelleClasse").value
	var jsonClasses = JSON.parse(localStorage.getItem("classes"));

	if( $.inArray(fieldLibelleClasse, jsonClasses["classes"]) != -1){
	    alert('Cette classe éxiste déja!');
	} else {
	    jsonClasses['classes'].push(fieldLibelleClasse)
		console.log(jsonClasses)
		localStorage.setItem("classes", JSON.stringify(jsonClasses))
		document.getElementById("fieldLibelleClasse").value = ""
		alert("Classe ajoutée avec succés!")
		loadClasse();
		$("#modalFormClasse").modal("hide");
	}
})


function init(){
	if(localStorage.getItem("classes") == null || localStorage.getItem("eleves") == null){
		console.log("Initialiser")
		localStorage.setItem("classes",'{ "classes" : []}');
		localStorage.setItem("eleves",'{ "eleves" : []}');
	}else{
		console.log("Deja initialiser")
		loadClasse();
		loadEleves();
	}
}

// Supprimer une classe
function deleteClasse(valeur){
	//alert(valeur);
	var confirm = window.confirm("Voulez vous vraiment supprimer cette classe ?");
	if (confirm == true) {
		var jsonClasses = JSON.parse(localStorage.getItem("classes"));
		var index = $.inArray(valeur, jsonClasses["classes"]);
		console.log("index : "+index);
		if( index != -1){
			jsonClasses["classes"].splice(index, 1);
			localStorage.setItem("classes", JSON.stringify(jsonClasses))
		    //delete jsonClasses["classes"][index];
		    loadClasse();
		} else {
		    
		}
	} else {

	}
}


// Supprimer une classe
function deleteEleve(valeur){
	var confirm = window.confirm("Voulez vous vraiment supprimer cet éléve ?");
	if (confirm == true) {
		var jsonEleves = JSON.parse(localStorage.getItem("eleves"));
		console.log(jsonEleves)
		for (var i = 0; i <= jsonEleves["eleves"].length; i++) {
			console.log(jsonEleves["eleves"][i])
			if(jsonEleves["eleves"][i].datenaissance == valeur){
				jsonEleves["eleves"].splice(i, 1);
				localStorage.setItem("eleves", JSON.stringify(jsonEleves))
				loadEleves();
				break;
			}
		}
	} else {

	}
}

// Charger les claases
function loadClasse(){
	document.getElementById("listeClasses").innerHTML = ""
	var jsonClasses = JSON.parse(localStorage.getItem("classes"));
	for (var i = 0; i < jsonClasses["classes"].length; i++) {
		console.log(jsonClasses["classes"][i])
		document.getElementById("listeClasses").innerHTML = document.getElementById("listeClasses").innerHTML + 
		'<li class="list-group-item">'+ jsonClasses["classes"][i] +
		'<button type="button" class="btn btn-danger" style="float: right;" '+
		'onclick="deleteClasse(\''+jsonClasses["classes"][i]+'\')">x</button></li>';

		document.getElementById("ddClasseEleve").innerHTML += '<option value="\''+jsonClasses["classes"][i]+'\'">'+jsonClasses["classes"][i]+'</option>' 
	}
}


// Charger les éléves
function loadEleves(){
	document.getElementById("listeEleves").innerHTML = ""
	var jsonEleves = JSON.parse(localStorage.getItem("eleves"));
	for (var i = 0; i < jsonEleves["eleves"].length; i++) {
		console.log(jsonEleves["eleves"][i].nom)
		document.getElementById("listeEleves").innerHTML = document.getElementById("listeEleves").innerHTML + 
		'<li class="list-group-item">'+ jsonEleves["eleves"][i].prenom +" "+jsonEleves["eleves"][i].nom
		+" <br> "+jsonEleves["eleves"][i].datenaissance +" <br> "+jsonEleves["eleves"][i].classe +
		'<button type="button" class="btn btn-danger" style="float: right;" '+
		'onclick="deleteEleve(\''+jsonEleves["eleves"][i].datenaissance+'\')">x</button></li>';
	}
}










