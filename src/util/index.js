const util = {
    killProcess: function(pid) {
        if (/^win/.test(process.platform)) {
            child_process.spawn("taskkill", ["/PID", pid, "/T", "/F"])
        } else {
            process.kill(-pid, 'SIGTERM')
        }
    }
}

export default util;