

**Travaux site my-TH**

Il s&#39;agit d&#39;un site permettant à un utilisateur d&#39;organiser de façon autonome une &quot;Chasse aux trésor&quot; (Treasure Hunt). Il est donc l&#39;organisateur de ce jeu destiné à d&#39;autres utilisateurs (joueurs) qui interagiront avec un bot FB Messenger (ou d&#39;autres comme Twitter dans un futur proche). Au cours du chat avec le bot, le joueur doit partager une ou plusieurs images qui seront reconnues par le service de reconnaissance d&#39;image de TH qui validera la chasse au trésor.

**Objectif**  : réaliser le site permettant à l&#39;organisateur de créer sa chasse au trésor. Il doit pouvoir s&#39;identifier puis remplir un formulaire simplifié lui permettant d&#39;organiser son jeu.

**Les fonctionnalités:**

- Identification: l&#39;organisateur doit pouvoir s&#39;identifier avec son compte Facebook (Sigle Sign On). En faisant cela il partage son identifiant FB.
- Création du jeu:
  - l&#39;organisateur remplit un formulaire et le soumet pour que son jeu soit créé. Voir document joint &quot;Process mise en place TH&quot; et la partie messenger pour comprendre les besoins du formulaire. Prévoir comme un watermark à intégrer automatiquement dans la conversation (page démarrage? Menu? Message final?) avec un message du type: &quot;built with my-TreasureHunt&quot;. Ce message étant retiré si souscription abonnement.
  - il doit fournir une page FB qui servira de support au bot. Celle-ci peux préalablement exister et dans ce cas il fournira son adresse, ou bien il faudrait pouvoir lui créer automatiquement pour lui simplifier la tâche (voir si lors du SSO il est possible/nécessaire de lui demander l&#39;autorisation de créer/l&#39;attacher à une page que nous créons pour lui). Cf [https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start](https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start)

-
  - Il doit fournir une image (plusieurs éventuellement dans le futur).
    - Une image existante dont il fournit le lien dont nous devons vérifier instantanément la disponibilité publique et le format (image, taille, limites)
    - Ou une image à télécharger vers nos serveurs (qui devra être téléchargée immédiatement pour vérification de son format (image, taille limites) sans quoi le formulaire ne pourra pas être validé)
- Liste des jeux en cours : dans son profil, l&#39;organisateur peut lister les jeux qu&#39;il a créés et les éditer / stopper / supprimer. Un max de X jeux par organisateur sur une période donnée est fixé par défaut. (objectif: accorder un dépassement si souscription à un abonnement)
- Page de statistiques d&#39;une campagne : l&#39;organisateur peut consulter les participations et les résultats des participations (match d&#39;image) … Cela se fait sous la forme de plusieurs graphes (3 à 5) et tableaux  (3 à 5)  dont les détails seront fournis le moment venu

**Design technique et infrastructure:**

- Ce site interagit avec la plateforme AWS où résident les services et bases de données TH.
- Il est hébergé sous la forme d&#39;un site &quot;static&quot;  **sur AWS S3 c&#39;est à dire qu&#39;il ne possède pas de logique côté serveur**. Toute la logique de l&#39;application se trouve exécutée dans le navigateur de l&#39;utilisateur (côté client) avec une technologie basée sur Javascript (angular vs **react** vs vue - le choix de l&#39;outil reste à faire).
- La logique appliquée lors de la publication du formulaire ou de l&#39;upload d&#39;une image est réalisée de façon traditionnelle à l&#39;aide d&#39;un POST HTTP vers un services de type AWS Lambda (cette implementation ne fait pas partie du travail demandé).
- De la même manière pour lister ou éditer les campagnes, un service AWS Lambda est interrogé à l&#39;aide de requêtes HTTP GET ou PUT.
- L&#39;authentification FB se fait en interaction avec  **AWS Cognito**  qui est le service de gestion des utilisateurs / groupes de AWS IAM. (Fc. [Example SSO Facebook ici](https://gist.github.com/brianberlin/443c3bd005ff63282394) )
- La base de données est de type AWS DynamoDB ou AWS RDS (choix non encore arrêté). La gestion de cette base ainsi qui les services qui y accèdent ne font pas partie du travail demandé.
- Pour l&#39;affichage de graphes et de tableaux il serait intéressant de faire appel à une libraire JS dédié (comme d3js) pour bénéficier de sa flexibilité et de son design.

**Méthodologie** :

- Maquette pour arrêter le design et la navigation et valider le SSO FB
  - avec SSO
  - Pages, menus et design

-
  - mode gratuit dans un premier temps puis avec option abonnement

- développement en js

- Hébergement du site statique sur AWS S3
- Connection avec les service TH sur AWS
- Tests
- Lancement d&#39;une campagne test pour validation de la mission

- Suivi de projet en mode agile avec sprints de 5 jours

**Resources** :

- Il n&#39;est pas prévu de fourniture de PC pour réaliser ce travail. Des accès la la plateforme AWS pourront être donnés le cas échéant.

