## Create an image locally and run

```bash
    docker build -t medicloud-backend .
```

```bash
    docker run -d -p 3000:3000 -e DATABASE_URL="your postgresql link" -e SECRET_KEY="256-bit hexadecimal key" -e JWT_SECRETKEY="your secret key" medicloud-backend
```

## OR

## Get image from docker

```bash
    docker pull darkxprime/medicloud-server:v2
```

```bash
      docker run -d -p 3000:3000 -e DATABASE_URL="your postgresql link" -e SECRET_KEY="256-bit hexadecimal key" -e JWT_SECRETKEY="your secret key" darkxprime/medicloud-server:v2
```
