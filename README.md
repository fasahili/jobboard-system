# Job Board System - Backend

A backend REST API for a job board platform that allows companies to post jobs and job seekers to apply. Built using **Django**, **Django REST Framework**, and **PostgreSQL**.

---


## 🎬 Demo

![Demo](client/JB-gif.gif)

---


##  Features

- JWT Authentication
- Role-based access control: `Admin`, `Company`, `Job Seeker`
- Companies can create and manage job postings
- Job Seekers can apply to jobs with a CV and message
- Application model includes status updates and file upload
- Filtering jobs by field, location, experience
- Clean project structure following best practices
- API Documentation with Swagger/OpenAPI
- Pre-commit hooks (formatting, linting, etc.)

---

## Project Structure

```

jobboard/
├── config/                  # Django settings (base/dev/prod)
│   └── settings/
├── apps/                   # Main business logic
│   ├── accounts/           # Authentication and user roles
│   ├── companies/          # Company profiles
│   ├── jobs/               # Job postings
│   ├── applications/       # Job applications
├── media/                  # Uploaded CVs
├── static/                 # Static files
├── manage.py
├── requirements.txt
├── .env
├── .pre-commit-config.yaml

```

---

##  Roles and Permissions

| Role       | Abilities |
|------------|-----------|
| Admin      | Full access to all data |
| Company    | Post jobs, view applicants to their jobs |
| Job Seeker | View and apply to jobs, track their applications |

---

##  API Endpoints (Main)

###  Authentication

- `POST /api/token/` — Get access and refresh tokens
- `POST /api/token/refresh/` — Refresh token

###  Users / Accounts

- `POST /api/register/` — Register a new user
- `GET /api/profile/` — Get user profile (authenticated)

###  Companies

- `GET /api/companies/`
- `POST /api/companies/`

###  Job Posts

- `GET /api/jobs/`
- `POST /api/jobs/` (company only)

###  Applications

- `GET /api/applications/`
- `POST /api/applications/` (job seekers only)

---

##  Security & Auth

- JWT Auth with `djangorestframework-simplejwt`
- Role-based filtering in viewsets
- Custom permissions per view

---

##  Setup Instructions

1. **Clone the repo**:
   ```bash
   git clone https://github.com/yourusername/jobboard-backend.git
   cd jobboard-backend
   ```

2. **Install dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up PostgreSQL** and create a database.

4. **Create `.env` file**:

   ```
   SECRET_KEY=your_secret_key
   DEBUG=True
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   ```

5. **Run migrations**:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**:

   ```bash
   python manage.py createsuperuser
   ```

7. **Run the server**:

   ```bash
   python manage.py runserver
   ```

---

##  Pre-commit

We use `pre-commit` to ensure code quality.

### Setup:

```bash
pip install pre-commit
pre-commit install
```

---

##  Swagger Documentation

Visit:

```
http://localhost:8000/api/docs/
```

---

##  Technologies Used

* Django
* Django REST Framework
* PostgreSQL
* SimpleJWT
* drf-yasg (Swagger)
* pre-commit

---
