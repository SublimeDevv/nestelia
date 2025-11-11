pipeline {
    agent any
    
    stages {
        stage('Setup Git Safe Directory') {
            steps {
                withCredentials([
                    string(credentialsId: 'PATH_FRONTEND', variable: 'PATH_FRONTEND')
                ]) {
                    script {
                        echo 'Configuring Git safe directory...'
                        sh '''
                            sudo git config --global --add safe.directory $PATH_FRONTEND
                        '''
                    }
                }
            }
        }
        
        stage('Pull Latest Code') {
            steps {
                withCredentials([
                    string(credentialsId: 'PATH_FRONTEND', variable: 'PATH_FRONTEND'),
                    string(credentialsId: 'TARGET_BRANCH', variable: 'BRANCH_NAME')
                ]) {
                    script {
                        echo 'Pulling latest changes from repository...'
                        sh '''
                            cd $PATH_FRONTEND
                            sudo git pull origin $BRANCH_NAME
                        '''
                    }
                }
            }
        }
        
        stage('Build and Deploy') {
            steps {
                withCredentials([
                    string(credentialsId: 'PATH_FRONTEND', variable: 'PATH_FRONTEND')
                ]) {
                    script {
                        echo 'Installing dependencies...'
                        sh '''
                            cd $PATH_FRONTEND
                            npm i
                        '''
                        echo 'Building and deploying...'
                        sh '''
                            cd $PATH_FRONTEND
                            npm run build
                        '''
                    }
                }
            }
        }
        
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}