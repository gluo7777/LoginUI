docker build -t redis:v0 .

docker run --rm -d -p 6379:6379 -v local_redis:/data --name local_redis redis:v0

docker exec -it local_redis redis-cli