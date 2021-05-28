const divResultat = document.getElementById('resultat');
const body = document.getElementsByTagName('body')[0];
const boutonLight = document.getElementById('light');
const boutonDark = document.getElementById('dark');
var progressBar = document.querySelector('.progress-bar');
const btns = document.getElementsByClassName('btn');
const containerSlot = document.querySelector('.slot');
containerSlot.style.display="none";
// tableau d'emoji pour la victoire
const emoji = ["bravo", "c'est gagné", "trop fort !","💪", "👌", "👏", "👍", "🎯","🧩", "🐒","🥇","👁️","🧠","👀", "🐷", "🐘", "🐑", "🐾", "🤪", "🙃","🦓","🦌","🐮","🦙","🐂","🐃","🐄"];
// bouton replay
const btnReplay = document.getElementById('replay');
//je cache replay en temps normal
btnReplay.style.display="none";

var win=false;

var score=0;

// je fabrique le tableau qui va correspondre à ma grille de jeu 
var tableauJeu = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

// tableau des images, généré aléatoirement
// var tableauResultat = [
//     [1,2,3,4],
//     [1,2,3,4],
//     [8,7,5,6],
//     [8,7,5,6]
// ];
var tableauResultat = genereTableauAleatoire();

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
        txt += "<div class='ligne'>";
        // je boucle mon tableau étage par étage grâce à [i] et length (soit 4 éléments aussi)
        for(var j=0; j < tableauJeu[i].length; j++){
            // je mets une condition en place : si la valeur de mon tableau vaut 0 ALORS j'affiche le bouton
            if(tableauJeu[i][j] === 0){
                // à chaque tour de boucle, je crée dans chaque div plus haut, un boutton afficher
                txt += "<button class='btn btn-dark cards' onClick='verif(\""+i+"-"+j+"\")'></button>";
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
    // d'abord on vérifie si ready vaut true
    if(ready){
        // j'ajoute +1 à nbAffiche dès lors que je clic sur un bouton
        nbAffiche++;

        // substr permet de découper une chaine de caractère, on cherche à récupérer la ligne, donc le premier des 2 
        // paramètres transmis dans verif() lors du onClick
        // le premier paramètre de substr est le début de l'interval, et le second est le nb de caractères après le début
        var ligne = bouton.substr(0,1);
        // console.log("ligne : " + ligne);

        var colonne = bouton.substr(2,1);
        // console.log("colonne : " + colonne);

        //je mélange les deux tableaux, en appliquant au tableau de jeu le tableau généré automatiquement
        tableauJeu[ligne][colonne] = tableauResultat[ligne][colonne];
        
        // on souhaite réafficher notre grille mise à jour et mélangée
        afficherTableau();

        // vérifions le nombre d'éléments retournés, s'il est supérieur à 1 donc 2 alors...
        if(nbAffiche > 1){
            //si on a déjà retourné deux cartes, alors nous ne sommes pas prêt pour en retourner une autre
            ready = false;
            // on réalise un temps d'arrêt avant de mettre ready en vrai, on va lui dire de mettre en pause
            // un certain temps, exprimé en millisecondes
            setTimeout( () =>{
                //vérifications entre l'image retournée juste avant et celle que je viens de retourner
                if(tableauJeu[ligne][colonne] !== tableauResultat[ancienneSelection[0]][ancienneSelection[1]]){
                    
                    // on réinitialise les deux derniers clics car ce n'est pas bon
                    tableauJeu[ligne][colonne] = 0;
                    tableauJeu[ancienneSelection[0]][ancienneSelection[1]] = 0;
                }
                else{
                    score++;
                    // console.log(score);
                    var scorePourcent = score * 12.5;
                    progressBar.innerHTML= score+"/8";
                    progressBar.style.width=scorePourcent+"%";
                    progressBar.setAttribute('aria-valuenow', scorePourcent);
                    if(score == 8){
                        btnReplay.style.display="block";
                        win=true;
                        body.style.backgroundImage="linear-gradient(to top, #ff0844 0%, #ffb199 100%)";
                        animateConfetti();
                    }
                }
                afficherTableau();
                // on réactive l'autorisation de retourner une carte
                ready = true;
                // on réinitialise nbAffiche à 0 ce qui permettra de relancer une vérification 
                nbAffiche = 0;
  
            },500)
        }
        // si nbAffiche est inférieur à 2 alors on conserve la sélection précédante et on attend sagement la nouvelle
        else{
            // il nous faut conserver la vieille sélection afin de pouvoir vérifier si la nouvelle correspond avec l'ancienne
            ancienneSelection = [ligne,colonne];
        }
    }
}
   
// fonction qui génére un tableau aléatoire
function genereTableauAleatoire(){
    var tableau = [];

    //  tableau qui stock le nombre de fois qu'on a une valeur 
    var nbImagePosition=[0,0,0,0,0,0,0,0];

    //je boucle sur mon tableau à 1 étage
    for(var i=0; i < 4 ; i++){
        // à chaque tour de boucle, je crée un sous tableau pour chaque ligne
        var ligne = [];
        
        //je dois ajouter les colonnes au sein des lignes 
        for(var j=0; j < 4; j++){
            // bascule en true si on a bien 2 images de chaque dans le tableau
            var fin = false;

            // tant que fin = false je continue de boucler
            // c'est à dire tant que nombre nbImagePosition[randomImage] est inférieur à 2
            while(!fin){
                // je pousse dans ma ligne, une valeur aléatoire entre 1 et 8 inclus
                var randomImage= Math.floor(Math.random() * 8);

                // je vérifie que je n'ai pas plus de 2 fois la même image
                if(nbImagePosition[randomImage] < 2){
                    // +1 car le random number va de 0 à 7 et nos images vont de 1 à 8
                    ligne.push(randomImage+1);

                    // comme je n'ai pas plus de 2 fois la même image, je rajoute 1 à l'index [randomImage] de la variable nbImagePosition
                    nbImagePosition[randomImage]++;
                    fin = true;
                }
            }  
        }
        // j'envoie ma ligne au tableau à chaque tour de boucle
        tableau.push(ligne);
    }
    return tableau;
}

function goLight(){
    body.className="light";
}

function goDark(){
    body.className="dark";
}



function fiesta(){

    // si l'animation est en cours d'éxécution, alors ne fais rien
    if(isTweening()) return;

    for(let i = 0; i < 150; i++){
        // je créé une div en html
        const confetti = document.createElement('div');
        // j'insère dans la div 1 emoji, au hasard parmi le tableau d'emoji
        confetti.innerText = emoji[Math.floor(Math.random() * emoji.length)];
        // j'ajoute ma div à la div html "slot" (je lui ajoute un enfant)
        containerSlot.appendChild(confetti);
    }

}
fiesta();

function animateConfetti(){
    containerSlot.style.display="block";
    // on utilise Green Sock, la librarie d'animation JS
    const TLCONF = gsap.timeline();

    TLCONF
    // je prends toutes mes slots div... et je leur mets uine animation de départ
    .to('.slot div', {
        // je les bouge sur Y (vertical) de -100 à 100 (exprimés en pixels)
        y: "random(-100,100)",
        // je les bouge sur X (horizontal) de -100 à 100
        x: "random(-100,100)",
        // je les bouge sur Z (perspective) de -1000 à 1000 (on a définit notre perspective dans le css)
        z: "random(-1000,1000)",

        // faire touner les émojis (exprimé en degrés)
        rotation: "random(-90,90)",
        // temps de l'animation
        duration: 5
    })
    // animation de fin
    // autoAlpha gère l'opacité et la visibilité en une propriété
    // duration gère le temps que met l'animation de fin exprimé en s
    .to('.slot div', {autoAlpha: 0, duration: 0.3}, '-=0.2')

    // il faut nettoyer le DOM pour éviter d'avoir les confettis sur le navigateur inutilement
    .add(() => {
        // je vide le contenu du container
        containerSlot.innerHTML ="";
    })
}

// fonction qui renvoit true si l'animation est en cours
function isTweening(){
    return gsap.isTweening('.slot div');
}
console.log(tableauResultat);

