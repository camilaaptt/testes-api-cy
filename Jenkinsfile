pipeline {
    agent any

    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/camilaaptt/testes-api-cy.git'
            }
        }
        stage('Instalar dependências')  {
            steps {
                sh 'npm install'
            }
        }
        stage('Executar Testes') {
            steps {
                sh 'NO_COLOR=1 npm run cy:run-ci'
                sh 'npm run cy:report'
            }
        }
        stage('Publicar Report') {
            steps {
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'mochawesome-report', reportFiles: 'report.html', reportName: 'Testes API ServeRest Cypress Report', reportTitles: '', useWrapperFileDirectly: true])
            }
        }
        
    }
}