// On charge les informations utiles
const statut = document.querySelector("h2");
let jeuActif = true;
let joueurActif = "X";
let etatJeu = ["", "", "", "", "", "", "", "", ""];
let compteur1 = 0;
let compteur2 = 0;
let tableau = document.querySelector("case");
let enCours = 1; 
let nombreDePartiesMax = 1;
let nombreCoups = 9;

// On définit les conditions de victoire
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Messages
const gagne = () => `Le joueur ${joueurActif} a gagné`;
const egalite = () => "Egalité";
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`;

// On affiche quel joueur commence
statut.innerHTML = tourJoueur();

// On met en place les écouteurs d'évènements
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase));

//Cette fonction gère le clic sur les cases du jeu
function gestionClicCase(){
    // On récupère l'index de la case cliquée
    const indexCase = parseInt(this.dataset.index)
    
    // On vérifie si la case est déjà remplie ou le jeu terminé
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }

    // On écrit le symbole du joueur dans le tableau etatJeu et la case
    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    // Nombre de coups restant dans la grille
    nombreCoups--;
    var coupsRestant = document.getElementById('coups');
    coupsRestant.innerHTML = nombreCoups;

    // On vérifie si le joueur a gagné
    verifGagne()

};

//Cette fonction vérifie si le joueur a gagné
function verifGagne(){
    let tourGagnant = false


    // On parcourt toutes les conditions de victoire
    for(let conditionVictoire of conditionsVictoire){
        // On récupère les 3 cases de la condition de victoire
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]

        // Si l'une des cases est vide
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }

        // Si les 3 cases sont identiques
        if(val1 === val2 && val2 === val3){
            // On gagne
            tourGagnant = true;
            break;
        }
    }

    // Si on a gagné
    if(tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        point();
        return
    }

    // Si toutes les cases sont remplies
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }

    // On change de joueur
    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
};
// Bouton continuer avec maintien de score et numéro de partie
function continuer() { 
    joueurActif = "X";
    jeuActif = true;
    etatJeu = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML = tourJoueur();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
// numéro de partie
    enCours++;
    var element = document.getElementById('encours');
    element.innerHTML = enCours;
    limite();
    locaux();
};

// Cette fonction réinitialise le jeu
    function reloadGame() { 
        window.location.reload();
    };

// création compteur
function point() {
    if(joueurActif == "X"){
        compteur1++;
        var element = document.getElementById('score1');
        element.innerHTML = compteur1;
    }
    if(joueurActif == "O"){
        compteur2++;
        var element = document.getElementById('score2');
        element.innerHTML = compteur2;
    }
};

// fonction pour limiter les parties
function limite(){
if (nombreDePartiesMax == enCours){
    document.getElementById('continuer').disabled = true;
}
}

// définir le nombre de parties
function choix() {
    let partie = document.getElementById('partiesMax').value;
    nombreDePartiesMax = partie;

    joueurActif = "X";
    jeuActif = true;
    etatJeu = ["", "", "", "", "", "", "", "", ""];
    statut.innerHTML = tourJoueur();
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "");
}

function definir(){
    choix();
    limite();
}

// sauvegarde des résultats
function sauvegarde() {
    localStorage.setItem("Joueur 1", score1.innerHTML);
    localStorage.setItem("Joueur 2", score2.innerHTML);
    locaux();
}

// effacer le localstorage
let scores = document.querySelector("scores");
function effacer () {
    localStorage.clear();
}

// afficher le localstorage
function locaux() {

        var element1 = document.getElementById('score1s');
        element1.innerHTML = localStorage.getItem('Joueur 1');

        var element2 = document.getElementById('score2s');
        element2.innerHTML = localStorage.getItem('Joueur 2');
};

