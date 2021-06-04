# 2020-11-wns-remote1-baamm

## TIPS 
install 'Better Comments'  for more info on comments in this project

## `TODO`

Composants:
  - Routes pour changer de page
  - Page de sélection / création de room
  - entrer dans la room
  - Créer un champ Student / Teacher dans la BDD
  - Remplir les données utilisateurs
  - Caméra utilisateur
  - WaitingQueue Dynamique
  - liste des utilisateurs présent dans la room 
  - afficher l'expéditeur des message dans le chat
  - enlever les mots de passes en dur dans les docker-compose.yml
  - supprimer le package json a la racine
  - régler le "multi" chargement du wallpaper

## `BUG et FIX `

- Les élèves dans la file d'attente ne s'affiche pas au début

## Documentation lancement du projet 

  ### En local : 
    $ Git clone https://github.com/WildCodeSchool/2020-11-wns-remote1-baamm.git
    $ cd  2020-11-wns-remote1-baamm
    - ouvrir un 2e terminal une fois rentré dans le dossier.

    Terminal 1:
    $ cd client
    $ touch .env
    $ nano .env
    - remplir les champs comme dans le .env.exemple
    $ npm i
    $ npm start 

    Terminal 2:
    $ cd server
    $ touch .env
    $ nano .env
    - remplir les champs comme dans le .env.exemple
    $ npm i
    $ npm start 

  ### sur le serveur
    $ ssh dflt@<IP> -p <port>

## Commandes utiles

  ### Serveur        
    $ journalctl -f  // consulter les logs du serveur
    $ ./deploy_branch_dev.sh  // permet de redéployer le projet en cas de modifications
    $ systemctl reload caddy  // recharger le caddyFile si il y a eu des modifications
    $ docker logs -f  <nom du container>  // accéder au logs de docker
    $ docker reload <container Nginx> // accéder au logs
      $ cd nginx/logs
      $ tail -f error.log 
      $ tail -f access.log 


## Documentation Deployment

  ### - ssh dflt@<IP> mot de passe -> voir Discord BAAM dans les épinglés
    - mettre a jour le caddy :        $ systemctl reload caddy
    - lancer le fichier exécutable :  $ PORT=$PORT_NUMBER ./deploy_branch_dev.sh


  ### - Installation de Caddy
    - suivre le tuto  :  'caddyDoc...'
    - vérifier si caddy est bien fonctionnel avec la commande systemctl status caddy
    - modifier le password : sudo nano caddy/Caddyfile -> remplacer ':80' par nom de domaine
    - relancer le caddy avec systemctl reload caddy

  ### - projet:
  Ajouter les dockerfile - server/dockerfile - client/dockerfile

    - docker-compose.yml  complété par un docker-compose.prod.yml  ou un docker-compose.dev.yml  qui nous permettra de préciser les commandes à exécuter selon les variables d'environnement, les ports et les volumes du server / client / nginx

    - nginx.conf: configuration de nginx permettant de définir la route d'api

  ### Lancement

    Commande de lancement de docker

    Test serveur:
    - curl http://localhost:8000/api/posts
