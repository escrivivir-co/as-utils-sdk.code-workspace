// Matrix Theater JavaScript - Mission Tracking System

class MatrixTheater {
    constructor() {
        this.missionData = null;
        this.matrixRain = null;
        this.rainChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.init();
    }

    async init() {
        await this.loadMissionState();
        this.initMatrixRain();
        this.renderStorySteps();
        this.renderTeamsGrid();
        this.updateClock();
        this.startAutoRefresh();
    }

    async loadMissionState() {
        try {
            const response = await fetch('./mission-state.json');
            this.missionData = await response.json();
            console.log('🎭 Mission state loaded:', this.missionData.missionTitle);
        } catch (error) {
            console.error('❌ Error loading mission state:', error);
            // Fallback data
            this.missionData = {
                missionTitle: "Expedición Oasis42",
                currentStep: 1,
                totalSteps: 12,
                steps: [],
                teams: {}
            };
        }
    }

    initMatrixRain() {
        const rainContainer = document.getElementById('matrixRain');
        if (!rainContainer) return;

        // Clear existing rain
        rainContainer.innerHTML = '';

        // Create matrix rain columns
        const screenWidth = window.innerWidth;
        const columnWidth = 20;
        const columns = Math.floor(screenWidth / columnWidth);

        for (let i = 0; i < columns; i++) {
            this.createRainColumn(rainContainer, i * columnWidth);
        }
    }

    createRainColumn(container, x) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = x + 'px';
        column.style.top = '0';
        column.style.width = '20px';
        column.style.height = '100vh';
        container.appendChild(column);

        // Add random delay to start
        setTimeout(() => {
            this.animateRainColumn(column);
        }, Math.random() * 5000);
    }

    animateRainColumn(column) {
        const chars = [];
        const numChars = Math.floor(Math.random() * 10) + 5;
        
        for (let i = 0; i < numChars; i++) {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = this.rainChars[Math.floor(Math.random() * this.rainChars.length)];
            char.style.top = (i * -20) + 'px';
            char.style.left = '0px';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            char.style.animationDelay = (i * 0.1) + 's';
            column.appendChild(char);
            chars.push(char);
        }

        // Remove chars after animation and restart
        setTimeout(() => {
            chars.forEach(char => char.remove());
            this.animateRainColumn(column);
        }, 6000);
    }

    renderStorySteps() {
        const stepsContainer = document.getElementById('storySteps');
        const currentStepSpan = document.getElementById('currentStep');
        const progressBar = document.getElementById('storyProgress');

        if (!this.missionData.steps || !stepsContainer) return;

        currentStepSpan.textContent = this.missionData.currentStep;
        
        // Update progress bar
        const progressPercent = (this.missionData.currentStep / this.missionData.totalSteps) * 100;
        progressBar.style.width = progressPercent + '%';

        stepsContainer.innerHTML = '';

        this.missionData.steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'story-step';
            
            // Add status classes
            if (step.id < this.missionData.currentStep) {
                stepElement.classList.add('completed');
            } else if (step.id === this.missionData.currentStep) {
                stepElement.classList.add('current');
            }

            stepElement.innerHTML = `
                <div class="step-title">${step.title}</div>
                <div class="step-description">${step.description}</div>
                <div class="step-technical">🎯 ${step.technicalGoal}</div>
            `;

            stepsContainer.appendChild(stepElement);
        });
    }

    renderTeamsGrid() {
        const teamsContainer = document.getElementById('teamsGrid');
        const materialsContainer = document.getElementById('materialsList');

        if (!this.missionData.teams || !teamsContainer) return;

        teamsContainer.innerHTML = '';
        
        Object.entries(this.missionData.teams).forEach(([teamId, team]) => {
            const teamElement = document.createElement('div');
            teamElement.className = 'team-card';

            // Create progress dots
            const progressDots = [];
            for (let i = 1; i <= this.missionData.totalSteps; i++) {
                let dotClass = 'progress-dot';
                if (i < team.currentStep) {
                    dotClass += ' completed';
                } else if (i === team.currentStep) {
                    dotClass += ' current';
                }
                progressDots.push(`<div class="${dotClass}"></div>`);
            }

            // Determine team status
            let statusClass = 'not-started';
            let statusText = 'No Empezado';
            
            if (team.currentStep > 1 && team.currentStep < this.missionData.totalSteps) {
                statusClass = 'in-progress';
                statusText = 'En Curso';
            } else if (team.currentStep >= this.missionData.totalSteps) {
                statusClass = 'completed';
                statusText = 'Acabado';
            }

            teamElement.innerHTML = `
                <div class="team-name">${team.name}</div>
                <div class="team-progress">
                    <div class="progress-steps">
                        ${progressDots.join('')}
                    </div>
                    <div class="team-status ${statusClass}">${statusText}</div>
                </div>
            `;

            teamsContainer.appendChild(teamElement);
        });

        // Render learning materials for current step
        this.renderLearningMaterials(materialsContainer);
    }

    renderLearningMaterials(container) {
        if (!container || !this.missionData.steps) return;

        const currentStep = this.missionData.steps.find(step => step.id === this.missionData.currentStep);
        if (!currentStep || !currentStep.learningMaterial) return;

        container.innerHTML = '';

        currentStep.learningMaterial.forEach(material => {
            const materialElement = document.createElement('div');
            materialElement.className = 'material-item';
            materialElement.textContent = `📝 ${material}`;
            container.appendChild(materialElement);
        });
    }

    updateClock() {
        const clockElement = document.getElementById('currentTime');
        if (!clockElement) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        clockElement.textContent = timeString;
    }

    startAutoRefresh() {
        // Update clock every second
        setInterval(() => {
            this.updateClock();
        }, 1000);

        // Refresh mission state every 30 seconds
        setInterval(() => {
            this.loadMissionState().then(() => {
                this.renderStorySteps();
                this.renderTeamsGrid();
            });
        }, 30000);
    }

    // Public method for manual refresh
    async refresh() {
        console.log('🔄 Refreshing mission state...');
        await this.loadMissionState();
        this.renderStorySteps();
        this.renderTeamsGrid();
        
        // Show feedback
        const btn = document.querySelector('.refresh-btn');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = '✅ Actualizado';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }
    }

    // Method to update team progress (for hacklab use)
    updateTeamProgress(teamId, stepId) {
        if (this.missionData.teams[teamId]) {
            this.missionData.teams[teamId].currentStep = stepId;
            this.renderTeamsGrid();
            
            // Could also save to localStorage or send to server
            localStorage.setItem('theater-mission-state', JSON.stringify(this.missionData));
        }
    }

    // Method to advance overall mission step
    advanceMissionStep() {
        if (this.missionData.currentStep < this.missionData.totalSteps) {
            this.missionData.currentStep++;
            this.renderStorySteps();
            this.renderTeamsGrid();
            
            localStorage.setItem('theater-mission-state', JSON.stringify(this.missionData));
        }
    }
}

