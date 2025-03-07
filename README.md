[![medicloud-logo](https://github.com/amitnaik96/MediCloud-Backend/blob/master/images/medicloud-logo.png)](https://medicloud.realamit.xyz/)  

MediCloud Backend is a secure API service for handling encrypted medical data transmission in a cloud environment. It ensures **privacy, integrity, and confidentiality** by implementing **AES encryption** before storing data in a **Neon-Tech PostgreSQL database**. The backend is deployed in a **containerized environment** on **AWS EC2**, with **Nginx as a reverse proxy**.

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


## **Setup Instructions**  

### **1. Clone the repository**  
```bash
    git clone https://github.com/amitnaik96/MediCloud-Backend.git
    cd MediCloud-Backend
```
### **2. Install dependencies and add .env file (refer .env.example)**  
```bash
    npm install
```
### **3. Run the backend**  
```bash
    npm run dev
```

### **Run with docker**  

```bash
    docker build -t medicloud-backend .
```

```bash
    docker run -d \
    -p 3000:3000 \
    -e DATABASE_URL="your postgresql link" \
    -e SECRET_KEY="256-bit hexadecimal key" \
    -e JWT_SECRETKEY="your secret key" \
    -e CORS_URL="http://localhost:3000 OR any other custom domain" \
    medicloud-backend
```
### **API Documentation**
Visit `http://localhost:3000/api/docs` for the documentation 

## License
Distributed under the [MIT](https://github.com/amitnaik96/MediCloud-Backend/blob/master/LICENSE) License .
