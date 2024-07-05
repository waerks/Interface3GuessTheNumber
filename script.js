/*AERTS ANAÏS*/
// Appel des éléments HTML
const btnGuess = document.querySelector("button");
const inputGuess = document.getElementById("number");
const tableValeur = document.querySelector("table tbody");
const compteurStop = document.getElementById("essais");
const compteurEssais = document.querySelector("#essais span");
const numberPosition = document.getElementById("text");
const guessNumberDIV = document.querySelector(".guessNumber")

// Générer un nombre aléatoire
let randomNumber = Math.floor(Math.random() * 100);
// Démarrer le compteur à 10
let compteur = 10;

// console.log("Réponse: " + randomNumber);

// INPUT
inputGuess.addEventListener('keypress', (e) => {
    // Appuyer sur la touche ENTER
    if (e.key === "Enter") {
        guessNumber();
    }
})

// BUTTON
btnGuess.addEventListener('click', () => {
    guessNumber();
})

// REJOUER
function playAgain(){
    // Rejouer
    const btnAgain = document.createElement("button");
    btnAgain.innerText = "Rejouer ?";

    guessNumberDIV.append(btnAgain);

    btnAgain.addEventListener('click', () => {
        // Supprimer tous les éléments du tableau
        const tableDelete = document.querySelectorAll("table tbody tr:not(:first-child)");
        tableDelete.forEach(element => {
            element.remove();
        });

        location.reload();

    })
}

// FUNCTION
function guessNumber() {
    if (isNaN(inputGuess.valueAsNumber) || inputGuess.valueAsNumber < 0 || inputGuess.valueAsNumber > 100) {
        numberPosition.innerText = "Ce que vous avez rentré n'est pas valide.";

        inputGuess.disabled = true;
        btnGuess.disabled = true;

        // Rejouer
        playAgain();

    } else {
        // Enlever 1 au compteur à chaque mauvais essai
        compteur--;
        compteurEssais.innerHTML = compteur;

        // Mettre le nombre de l'input dans une variable
        let number = inputGuess.valueAsNumber;

        // Création des éléments HTML
        const tableTR = document.createElement("tr");
        const tableTD = document.createElement("td");
        const tableTDEmoji = document.createElement("td");

        if (compteur === 0 && number !== randomNumber) {

            compteurStop.innerHTML = "Plus d'essais. Le nombre à deviner était : " + randomNumber;

            inputGuess.disabled = true;
            btnGuess.disabled = true;

            // Rejouer
            playAgain();        

        } else {
            if (number === randomNumber) {

                numberPosition.innerText = "C'est gagné!";
                compteurStop.innerText = "Il vous restait " + compteur + " essais.";
                inputGuess.disabled = true;
                btnGuess.disabled = true;

                // Valeurs tentées
                tableTD.innerText = number;
                tableTDEmoji.innerText = "👑";

                tableTD.style.backgroundColor = "#c8ffc8";
                tableTDEmoji.style.backgroundColor = "#c8ffc8";

                tableTR.appendChild(tableTD);
                tableTR.appendChild(tableTDEmoji);
                tableValeur.append(tableTR);

                // Rejouer
                playAgain();


            } else if (number < randomNumber) {

                numberPosition.innerHTML = "Plus haut ⬆️";

                // Valeurs tentées
                tableTD.innerText = number;
                tableTDEmoji.innerText = "⬆️";

                tableTR.appendChild(tableTD);
                tableTR.appendChild(tableTDEmoji);
                tableValeur.append(tableTR);

                for (let i = 1; i <= 5; i++) {
                    let compteurHaut = randomNumber - i;

                    if (number === compteurHaut) {
                        tableTD.style.backgroundColor = "#ffff96";
                        tableTDEmoji.style.backgroundColor = "#ffff96";
                    }
                }

            } else {

                numberPosition.innerHTML = "Plus bas ⬇️";

                // Valeurs tentées
                tableTD.innerText = number;
                tableTDEmoji.innerText = "⬇️";

                tableTR.appendChild(tableTD);
                tableTR.appendChild(tableTDEmoji);
                tableValeur.append(tableTR);

                for (let i = 1; i <= 5; i++) {
                    let compteurHaut = randomNumber + i;

                    if (number === compteurHaut) {
                        tableTD.style.backgroundColor = "#ffff96";
                        tableTDEmoji.style.backgroundColor = "#ffff96";
                    }
                }

            }
        }
        // Vider le champ de l'input à chaque guess
        inputGuess.value = '';
    }

}