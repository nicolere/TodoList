# MIASHS-M2-TP3-Projet

## Install & Build :

Clone this repo :

```
 git clone https://github.com/nicolere/TodoList.git
 cd TodoList
```

Install dependencies : `npm install`

## Development server

Run `ng serve -o` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

---

## Features :

Présentation des fonctionnalités supplémentaires au projet de TodoList avec filtres de base

### Feature 1 : Local Storage

    Ajout d'un système de mémoire locale de notre TodoList, évolue en fonction des états de notre liste.

Test :

1. Ajouter des items
2. Manipuler dessus (check, edit, delete, ...)
3. Actualiser la page

### Feature 2 : Effacer Tout

    Ajout d'une icône bin dans le footer au niveau des filtres qui supprime tous les items.

Test :

1.  Ajouter plusieurs items, check/uncheck
2.  Effacer tout et actualiser

### Feature 3 : Reconnaissance Vocale _95%_

    Ajout d'une icône micro dans la barre d'ajout d'item. Reconnaissance vocale en français.

Test :

1. Lancer la reconnaisance vocale
2. Parler distinctement pendant l'écoute
3. Cliquer sur la barre d'ajout d'item
4. L'item s'ajoute ensuite

> Si besoin de vérifier si l'ajout est bon, ouvrir la console.  
> Problèmes de synchronisation de l'ajout, `3. obligé` pour voir l'affichage de l'item

### Feature 4 : Géolocalisation _90%_

    Ajout d'une icône pinMap sur les items pour afficher leur emplacement sur une map. Affichage de cette map lors du clic.
    Style sur les icônes en fonction de leur présence dans notre base

> Ajouter la clé API dans le fichier app.module.ts et index.html -> _YOUR_API_KEY_

Test :

1.  Ajouter un item _Aller à Madrid_
2.  Ajouter un item _Aller à Barcelone_
3.  Ajouter un item _Aller à Toulouse_
4.  Vérifier l'état des icônes
5.  Afficher la map de l'item _Aller à Madrid_

> Problème de synchronisation, affichage de la map initiale lors du premier clic. Fermer et ré-ouvrir la div.  
> _Pour fermer la div : Clic sur l'icône pinMap de l'item ou clic in et clic out pour perdre le focus._

---

## Compte-Rendu Personnel

Projet bien réalisé dans l'ensemble avec la gestion des fonctionnalités et des branches git.  
Problèmes de synchronisation des données avec les 2 dernières grosses fonctionnalités, plusieurs heures de réflexions dessus sans pouvoir trouver une bonne solution.  
Choix de laisser les fonctionnalités quasiment finies.
