
 Project Overview

MovieDB is a responsive React application that allows users to browse, search, and discover movies using the TMDB (The Movie Database) API. The application features a modern UI with real-time data fetching, pagination, and interactive components.

Live Demo: [https://moviedrop-snowy.vercel.app/]
 Features
Core Features

     Movie Search: Real-time search with debouncing

     Movie Discovery: Browse popular, top-rated, and upcoming movies

     Pagination: Efficient data loading with page navigation

     Movie Details: Comprehensive movie information view

     Rating System: Display TMDB ratings with visual indicators

     Responsive Design: Mobile-first approach with adaptive layouts


 Tech Stack
Frontend

    React 18 (Functional Components with Hooks)

    React Router v6 (Client-side routing)

    App write for Real-time analytics and for understanding user interests

    Tailwind CSS

    Vite (Build tool and development server)

Development Tools

    ESLint + Prettier (Code quality and formatting)

    GitHub Actions (CI/CD pipeline)

 Installation & Setup
Prerequisites

    Node.js (v18 or higher)

    npm/yarn/pnpm

    TMDB API key (free tier)

Step-by-Step Setup

    Clone the Repository

bash

git clone https://github.com/79Rcf/reactcourse
cd crashcourse

    Install Dependencies

bash

npm install
# or
yarn install
# or
pnpm install

    Configure Environment Variables
    Create a .env file in the root directory:

env

VITE_TMDP_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p

    Start Development Server

bash

npm run dev
# or
yarn dev


 Architecture & Logic
Project Structure
text

src/ 
├── components/           # Reusable UI components
│   ├── MovieCards.jsx/   # display cards and details
│   ├── MovieDetails.jsx/ # display movie details  
│   ├── search.jsx/       # search details
    └── Spinner.jsx       # shows a loading spinner ui when movie are refresh

├── hooks/                # Custom React hooks
    └── useDebounce.jsx   # limit the rate at which a function executes. It ensures that time-consuming tasks do not fire so often, which can improve performance and prevent unnecessary operations.
├── pages/           
    ├── homePage.jsx     # fetching movie and render them

├── AppWrite.js          # I chose Appwrite as the backend service to track user search behavior because

Key Design Decisions

    Component Architecture

        Atomic design principles

        Compound components for complex UIs

        Container/Presentational pattern separation

    State Management Strategy

        Appwrite

        TanStack Query for server state (API data)

        Context API for theme and authentication

    Performance Optimizations

        React.memo for expensive components

        useCallback/useMemo for function/object references

        Virtualized lists for large datasets

        Image lazy loading with blur placeholders

