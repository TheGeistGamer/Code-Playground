

docker container run \
--name world-db \
-e MARIADB_USER=example-user \
-e MARIADB_PASSWORD=user-password \
-e MARIADB_ROOT_PASSWORD=root-secret-password \
-e MARIADB_DATABASE=world-db \
-dp 3306:3306 \
--volume world-db:/var/lib/mysql \
--network world-app \
mariadb

docker container run \
--name phpmyadmin \
-d \
-e PMA_ARBITRARY=1 \
-p 8080:80 \
--network world-app \
phpmyadmin:5.2-apache


docker pull phpmyadmin:5.2-apache