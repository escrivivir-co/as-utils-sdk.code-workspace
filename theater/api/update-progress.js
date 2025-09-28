// 🎭 Theater Oasis42 - Progress Update API
// Script para actualizar el estado de la misión durante el hacklab

class MissionProgressAPI {
    constructor(stateFilePath = './mission-state.json') {
        this.stateFilePath = stateFilePath;
        this.state = null;
        this.loadState();
    }
    
    async loadState() {
        try {
            const fs = require('fs').promises;
            const data = await fs.readFile(this.stateFilePath, 'utf8');
            this.state = JSON.parse(data);
        } catch (error) {
            console.error('Error loading mission state:', error);
            this.initializeDefaultState();
        }
    }
    
    async saveState() {
        try {
            const fs = require('fs').promises;
            this.state.mission.lastUpdate = new Date().toISOString();
            await fs.writeFile(this.stateFilePath, JSON.stringify(this.state, null, 2));
            console.log('✅ Mission state saved successfully');
        } catch (error) {
            console.error('❌ Error saving mission state:', error);
        }
    }
    
    initializeDefaultState() {
        this.state = {
            mission: {
                title: "Expedición a Oasis42 - El Camino del Héroe",
                status: "initialized",
                currentStep: 1,
                totalSteps: 12,
                startTime: new Date().toISOString(),
                lastUpdate: new Date().toISOString()
            },
            steps: [],
            teams: {
                team_alpha: { name: "Astillero Backend", current_step: 1, progress: 0 },
                team_beta: { name: "Astillero Frontend", current_step: 1, progress: 0 },
                team_gamma: { name: "Astillero Integration", current_step: 1, progress: 0 },
                team_delta: { name: "Astillero Validation", current_step: 1, progress: 0 }
            },
            services: {
                zeus: { url: "http://localhost:3012", status: "unknown" },
                slmo42: { url: "http://localhost:4001", status: "unknown" },
                mcpgaia: { url: "http://localhost:3003", status: "unknown" }
            },
            gran_indice: {
                entries: 0,
                discoveries: [],
                technical_learnings: [],
                architectural_insights: []
            }
        };
    }
    
    // 📊 Team Progress Methods
    updateTeamProgress(teamId, stepId, progress, materials = []) {
        if (!this.state.teams[teamId]) {
            console.error(`❌ Team ${teamId} not found`);
            return false;
        }
        
        this.state.teams[teamId].current_step = stepId;
        this.state.teams[teamId].progress = progress;
        
        // Update step materials if provided
        if (materials.length > 0 && this.state.steps[stepId - 1]) {
            this.state.steps[stepId - 1].learning_outcomes = materials;
        }
        
        console.log(`✅ Team ${teamId} progress updated: Step ${stepId}, ${progress}%`);
        this.saveState();
        return true;
    }
    
    // 📖 Story Step Methods
    updateStoryStep(stepId, status, materials = []) {
        const step = this.state.steps.find(s => s.id === stepId);
        if (!step) {
            console.error(`❌ Step ${stepId} not found`);
            return false;
        }
        
        step.status = status;
        step.progress = this.getProgressFromStatus(status);
        
        if (materials.length > 0) {
            step.learning_outcomes = materials;
        }
        
        // Update mission current step if this step is completed
        if (status === 'completed' && stepId === this.state.mission.currentStep) {
            this.state.mission.currentStep = Math.min(stepId + 1, this.state.mission.totalSteps);
        }
        
        console.log(`✅ Step ${stepId} updated to ${status}`);
        this.saveState();
        return true;
    }
    
    getProgressFromStatus(status) {
        const statusMap = {
            'not_started': 0,
            'in_progress': 50,
            'completed': 100
        };
        return statusMap[status] || 0;
    }
    
    // 📚 GRAN ÍNDICE Methods
    addToGranIndice(entry) {
        const granIndiceEntry = {
            id: this.state.gran_indice.entries + 1,
            timestamp: new Date().toISOString(),
            title: entry.title || 'Sin título',
            technical_detail: entry.technical_detail || '',
            learning: entry.learning || '',
            step_id: entry.step_id || this.state.mission.currentStep,
            team_id: entry.team_id || 'unknown'
        };
        
        this.state.gran_indice.entries++;
        this.state.gran_indice.discoveries.push(granIndiceEntry);
        
        if (entry.technical_detail) {
            this.state.gran_indice.technical_learnings.push(entry.technical_detail);
        }
        
        if (entry.architectural_insight) {
            this.state.gran_indice.architectural_insights.push(entry.architectural_insight);
        }
        
        console.log(`✅ GRAN ÍNDICE entry added: ${entry.title}`);
        this.saveState();
        return granIndiceEntry.id;
    }
    
