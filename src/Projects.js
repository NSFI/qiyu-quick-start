function getBasePath(projectId) {
    return window.localStorage.getItem('project-path-' + projectId);
}

const Projects = [{
    id: 'visitor',
    name: '访客端',
    basePath: getBasePath('visitor'),
    neiPath: 'nei.10731.a8daca0dfdf4eb1d7b1f1024c605c9e5',
    envType: '',
    tasks: [{
        name: 'nei',
        cmd: 'nei server',
        rpath: '',
        pid: null,
        logs: []
    }, {
        name: 'mcss',
        cmd: 'mcss -w 1',
        rpath: 'src/main/webapp/',
        pid: null,
        logs: []
    }]
}, {
    id: 'kefu',
    name: '客服端',
    basePath: getBasePath('kefu'),
    neiPath: 'nei.10680.b3d1a5bda566b026a5c9ff97aee94c72',
    envType: '',
    tasks: [{
        name: 'nei',
        cmd: 'nei server -k b3d1a5bda566b026a5c9ff97aee94c72',
        rpath: '',
        pid: null,
        logs: []
    }, {
        name: 'mcss',
        cmd: 'mcss -c mcssflex.json -w 1',
        rpath: 'src/main/webapp/',
        pid: null,
        logs: []
    }]
}]

module.exports = Projects;