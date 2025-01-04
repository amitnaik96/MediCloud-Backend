## Create an image locally and run

```bash
    docker build -t medicloud-backend .
```

```bash
    docker run -d \ 
        -p 3000:3000 \
        -e DATABASE_URL="your postgresql link" \
        -e SECRET_KEY="256-bit hexadecimal key" \
        -e JWT_SECRETKEY="your secret key" \
         medicloud-backend
```



## Get image from dockerhub

```bash
    docker pull darkxprime/medicloud-server:v3
```

```bash
      docker run -d \
        -p 3000:3000 \
        -e DATABASE_URL="your postgresql link" \
        -e SECRET_KEY="256-bit hexadecimal key" \
        -e JWT_SECRETKEY="your secret key" \
        -e CORS_URL="http://localhost:3000 OR any other custom domain" \
        darkxprime/medicloud-server:v3
```

## Design

![Project](https://github.com/amitnaik96/MediCloud-Backend/blob/main/SD.png)