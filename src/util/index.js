import child_process from 'child_process';

const util = {
    killProcess: function(pid) {
        if (/^win/.test(process.platform)) {
            child_process.spawnSync("taskkill", ["/PID", pid, "/T", "/F"])
        } else {
            process.kill(-pid, 'SIGTERM')
        }
    }
}

export default util;