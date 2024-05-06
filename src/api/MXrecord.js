const dns = require('dns');
const mxRecords = new Map();



async function getMXrecord(domain) {
    function getMxRecord(domain) {
        return new Promise((resolve, reject) => {
            dns.resolveMx(domain, (err, addresses) => {
                if (err) {
                    reject(err);
                } else {
                    let highestPrio = addresses[0];
                    
                    addresses.forEach((mxRecord) => {
                        if (mxRecord.priority < highestPrio.priority) {
                            highestPrio = mxRecord;
                        }
                    });
                    resolve(highestPrio.exchange);
                }
            });
        });
    }
    if (!mxRecords.has(domain)) {
        const mx = await getMxRecord(domain);
        if (mx) {
            mxRecords.set(domain, mx);
        }
        return mx;
    } else {
        return mxRecords.get(domain);
    }
   }


   module.exports = getMXrecord;