// Initialize theater when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎭 Initializing Matrix Theater...');
    window.matrixTheater = new MatrixTheater();
});

// Global function for refresh button
function loadMissionState() {
    if (window.matrixTheater) {
        window.matrixTheater.refresh();
    }
}

// Expose some methods for hacklab interaction
window.theaterAPI = {
    updateTeam: (teamId, stepId) => {
        if (window.matrixTheater) {
            window.matrixTheater.updateTeamProgress(teamId, stepId);
        }
    },
    advanceStep: () => {
        if (window.matrixTheater) {
            window.matrixTheater.advanceMissionStep();
        }
    },
    getCurrentState: () => {
        return window.matrixTheater ? window.matrixTheater.missionData : null;
    }
};

// Handle window resize for matrix rain
window.addEventListener('resize', () => {
    if (window.matrixTheater) {
        setTimeout(() => {
            window.matrixTheater.initMatrixRain();
        }, 100);
    }
});

// Console commands for hacklab coordinators
console.log(`
🎭 MATRIX THEATER - HACKLAB COMMANDS
=====================================

theaterAPI.updateTeam('team_alpha', 3)  // Update Astillero Backend to step 3
theaterAPI.updateTeam('team_beta', 2)   // Update Astillero Frontend to step 2
theaterAPI.advanceStep()                // Advance overall mission step
theaterAPI.getCurrentState()            // Get current mission state

Teams available:
- team_alpha: Astillero Backend
- team_beta: Astillero Frontend  
- team_gamma: Astillero Integration
- team_delta: Astillero Validation

Steps: 1-12 (Hero's Journey)
`);