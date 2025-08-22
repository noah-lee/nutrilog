# 🥦 Nutrilog – AI-Powered Calorie and Activity Logger

This application provides a minimal interface for users to log their food intake and physical activities using plain English.

## 🔍 How it works

- The user types something like:  
  `"Today I had a protein shake and walked for 1 hour."`

- The backend sends this input to an LLM (via OpenAI API) to extract structured nutrition and activity data, including:
  - Calories and protein for foods
  - Calories burned and duration for activities

- The LLM returns a **strict JSON** response, which is used to:
  - **Create timestamped entries** for food and activity logs

- The frontend fetches this information to:
  - Display food and activity history for a selected day, week, or month
  - Compare totals against **daily goals** (e.g., calories and protein targets)

This system enables fast, flexible tracking with minimal manual input, powered by AI and stored in a simple, extensible database structure.

## Running the Application
To start both the API and the database services, use:

```bash
docker compose up db api ui
```

## Running Migrations
To run database migrations, use:

```bash
docker compose run --rm migrate up
```