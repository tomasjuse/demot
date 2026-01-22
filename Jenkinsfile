pipeline {
    agent any

    environment {
        // Ensure CI environment variable is set for Playwright
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies from package.json
                bat 'npm install'
                
                // Explicitly install Playwright since it is missing from package.json dependencies
                // This ensures the test runner is available in the CI environment
                bat 'npm install -D @playwright/test'
                
                // Install Playwright browsers and dependencies
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Run only Playwright tests
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Archive the Playwright HTML report
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            
            // Publish JUnit test results
            junit testResults: 'test-results/results.xml', allowEmptyResults: true
        }
    }
}