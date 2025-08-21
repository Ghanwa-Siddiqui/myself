from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Portfolio API",
    description="API for Ghanwa Areeb's portfolio",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

portfolio_data = {
    "name": "Ghanwa Areeb",
    "email": "areebghanwa@gmail.com",
    "location": "Lahore, Pakistan",
    "education": {
        "degree": "Bachelor of Science in Computer Science",
        "university": "University of Lahore",
        "graduation": "Expected 2027",
        "cgpa": "3.90"
    },
    "skills": ["C++", "Python", "FastAPI", "React", "MySQL", "DSA", "OOP"],
    "experience": [
        {
            "role": "Full Stack Development Intern",
            "company": "Netsol",
            "tech": ["Python", "React", "FastAPI"],
            "duration": "Internship"
        }
    ],
    "projects": [
        {
            "title": "ATM Management System",
            "desc": "Implemented core ATM functionalities with C++ using OOP principles."
        },
        {
            "title": "Blood Bank Management System",
            "desc": "Developed MySQL-backed application for donors, blood inventory, and hospital requests."
        }
    ]
}

@app.get("/")
def home():
    return {"message": "Portfolio API is running!"}

@app.get("/portfolio")
def get_portfolio():
    return portfolio_data
