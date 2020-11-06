function requestToJson(obj){
    let skipKeys = ['SOCKET', 'CLIENT', 'CONNECTION', 'RES', 'REQ']
    let data = {};
    Object.keys(obj).forEach(key =>
        skipKeys.includes(key.toUpperCase()) ? null: data[key] = obj    [key])
    return JSON.stringify({...data}, undefined, 2);
}


function getHtmlOutput(str){
    return str.split("\n").join("<br/>");
}

module.exports = {
    requestToJson,
    getHtmlOutput
}