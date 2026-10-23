<<<<<<< HEAD
# CarePoint Healthcare Portal — Enhanced UI

## Pages
- `public/index.html` — overview dashboard and summary metrics
- `public/appointments.html` — create, filter, complete/reopen, and delete demo appointments
- `public/doctors.html` — fictional care-team profiles
- `public/departments.html` — sample care specialties
- `public/about.html` — project overview, limitations, and planned experiments

## Run locally
From the project root in PowerShell:
```powershell
py -m http.server 8000 --directory public
```
Open `http://localhost:8000`.

## Run with Docker
```powershell
docker build -t carepoint-portal:local .
docker run --rm -d --name carepoint-portal -p 8085:80 carepoint-portal:local
```
Open `http://localhost:8085`; stop with `docker stop carepoint-portal`.

## Data and safety
Appointments are stored in `sessionStorage` for the current browser session only. This is a UI prototype without authentication, backend, database, or healthcare compliance controls. Use fictional data only.

## DevOps experiments
- Experiment 7: Jenkins validation and Docker build/publish.
- Experiment 8: Blue-green deployment using two versioned images in Kubernetes.
- Experiment 9: source and container vulnerability scanning with security gates.

## Jenkins
Push to GitHub, create a Jenkins Pipeline job, and replace `REPLACE_WITH_DOCKERHUB_USERNAME` in the Jenkinsfile. To publish, create a Jenkins username/password credential named `dockerhub-creds` and use a Docker Hub access token as the password. Enable `PUBLISH_IMAGE` only when ready.
=======
# PBL-3
>>>>>>> 752920630ba9e79bf05c5934ba4e6cee8d456c59
