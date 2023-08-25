let moduleMap = {
'src/assets/syyx_sdk/syyxh5frameworksdk.js' () { return require('src/assets/syyx_sdk/syyxh5frameworksdk.js') },
'assets/internal/index.js' () { return require('assets/internal/index.js') },
'assets/sp_others/index.js' () { return require('assets/sp_others/index.js') },
// tail
};

window.__cocos_require__ = function (moduleName) {
    let func = moduleMap[moduleName];
    if (!func) {
        throw new Error(`cannot find module ${moduleName}`);
    }
    return func();
};