    // 🔧 Service Status Methods
    updateServiceStatus(serviceName, status, lastCheck = null) {
        if (!this.state.services[serviceName]) {
            console.error(`❌ Service ${serviceName} not found`);
            return false;
        }
        
        this.state.services[serviceName].status = status;
        this.state.services[serviceName].last_check = lastCheck || new Date().toISOString();
        
        console.log(`✅ Service ${serviceName} status updated to ${status}`);
        this.saveState();
        return true;
    }
    
    async checkAllServices() {
        const services = Object.keys(this.state.services);
        
        for (const serviceName of services) {
            try {
                const service = this.state.services[serviceName];
                const response = await fetch(service.url + '/health', { 
                    timeout: 3000 
                });
                
                if (response.ok) {
                    this.updateServiceStatus(serviceName, 'online');
                } else {
                    this.updateServiceStatus(serviceName, 'offline');
                }
            } catch (error) {
                this.updateServiceStatus(serviceName, 'offline');
            }
        }
    }
    
    // 📈 Reporting Methods
    getProgressReport() {
        const totalSteps = this.state.mission.totalSteps;
        const completedSteps = this.state.steps.filter(s => s.status === 'completed').length;
        const inProgressSteps = this.state.steps.filter(s => s.status === 'in_progress').length;
        
        const teamProgress = Object.values(this.state.teams).map(team => ({
            name: team.name,
            step: team.current_step,
            progress: team.progress
        }));
        
        return {
            mission_progress: Math.round((completedSteps / totalSteps) * 100),
            completed_steps: completedSteps,
            in_progress_steps: inProgressSteps,
            remaining_steps: totalSteps - completedSteps - inProgressSteps,
            team_progress: teamProgress,
            gran_indice_entries: this.state.gran_indice.entries,
            services_online: Object.values(this.state.services).filter(s => s.status === 'online').length,
            last_update: this.state.mission.lastUpdate
        };
    }
    
    // 🎯 Mission Control Methods
    startMission() {
        this.state.mission.status = 'active';
        this.state.mission.startTime = new Date().toISOString();
        console.log('🚀 Mission started!');
        this.saveState();
    }
    
    completeMission() {
        this.state.mission.status = 'completed';
        this.state.mission.endTime = new Date().toISOString();
        console.log('🎉 Mission completed!');
        this.saveState();
    }
    
    resetMission() {
        this.initializeDefaultState();
        console.log('🔄 Mission reset to initial state');
        this.saveState();
    }
}

// 🎮 Command Line Interface
if (require.main === module) {
    const api = new MissionProgressAPI();
    const command = process.argv[2];
    const args = process.argv.slice(3);
    
    switch (command) {
        case 'team':
            // node update-progress.js team team_alpha 5 75 "Material aprendido 1,Material aprendido 2"
            const [teamId, stepId, progress, materials] = args;
            const materialsList = materials ? materials.split(',') : [];
            api.updateTeamProgress(teamId, parseInt(stepId), parseInt(progress), materialsList);
            break;
            
        case 'step':
            // node update-progress.js step 3 in_progress "Material 1,Material 2"
            const [stepNum, status, stepMaterials] = args;
            const stepMaterialsList = stepMaterials ? stepMaterials.split(',') : [];
            api.updateStoryStep(parseInt(stepNum), status, stepMaterialsList);
            break;
            
        case 'indice':
            // node update-progress.js indice "Zeus connection established" "HTTP REST proxy working" "node-llama-cpp optimization"
            const [title, technical, learning] = args;
            api.addToGranIndice({ title, technical_detail: technical, learning });
            break;
            
        case 'service':
            // node update-progress.js service zeus online
            const [serviceName, serviceStatus] = args;
            api.updateServiceStatus(serviceName, serviceStatus);
            break;
            
        case 'check':
            // node update-progress.js check
            api.checkAllServices();
            break;
            
        case 'report':
            // node update-progress.js report
            console.log('📊 Progress Report:');
            console.log(JSON.stringify(api.getProgressReport(), null, 2));
            break;
            
        case 'start':
            // node update-progress.js start
            api.startMission();
            break;
            
        case 'complete':
            // node update-progress.js complete
            api.completeMission();
            break;
            
        case 'reset':
            // node update-progress.js reset
            api.resetMission();
            break;
            
        default:
            console.log(`
🎭 Theater Oasis42 - Progress Update API

Usage:
  node update-progress.js <command> [arguments]

Commands:
  team <teamId> <stepId> <progress> [materials]     Update team progress
  step <stepId> <status> [materials]                Update story step status
  indice <title> [technical] [learning]            Add entry to GRAN ÍNDICE
  service <name> <status>                           Update service status
  check                                             Check all services
  report                                            Show progress report
  start                                             Start mission
  complete                                          Complete mission
  reset                                             Reset to initial state

Examples:
  node update-progress.js team team_alpha 5 75 "Express routing,MCP integration"
  node update-progress.js step 3 in_progress "Isaac learns navigation"
  node update-progress.js indice "Zeus found" "Port 3012 active" "HyperAxe templates"
  node update-progress.js service zeus online
            `);
    }
}

module.exports = MissionProgressAPI;