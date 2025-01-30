# MediCloud Backend

## Secure and Private Medical Data Transmission in Cloud Computing 

## **Overview**  
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

## **Architecture**  
1. **Frontend** (`https://medicloud.realamit.xyz`) hosted on **Cloudflare Pages**  
2. **Backend** (`https://medicloud-server.realamit.xyz`) running inside a **Docker container** on **AWS EC2(Instance has been stopped now!)**  
3. **Nginx** reverse proxy managing requests  
4. **Neon-Tech PostgreSQL** for encrypted data storage  
5. **Data Flow**:
   - Medical data is **encrypted using AES** before storage  
   - Stored **encrypted in PostgreSQL**  
   - Retrieved **securely and decrypted** before sending to authorized users  

![Architecture](https://github.com/amitnaik96/MediCloud-Backend/blob/master/SD.png)  

## **API Endpoints**  
Below are the available API endpoints for MediCloud Backend:

| Method  | Endpoint       | Description                        |
|---------|---------------|------------------------------------|
| `POST`  | `/api/vi/signin`   | Authentication    |
| `GET`   | `/api/vi/doctors` | Retrieve decrypted doctors data |
| `GET` | `/api/v1/doctor?id=4` | Get a specific doctor        |
| `POST` | `/api/v1/doctor` | Add doctor data        |
| `GET` | `/api/v1/filterdoctor?filter=amit` | Filter doctor based on email       |
| `GET` | `/api/v1/isadmin` | Check whether user(Doctor) is Admin        |
| `GET` | `/api/v1/me` | Check whether user(Doctor) is Authenticated        |
| `GET` | `/api/v1/patients` | Retrieve decrypted patients data        |
| `GET` | `/api/v1/patient?id=18` | Get a specific patient        |
| `POST` | `/api/v1/patient` | Add patient data        |
| `PUT` | `/api/v1/patient` | Update patient data        |
| `GET` | `/api/v1/filterpatient?filter=9036` | Filter patient based on  phone no       |
| `POST` | `/api/v1/signout` | Sign Out      |


## **Setup Instructions**  

### **1. Clone the Repository**  
```bash
    git clone https://github.com/amitnaik96/MediCloud-Backend.git
    cd MediCloud-Backend
```
### **2. Install Dependencies**  
```bash
    npm install
```

### **3. Add .env File(Environment Variables)**  
```bash
    DATABASE_URL="your postgresql link" 
    SECRET_KEY="256-bit hexadecimal key" 
    JWT_SECRETKEY="your secret key" 
    CORS_URL="http://localhost:3000 OR any other custom domain" 
```
### **4. Run the Backend**  
```bash
    npm run dev
```

### **5. Run with Docker**  

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

## License
Distributed under the [MIT](https://github.com/amitnaik96/MediCloud-Backend/blob/master/LICENSE) License .