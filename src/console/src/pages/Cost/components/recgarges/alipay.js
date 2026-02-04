import React, { useMemo, useState } from 'react';
var QRCode = require("qrcode-svg");

function useAlipay(options) {

    const [codeOptions, setCodeOptions] = useState(Object.assign({}, {
        padding: 4,
        width: 256,
        height: 256,
        color: "#000000",
        background: "#ffffff",
        ecl: "M",
    }, { ...options }));

    const useQrcode= (code, callback) => useMemo(() => {
        var qrcode = new QRCode({
            content: code,
            ...codeOptions
        });
        qrcode.save("sample.svg", function (error) {
            if (error) throw error;
            console.log("Done!");
        });
    }, [codeKye]);

    return useQrcode
}

export { useAlipay }