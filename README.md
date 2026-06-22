# 🎬 Flicker

### ⚡ *Meno tempo a cercare, più tempo a guardare.*

---

## 📝 Descrizione Breve
**Flicker** è una web app interattiva e reattiva sviluppata in React, nata per risolvere uno dei dilemmi più comuni dell'era dello streaming: la paralisi da scelta quando si deve decidere cosa guardare in compagnia. Ispirandosi alle dinamiche di swipe delle più note app di dating, Flicker sincronizza i voti degli utenti all'interno di una stanza virtuale attraverso un sistema di stanze condivise tramite codice univoco. Grazie all'integrazione con le API di TMDB, l'app confronta i gusti del gruppo in tempo reale e genera un **Match** istantaneo non appena viene trovata una scelta condivisa, azzerando le discussioni e ottimizzando le serate cinema.

---

## 🚀 Descrizione Dettagliata & Documentazione

### 🌌 Concept & Design
L'applicazione adotta un'estetica dal forte impatto visivo, caratterizzata da un layout scuro in stile **cyberpunk/neon**. L'uso mirato di contrasti viola, ciano ed effetti glow valorizza l'atmosfera cinematografica e rende l'interfaccia accattivante, moderna e spiccatamente orientata all'esperienza mobile-first.

### 🌟 Funzionalità Chiave

1. **Onboarding Personalizzato & Gestione Profilo:**
   * Creazione immediata dell'identità utente tramite la selezione di un username e di un avatar dedicato.
   * Filtro e selezione delle piattaforme streaming possedute dall'utente (es. Netflix, Prime Video, Disney+), integrate nel flusso iniziale.
   * Pagina di gestione dell'account dinamica per modificare i dati in qualsiasi momento.

2. **Sistema di Sessioni di Gruppo (Stanze):**
   * Generazione di un codice univoco di 6 caratteri alfanumerici per avviare una nuova sessione.
   * Accesso immediato per gli amici tramite inserimento del codice stanza, garantendo la sincronizzazione ideale della sessione di voto.

3. **Interfaccia di Voto (Match System):**
   * Caricamento dinamico dei film più popolari del momento sfruttando le API pubbliche di TMDB.
   * Meccanica di voto rapida basata su pulsanti di approvazione (Spunta Verde / Like) o rifiuto (Croce Rossa / Dislike).
   * Algoritmo di match integrato che calcola le preferenze espresse durante lo swipe e sblocca la schermata di vittoria ("IT'S A MATCH!") non appena scatta l'affinità nel gruppo.

---

## 🛠️ Stack Tecnologica

Il progetto è stato sviluppato riducendo al minimo la dipendenza da pesanti librerie di terze parti, privilegiando soluzioni native per massimizzare la velocità di caricamento e la stabilità del codice:

* **React (Vite):** Framework principale per una gestione modulare dei componenti e per un ciclo di sviluppo ultra-rapido.
* **Tailwind CSS:** Utilizzato per lo styling, la gestione dei bagliori neon e l'adattabilità responsive sui dispositivi mobile.
* **React Router DOM:** Gestione pulita e nativa delle rotte e della navigazione tra l'onboarding, la home e le tab dell'interfaccia utente.
* **Lucide React:** Set di icone moderno e leggero per preservare l'approccio minimalista e pulito dell'interfaccia.
* **LocalStorage:** Utilizzato per la persistenza locale e sicura dei profili utenti, delle piattaforme attive e delle sessioni senza appesantire il caricamento iniziale.
* **TMDB API:** Integrazione con l'endpoint esterno di *The Movie Database* per un catalogo di titoli e locandine sempre aggiornato.

---

## 💻 Come Avviare il Progetto Localmente

1. Clona il repository sul tuo computer:
   ```bash
   git clone <URL_DEL_TUO_REPOSITORY>
