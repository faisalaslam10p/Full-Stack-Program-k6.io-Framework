pipeline {
  agent {
    label 'windows'
  }

  stages {
    stage('Load Test') {
      steps {
        bat 'k6 run -e ENV=staging tests\\posts.test.js'
      }
    }

    stage('Stress Test') {
      steps {
        bat 'k6 run -e ENV=staging tests\\search.test.js'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: '*.json', allowEmptyArchive: true
    }
  }
}
