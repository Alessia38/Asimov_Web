// Dépendances et middlewares
const mysql = require('mysql2');
let iniparser = require('iniparser');
const configDB = iniparser.parseSync('./DB.ini')

// Connection à la bdd
let mysqlconnexion = mysql.createConnection({
    host:configDB['dev']['host'],
    user:configDB['dev']['user'],
    password:configDB['dev']['password'],
    database:configDB['dev']['database']
})

const ModelEleve = {

    // Lire l'enseignant référent d'un élève
    async lireEnseignantReferent(eleveId) {
        let requete = "SELECT u.nom, u.prenom FROM utilisateurs u INNER JOIN roles r ON u.idRole = r.id WHERE r.role = 'Enseignant'"
        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requete, [eleveId], (err, lignes) => {
                if (err) {
                    reject(err)
                }
                resolve(lignes)
            })
        })
    },

    // Lire la moyenne générale d'un élève
    async lireMoyenneGenerale(eleveId) {
        let requete = "SELECT moyenne FROM moyenne WHERE idUtilisateur = ?"
        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requete, [eleveId], (err, lignes) => {
                if (err) {
                    reject(err)
                }
                resolve(lignes)
            })
        })
    },

    // Lire les projets disponibles
    async lireProjets() {
        let requete = "SELECT * FROM projet"
        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requete, (err, lignes) => {
                if (err) {
                    reject (err)
                }
                resolve (lignes)
            })
        })
    },

    // S'inscrire à un projet
    async InscriptionProjet(eleveId, projetId) {
        let requete = "UPDATE projet SET idUtilisateur = ? WHERE id = ?"
        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requete, [eleveId, projetId], (err, lignes) => {
                if (err) {
                    reject(err)
                }
                resolve(lignes)
            })
        })
    },

    // Lire les recherches de stage d'un élève
    async lireRecherchesStage(eleveId) {
        let requete = "SELECT e.*, d.idUtilisateur FROM entreprise e JOIN demandesstages d ON e.id = d.idEntreprise WHERE d.idUtilisateur = ?"
        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requete, [eleveId], (err, lignes) => {
                if (err) {
                    reject(err)
                }
                resolve(lignes)
            })
        })
    },

    // Lire les conventions de stage d'un élève
    async lireConventionsStage(eleveId) {
        let requete = "SELECT convention FROM demandesstages WHERE idUtilisateur = ?"
        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requete, [eleveId], (err, lignes) => {
                if (err) {
                    reject(err)
                }
                resolve(lignes)
            })
        })
    },

    // Lire les attestations de stage d'un élève
    async lireAttestationsStage(eleveId) {
        let requete = "SELECT attestation FROM demandesstages WHERE idUtilisateur = ?"
        return new Promise((resolve, reject) => {
            mysqlconnexion.query(requete, [eleveId], (err, lignes) => {
                if (err) {
                    reject(err)
                }
                resolve(lignes)
            })
        })
    }
}

module.exports = ModelEleve;
