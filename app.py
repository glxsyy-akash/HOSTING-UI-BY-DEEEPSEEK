from flask import Flask, render_template, jsonify
import time
import random
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/status')
def get_status():
    # Simulate server status data
    current_time = datetime.now().strftime('%H:%M')
    uptime_seconds = random.randint(3600, 86400)  # 1-24 hours
    uptime_h = uptime_seconds // 3600
    uptime_m = (uptime_seconds % 3600) // 60
    uptime_s = uptime_seconds % 60
    
    return jsonify({
        'time': current_time,
        'server_address': 'pnode-01.rhosting.eu:7808',
        'uptime': f'{uptime_h}h {uptime_m}m {uptime_s}s',
        'cpu_load': f'{random.uniform(0.01, 0.1):.2f}% / ∞',
        'memory': f'{random.uniform(20, 40):.2f} MiB / 1.95 GiB',
        'disk': f'{random.uniform(15, 25):.2f} MiB / 5.12 GiB',
        'network_in': f'{random.uniform(5, 10):.2f} MiB',
        'network_out': f'{random.uniform(3, 8):.2f} MiB',
        'cpu_load_detailed': f'{random.uniform(0.01, 0.1):.2f}%'
    })

if __name__ == '__main__':
    app.run(debug=True)