const cron = require('node-cron');
const flashService = require("../services/flashService");


async function updateFlash() {

    // Cette tâche s'exécute toutes les minutes
    cron.schedule('* * * * *', async () => {
        console.log('Lancement de la vérification des offres flash expirées');
        await flashService.flashService();
        console.log("Vérification terminé");
    });

}

module.exports = { updateFlash };