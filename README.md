# 2020-11-wns-remote1-baamm

install Better Comments for more info on comments in this project


## `TODO`
  - réduire menu à droite
  - insérer le module de caméra
  - mettre le système de timer dans la file d'attente

## `FIX`
  - Les élèves dans la file d'attente ne s'affiche pas au début
  - Corriger les sockets qui se remplace


## Documentation  Deployment

  ### - ssh dflt@<IP>  

  ### - Installation de Caddy 
    - suivre le tuto  :  'caddyDoc...'
    - vérifier si caddy est bien fonctionnel avec la commande systemctl status caddy
    - modifier le password : sudo nano caddy/Caddyfile -> remplacer ':80' par bom de domaine
    - relancer le caddy avec systemctl reload caddy

  ### - projet:
    Ajouter les dockerfile
    - server/dockerfile
    - client/dockerfile

    - docker-compose.yml  complété par un docker-compose.prod.yml  ou un docker-compose.dev.yml  qui nous permettra de préciser les commandes à exécuter selon les variables d'environnement, les ports et les volumes du server / client / nginx

    - nginx.conf: configuration de nginx permettant de définir la route d'api
  

  ### Lancement 
    Commande de lancement de docker
    - GATEWAY_PORT=8000 docker-compose -f docker docker-compose.yml -f docker-compose.prod.yml up --build

    Test serveur: 
    - curl http://localhost:8000/api/posts
    - docker logs <nom du container>