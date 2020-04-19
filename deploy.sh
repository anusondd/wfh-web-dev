docker build --rm -f "Dockerfile" -t wfhweb:latest "."
docker tag wfhweb:latest pkgwfh.azurecr.io/pkg-wfh:0.0.3
docker push pkgwfh.azurecr.io/pkg-wfh:0.0.3
