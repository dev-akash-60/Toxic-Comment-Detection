## Toxic Comment Detection

A full stack AI powered Web applications that detects toxic, abusive, and sensitive comments using Machine Learning. Built with **React.js frontend**, **Flask backend**.

## 🚀 Live Features

- 🔍 Detects toxic, severe toxic, insult, threat, identity hate, etc.
- 🤖 AI-powered ML model (TF-IDF + Logistic Regression / ML classifier)
- 🧠 Real-time prediction via Flask API
- 📊 Analytics Dashboard (Toxic vs Safe ratio)
- 🎨 Modern UI with animations, particles, and scanning effect
- 🫧 Interactive background animations

## 🧱 Tech Stack

### Frontend:

- React.js
- Framer Motion
- tsParticles (background animation)

### Backend:

- Flask (Python)
- Scikit-learn
- Pandas
- NumPy
- Flask-CORS

### Machine Learning:

- TF-IDF Vectorizer
- Logistic Regression / Multi-label classification

---
## 📁 Project Folder Structure
```
TOXIC COMMENT DETECTION\
|—— backend\
|  |—— app.py
|  |—— model.pkl
|  |—— requirments.txt
|  |__ vectorizer.pkl
|
|—— frontend\
|  |—— public\
|   |—— bg-video.mp4
|   |—— index.html
|  |—— src\
|   |—— App.css
|   |—— App.js
|   |—— App.test.js
|   |—— index.css
|   |__ index.js
|
```
### 🤖 How It Works
- User logs in via Firebase Auth
- User enters a comment
- React sends request to Flask API
- ML model analyzes text
- Prediction returned (toxic / safe / categories)
- Dashboard updates analytics in real time

### Project Preview
## 📸 Preview

![Toxic Comment Detection Preview](https://github.com/dev-akash-60/Tic-Tac-Toe/blob/main/Screenshot%20tic%20tac%20toe%20game.png?raw=true)

---

### 📊 Example Output
```
Comment: "You are so stupid"

Result:
- Toxic: Yes
- Insult: Yes
- Threat: No
- Identity Hate: No
```

### 🏆 Future Improvements
- 🔥 Upgrade to BERT transformer model
- 🌍 Multi-language detection
- 📱 Mobile app version
- 💾 Database storage for comments
- 📊 Advanced analytics dashboard