pipeline {
    agent any
    parameters {
        booleanParam(name: 'PUBLISH_IMAGE', defaultValue: false, description: 'Push image to Docker Hub (requires Jenkins credential dockerhub-creds)')
    }
    environment {
        IMAGE_NAME = 'REPLACE_WITH_DOCKERHUB_USERNAME/carepoint-portal'
    }
    stages {
        stage('Checkout') { steps { checkout scm } }
        stage('Validate site files') {
            steps {
                powershell '''
                    $required = @("public/index.html", "public/appointments.html", "public/doctors.html", "public/departments.html", "public/about.html", "public/styles.css", "public/app.js", "Dockerfile")
                    foreach ($file in $required) {
                      if (-not (Test-Path $file)) { Write-Error "Missing required file: $file"; exit 1 }
                    }
                    Write-Host "All required multi-page website files are present."
                '''
            }
        }
        stage('Build Docker image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% .'
                bat 'docker tag %IMAGE_NAME%:%BUILD_NUMBER% %IMAGE_NAME%:latest'
            }
        }
        stage('Publish image') {
            when { expression { return params.PUBLISH_IMAGE == true } }
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_TOKEN')]) {
                    bat '''
                        @echo off
                        echo %DOCKERHUB_TOKEN%| docker login -u %DOCKERHUB_USER% --password-stdin
                        if errorlevel 1 exit /b 1
                        docker push %IMAGE_NAME%:%BUILD_NUMBER%
                        docker push %IMAGE_NAME%:latest
                        docker logout
                    '''
                }
            }
        }
    }
    post { always { echo 'CarePoint pipeline finished. Review the stage results above.' } }
}
