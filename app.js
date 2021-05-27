const divResultat = document.getElementById('resultat');

// je fabrique le tableau qui va correspondre à ma grille de jeu 
var tableauJeu = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

// tableau des images, généré aléatoirement
var tableauResultat = [
    [1,2,3,4],
    [1,2,3,4],
    [8,7,5,6],
    [8,7,5,6]
];

// tableau qui conserve la ligne et la colonne du dernier clic avant le miens
var ancienneSelection = [];
// variable qui compte le nombre de cartes retournées, quand on sera a 2 il faudra lancer la vérification
var nbAffiche = 0;
// booléen qui autorise ou non à clicuer sur un nouveau bouton
var ready = true;

afficherTableau();

function afficherTableau(){
    var txt = "";
    
    // je boucle mon tableau grâce à length qui va parcourir le premier étage (soit 4 éléments)
    for(var i=0; i < tableauJeu.length; i++){
        // à chaque tour de boucle, je crée une div, donc 4 div
        txt += "<div>";

        // je boucle mon tableau étage par étage grâce à [i] et length (soit 4 éléments aussi)
        for(var j=0; j < tableauJeu[i].length; j++){
            // je mets une condition en place : si la valeur de mon tableau vaut 0 ALORS j'affiche le bouton
            if(tableauJeu[i][j] === 0){
                // à chaque tour de boucle, je crée dans chaque div plus haut, un boutton afficher
                txt += "<button class='btn btn-primary' onClick='verif(\""+i+"-"+j+"\")'>Afficher</button>";
            }
            // sinon, j'affiche une image
            else{
                // je demande à la fonction getImage de récupérer la valeur du tableau et de la transformer en un nom d'image
                // tableauJeu[i][j] correspond à la valeur j de la ligne i
                // ex : si i vaut 2 alors c'est ligne 2 et si j vaut 4 c'est le 4èeme élément de la ligne 2
                txt += "<img src='"+getImage(tableauJeu[i][j])+"'>";
            }
          
        }
        // je ferme ma div à chaque tour de la première boucle
        txt += "</div>";
    }
    // je demande à la fonction d'écrire la valeur de txt dans le DOM
    divResultat.innerHTML = txt;
}

// fonction qui attribue une image à un numéro
function getImage(valeur){
    var imgTxt ="./images/"
    switch(valeur){
        case 1:
            imgTxt += "elephant.png"
            break;
        case 2:
            imgTxt += "giraffe.png"
            break;   
        case 3:
            imgTxt += "hippo.png"
            break;
        case 4 :
            imgTxt += "monkey.png"
            break;
        case 5:
            imgTxt += "parrot.png"
            break;
        case 6:
            imgTxt += "penguin.png"
            break;
        case 7:
            imgTxt += "pig.png"
            break;
        case 8:
            imgTxt += "rabbit.png"
            break;
        default:
            console.log('erreur: cas non pris en compte');
    }
    return imgTxt;
}

// recupère l'index de l'élément cliqué
function verif(bouton){
    // j'ajoute +1 à nbAffiche dès lors que je clic sur un bouton
    nbAffiche++;

    // substrg permet de découper une chaine de caractère, on cherche à récupérer la ligne, donc le premier des 2 
    // paramètres transmis dans verif() lors du onClick
    // le premier paramètre de substr est le début de l'interval, et le second est le nb de caractères après le début
    var ligne = bouton.substr(0,1);
    console.log("ligne : " + ligne);

    var colonne = bouton.substr(2,1);
    console.log("colonne : " + colonne);

    //je mélange les deux tableaux, en appliquant au tableau de jeu le tableau généré automatiquement
    tableauJeu[ligne][colonne] = tableauResultat[ligne][colonne];
    
    // on souhaite réafficher notre grille mise à jour et mélangée
    afficherTableau();

    // vérifions le nombre d'éléments retournés, s'il est supérieur à 1 donc 2 alors...
    if(nbAffiche > 1){
        //vérifications entre l'image retournée juste avant et celle que je viens de retourner
        if(tableauJeu[ligne][colonne] !== tableauResultat[ancienneSelection[0]][ancienneSelection[1]]){
            // on réinitialise les deux derniers clics car ce n'est pas bon
            tableauJeu[ligne][colonne] = 0;
            tableauJeu[ancienneSelection[0]][ancienneSelection[1]] = 0;
        }

        // on réinitialise nbAffiche à 0 ce qui permettra de relancer une vérification 
        nbAffiche = 0;
    }

    // il nous faut conserver la vieille sélection afin de pouvoir vérifier si la nouvelle correspond avec l'ancienne
    ancienneSelection = [ligne][colonne];
}