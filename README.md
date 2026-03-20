# Dataset Catalog Prototype

This project is a small prototype of a Dataset Catalog inspired by StewardIQ.

It demonstrates:
- React + TypeScript frontend
- Integration with a .NET API
- Basic dataset modeling
- Client-side filtering
- Simple AI-style insight logic

---

##  Tech Stack
- Frontend: React + TypeScript
- Backend: .NET 7 Web API
- Styling: CSS

---

## Features
- Display datasets in a table
- Create new datasets via form
- Form validation (required fields, email, score 0–100)
- AI Insight shown when `qualityScore < 60`
- Filter by domain and status (client-side)
- Data is loaded from backend on initial load

---

##  Backend API

GET /api/datasets

- Returns an empty list
- No database required

---

##  How to Run

### 1. Backend

cd DatasetApi  
dotnet run  

The API will run on:  
http://localhost:5156

---

### 2. Frontend

cd frontend  
npm install  
npm run dev  

Then open:  
http://localhost:5173

---

##  AI Usage

AI tools (ChatGPT) were used to:
- Assist with component structure
- Help with TypeScript typing
- Improve code clarity and validation logic
