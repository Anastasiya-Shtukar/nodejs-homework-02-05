# Projekt: Fullstack Contacts Manager

## Cel projektu

Projekt portfolio typu fullstack pokazujący:

- autoryzację użytkownika
- protected routes
- komunikację frontend ↔ backend przez REST API
- zarządzanie stanem przez Redux Toolkit
- CRUD danych
- pracę z tokenem JWT
- podstawowy flow email verification

To NIE jest projekt produkcyjny SaaS ani główny projekt portfolio.
Jego rola:
pokazać solidne fundamenty fullstack React + Node.js.

---

# Stack

## Frontend

- React
- Vite
- React Router
- Redux Toolkit
- React Redux
- Redux Persist
- Axios
- Material UI

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- email verification

---

# Architektura

## Frontend

Frontend odpowiada za:

- UI
- auth flow
- protected routes
- formularze
- zarządzanie stanem aplikacji
- komunikację z backend API

### Redux store

Store zawiera:

- auth
- contacts
- filters
- modal state

Redux Toolkit używany jest do:

- async thunks
- loading states
- error handling
- central state management

### Główne flow

## Login

LoginForm
→ dispatch(login())
→ async thunk
→ backend API
→ JWT token
→ auth state update
→ protected routes dostępne

---

## Contacts CRUD

Component
→ dispatch(fetch/add/deleteContact)
→ thunk
→ API request
→ reducer update
→ rerender UI

---

# Backend

Backend odpowiada za:

- auth
- JWT validation
- contacts API
- MongoDB persistence
- email verification

## Backend flow

Request
→ Express route
→ middleware auth
→ controller
→ mongoose model
→ MongoDB
→ response

---

# Obecny stan projektu

## Działa:

- register
- login
- token auth
- contacts CRUD
- Redux state
- routing
- basic persistence

## Problemy / tech debt:

- frontend i backend nie są jeszcze poprawnie spięte
- auth refresh flow wymaga poprawy
- Redux naming cleanup
- UX jest mocno kursowy
- brak dopracowanego README
- brak spójnego deploymentu
- kod wymaga ponownego zrozumienia po przerwie

---

# Cel pracy nad projektem

NIE przepisywanie od zera.

Cel:

- odzyskać rozumienie architektury
- poprawić flow danych
- dokończyć integrację frontend/backend
- doprowadzić projekt do portfolio-ready stanu
- traktować projekt jako demonstrację:
  - Redux Toolkit
  - auth flow
  - REST API
  - fullstack integration

---

# Styl pracy nad projektem

- przez praktykę
- bez tutorialowego przepisywania
- najpierw analiza flow danych
- potem poprawki
- małe konkretne kroki
- bez overengineeringu
- bez przepisywania wszystkiego „bo brzydkie”

---

# Ważne

To NIE jest główny projekt portfolio.

Główny projekt:
AI Job Tracker.

Ten projekt ma być:
„solidnym dowodem znajomości Redux + auth + REST API + fullstack basics”.
