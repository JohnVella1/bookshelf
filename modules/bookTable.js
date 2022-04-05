const books = require('./books');

// J'importe le module dayjs
const dayjs = require('dayjs');

// Je charge un module supplémentaire pour avoir plus de formats
const advancedFormat = require('dayjs/plugin/advancedFormat');

// Je demande à dayjs de les utiliser. 
dayjs.extend(advancedFormat);

// Je charge le module relative 
const relativeTime = require('dayjs/plugin/relativeTime');
// Je demande à dayjs de l'utiliser
dayjs.extend(relativeTime);

// On demande à dayjs de passer en français
require('dayjs/locale/fr');
dayjs.locale('fr');


const bookTable = {

    getBooksAsHtmlTable: function() {
        // Construire une chaine de caractère qui contiendra
        // une table HTML avec les livres

        let htmlTable = `
            <table>
                <tr>
                    <th>Titre</th>
                    <th>Langue</th>
                    <th>Pays</th>
                    <th>Auteur</th>
                    <th>Date</th>
                    <th>Âge</th>
                </tr>
        `;

        // Tri du tableau
        const sortedBook = books.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            }
            else {
                return -1;
            }
        });

        // On boucle sur la liste des livres
        for (const oneBook of sortedBook) {
            // dateFormatee contient une chaine de caratère avec la date
            // formatée au format demandé, ex : Wednesday, February 15th 1989
            const dateFormatee = dayjs(oneBook.date).format('dddd, MMMM Do YYYY');

            // Calcul du nombre d'années entre la date de sortie du livre et aujourd'hui
            const age = dayjs(oneBook.date).fromNow(true);

            // pour chaque élément du tableau, on construit une chaine contenant
            // toutes les infos d'un livre
            htmlTable = htmlTable + `
                <tr>
                    <td>${oneBook.title}</td>
                    <td>${oneBook.language}</td>
                    <td>${oneBook.country}</td>
                    <td>${oneBook.author}</td>
                    <td>${dateFormatee}</td>
                    <td>${age}</td>
                </tr>
            `;
        }

        htmlTable = htmlTable + `</table>`;
        
        // On retourne (return) la chaine de caractère construire
        return htmlTable;
    }

};

module.exports = bookTable;