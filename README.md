#  Social Feed App (MERN Stack)

A full-stack social media application inspired by standard social feeds. Built as an internship assignment to demonstrate proficiency in the **MERN Stack** (MongoDB, Express, React, Node.js). 

Users can create accounts, share updates (text & images), and interact with others through likes and comments in real-time.

###  Live Demo
**[Click here to open the Live App](https://social-app-rose-eight.vercel.app/)**

---

##  Tech Stack

* **Frontend:** React.js, Material UI (MUI)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt
* **Deployment:** Vercel (Frontend) + Render (Backend)

---

##  Key Features

* ** Authentication:** Secure User Signup & Login.
* ** Create Posts:** Share thoughts (Text) or visuals (Image URLs). Support for mixed content.
* ** Global Feed:** A clean, responsive feed displaying posts from all users chronologically.
* ** Interaction:** Like and Unlike posts instantly (Optimistic UI updates).
* ** Comments:** Real-time commenting system with username tracking.
* ** Responsive Design:** Fully optimized for Mobile and Desktop using Material UI containers.

---

##  Future Improvements

While the current version meets all core requirements, the following features are planned for future updates to enhance scalability:

* **Image Uploads:** Integration with **Cloudinary** or **AWS S3** to allow direct file uploads instead of URL linking.
* **Pagination:** Implementation of server-side pagination (e.g., `limit` & `skip`) to optimize load times for large datasets.
* **User Profiles:** Dedicated profile pages to view specific user history.

---

##  How to Run Locally

If you want to run this project on your local machine, follow these steps:

### 1. Clone the Repository

git clone [https://github.com/guruduttnbharadwaj/social-app.git](https://github.com/guruduttnbharadwaj/social-app.git)
cd social-app

### 2. Backend Setup

cd backend  
npm install  

Create a .env file in the backend folder and add:

MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
PORT=5000  

npm start  

### 3. Frontend Setup

cd ../frontend  
npm install  
npm start  

The app will launch at http://localhost:3000.

---

📂 Project Structure

social-app/  
├── backend/  
│   ├── models/       # MongoDB Schemas (User, Post)  
│   ├── routes/       # API Routes (Auth, Posts)  
│   └── server.js     # Entry point  
│  
└── frontend/  
    ├── src/  
    │   ├── components/ # Feed, Auth, Navbar  
    │   ├── api.js      # Axios instance  
    │   └── App.js      # Main Router  
