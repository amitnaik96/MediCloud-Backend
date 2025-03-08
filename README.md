[![medicloud-logo](https://github.com/amitnaik96/MediCloud-Backend/blob/master/images/medicloud-logo.png)](https://medicloud.realamit.xyz/)  

This project ensures secure and private medical data transmission in the cloud using AES encryption to protect patient and doctor information

## **Features**  
**AES Encryption** – Securely encrypts patients and doctors data before storage  
**Cloud Deployment** – Hosted on **AWS EC2(Stopped for now!)** with **Cloudflare Pages** for frontend  
**Secure Communication** – Uses HTTPS for data transmission  
**Database Security** – Stores encrypted data in **Neon-Tech PostgreSQL(or any ProtgresSQL DB service provider)**  
**Scalability** – Containerized architecture for easy deployment

## **Tech Stack**  
- **Backend**: Node.js, Express.js  
- **Database**: PostgreSQL (Neon-Tech)  
- **Encryption**: AES (Advanced Encryption Standard)  
- **Deployment**: AWS EC2, Docker  
- **Proxy**: Nginx  
- **Frontend**: React (Deployed on Cloudflare Pages)  

![Architecture](https://github.com/amitnaik96/MediCloud-Backend/blob/master/images/SD.png)  


## **Installation**  

### **Local**
```bash
    # clone the repo
    git clone https://github.com/amitnaik96/MediCloud-Backend.git
    cd MediCloud-Backend

    # install dependencies and add .env file (refer .env.example)**  
    npm install
    
    # run the backend  
    npm run dev
```

### **Docker**

```bash
    # build the image
    docker build -t medicloud-backend .

    # run the container with envs
    docker run -d \
    -p 3000:3000 \
    -e DATABASE_URL="your postgresql link" \
    -e SECRET_KEY="256-bit hexadecimal key" \
    -e JWT_SECRETKEY="your secret key" \
    -e CORS_URL="http://localhost:3000 OR any other custom domain" \
    medicloud-backend
```
### **API Docs**
Visit `http://localhost:3000/api/docs` for the documentation 

## License
Distributed under the [MIT](https://github.com/amitnaik96/MediCloud-Backend/blob/master/LICENSE) License .
