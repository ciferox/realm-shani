const {
    std: { path },
    util
} = adone;

const jsProcessContainerPath = path.resolve(__dirname, "process_container.js");

export const fork = (script, args = [], opts = {}) => {
    return adone.process.exec(process.execPath, [
        ...process.execArgv,
        jsProcessContainerPath,
        ...args
    ], util.assignDeep(opts, {
        env: {
            ADONE_REQUIRE_PATH: script,
            ADONE_ROOT_PATH: adone.cwd
        }
    }));
};

export const forkSync = (script, args = [], opts = {}) => {
    return adone.process.execSync(process.execPath, [
        ...process.execArgv,
        jsProcessContainerPath,
        ...args
    ], util.assignDeep(opts, {
        env: {
            ADONE_REQUIRE_PATH: script,
            ADONE_ROOT_PATH: adone.cwd
        }
    }));
};

export const bindFork = (cwd) => (script, args, opts) => fork(path.resolve(cwd, script), args, opts);

export const bindForkSync = (cwd) => (script, args, opts) => forkSync(path.resolve(cwd, script), args, opts);
