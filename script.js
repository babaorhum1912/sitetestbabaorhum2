document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments
    const passengerInput = document.getElementById('passenger-count');
    const incrementButton = document.getElementById('increment-passenger');
    const decrementButton = document.getElementById('decrement-passenger');

    // Initialisation du compteur
    let passengerCount = 1;

    // Fonction pour mettre à jour l'affichage
    function updatePassengerCount() {
        passengerInput.value = passengerCount;
    }

    // Fonction pour augmenter le nombre de passagers
    incrementButton.addEventListener('click', function () {
        if (passengerCount < 12) { // Limite supérieure
            passengerCount++;
            updatePassengerCount();
        }
    });

    // Fonction pour diminuer le nombre de passagers
    decrementButton.addEventListener('click', function () {
        if (passengerCount > 1) { // Limite inférieure
            passengerCount--;
            updatePassengerCount();
        }
    });

    // Initialisation du champ avec la valeur de départ
    updatePassengerCount();
   
   
   
    window.fetchAirports = async function(inputId) {
        const query = document.getElementById(inputId).value;
        if (query.length < 3) return; // Attendre 3 caractères avant de suggérer
    
        const suggestionsContainer = document.getElementById(`${inputId}-suggestions`);
        suggestionsContainer.innerHTML = ""; // Efface les suggestions précédentes
    
        try {
            const response = await fetch(`https://api.magicapi.dev/api/v1/aedbx/aerodatabox/airports/search/term?q=${query}&limit=5`, {
                method: 'GET',
                headers: {
                    'x-magicapi-key': 'cm2xz8u720008jr03xv3ghr54' // Remplace par ta clé API
                }
            });
    
            const data = await response.json();
    
            if (!data.items) {
                console.error("Aucun résultat trouvé pour cette recherche.");
                return;
            }
    
            data.items.forEach(airport => {
                const suggestion = document.createElement("div");
                suggestion.textContent = `${airport.name} (${airport.iata}) - ${airport.municipalityName}`;
                suggestion.onclick = () => {
                    document.getElementById(inputId).value = `${airport.name} (${airport.iata})`;
                    suggestionsContainer.innerHTML = "";
                };
                suggestionsContainer.appendChild(suggestion);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des aéroports:", error);
        }
    }
    emailjs.init("8toKLk5w89_ODKMwU");
    
        // Définition de la fonction et ajout explicite à l'objet global `window`
    window.envoyerMail = function(event) {
        event.preventDefault(); // Empêche le rafraîchissement de la page

        const depart = document.getElementById('departure').value;
        const destination = document.getElementById('destination').value;
        const passagers = document.getElementById('passenger-count').value;
        const date = document.getElementById('date').value;

        const templateParams = {
            depart: depart,
            destination: destination,
            passagers: passagers,
            date: date
        };

        emailjs.send('service_j34emzz', 'template_b22nsz9', templateParams)
            .then(function(response) {
                alert("Votre demande a été envoyée avec succès !");
            }, function(error) {
                alert("Erreur lors de l'envoi de votre demande. Veuillez réessayer.");
            });
    };
    

    
});


