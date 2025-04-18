document.addEventListener('DOMContentLoaded', function() {
    // Update time display
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('timeDisplay').textContent = `${hours}:${minutes}`;
    }
    
    updateTime();
    setInterval(updateTime, 60000);
    
    // Initialize CPU chart
    const ctx = document.getElementById('cpuChart').getContext('2d');
    const cpuChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 30}, (_, i) => i + 1),
            datasets: [{
                label: 'CPU Load %',
                data: Array(30).fill(0).map(() => Math.random() * 0.2),
                borderColor: '#4a90e2',
                backgroundColor: 'rgba(74, 144, 226, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 0.5,
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(2) + '%';
                        }
                    }
                },
                x: {
                    display: false
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Simulate updating data
    setInterval(() => {
        const newData = cpuChart.data.datasets[0].data.slice(1);
        newData.push(Math.random() * 0.2);
        cpuChart.data.datasets[0].data = newData;
        cpuChart.update();
        
        // Update other stats randomly
        document.getElementById('cpuLoad').textContent = `${(Math.random() * 0.1).toFixed(2)}% / ∞`;
        document.getElementById('cpuLoadDetailed').textContent = `${(Math.random() * 0.1).toFixed(2)}%`;
    }, 2000);
    
    // Command input handling
    const commandInput = document.getElementById('commandInput');
    const terminalOutput = document.getElementById('terminalOutput');
    
    commandInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            if (command) {
                // Add command to output
                addTerminalLine(`$ ${command}`);
                
                // Process command
                processCommand(command);
                
                // Clear input
                commandInput.value = '';
            }
        }
    });
    
    function addTerminalLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function processCommand(command) {
        // Simulate command processing
        setTimeout(() => {
            if (command === 'help') {
                addTerminalLine('Available commands: status, update, restart, help');
            } else if (command === 'status') {
                addTerminalLine('Server status: OK');
                addTerminalLine('Uptime: 14h 2m 45s');
                addTerminalLine('Load: 0.06%');
            } else if (command === 'update') {
                addTerminalLine('Updating server packages...');
                addTerminalLine('[notice] A new release of pip is available: 24.3.1 -> 25.0.1', 'notice');
                addTerminalLine('Update complete');
            } else if (command === 'restart') {
                addTerminalLine('Restarting server...', 'warning');
                addTerminalLine('Server restarted successfully', 'success');
            } else {
                addTerminalLine(`Command not found: ${command}`, 'error');
            }
        }, 500);
    }
    
    // Fetch real data from server
    fetchServerData();
    
    function fetchServerData() {
        // In a real app, this would fetch from your backend API
        // For now, we'll simulate it with random data
        setTimeout(() => {
            const uptimeHours = Math.floor(Math.random() * 24);
            const uptimeMinutes = Math.floor(Math.random() * 60);
            document.getElementById('uptime').textContent = `${uptimeHours}h ${uptimeMinutes}m ${Math.floor(Math.random() * 60)}s`;
            
            const memoryUsed = (100 + Math.random() * 50).toFixed(2);
            document.getElementById('memory').textContent = `${memoryUsed} MiB / 1.95 GiB`;
            
            const diskUsed = (15 + Math.random() * 10).toFixed(2);
            document.getElementById('disk').textContent = `${diskUsed} MiB / 5.12 GiB`;
            
            const networkIn = (5 + Math.random() * 10).toFixed(2);
            document.getElementById('networkIn').textContent = `${networkIn} MiB`;
            
            const networkOut = (2 + Math.random() * 8).toFixed(2);
            document.getElementById('networkOut').textContent = `${networkOut} MiB`;
            
            // Schedule next update
            setTimeout(fetchServerData, 5000);
        }, 1000);
    }
});