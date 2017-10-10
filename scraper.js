/**
 * Created by Ran on 12-Oct-17.
 */
var request = require('request');

/* Scrapes proxies from free-proxy-list.net, pageNum & proxiesScraped are optional */
var getProxies = function(callback) {

    proxiesScraped = {};

    request('https://free-proxy-list.net/', function(err, res, body) {
        if (!res || res.statusCode != 200) {
            callback("Response code was not 200");
            return;
        }

        var ips = [];
        var ports = [];

        body.replace(/<td>([0-9]{2,})<\/td>/g, function() {
            ports.push(arguments[1])
        });

        body.replace(/>([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/g, function() {
            ips.push(arguments[1])
        });
        var count = 0;

        if (ports.length == 0 || ports.length != ips.length) {
            callback("Regex parsing has failed.");
            return;
        }

        for (var i = 0; i < ips.length; i++) {
            count++;
            proxiesScraped[ips[i]] = ports[i];
        }

        console.log('Collected ' + count + ' http proxies');
        callback(null, proxiesScraped)

    })
};

module.exports = { getProxies: getProxies };