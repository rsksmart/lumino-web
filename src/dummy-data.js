export const luminoData = {
    tokens: [
        {
            name: 'Infuy Token',
            balance: 120,
            fiat: 100,
            symbol: 'INF',
            address: '0x1408f5…..a6ca4b6f9',
        },
        {
            name: 'Rif Token',
            balance: 20,
            fiat: 200,
            symbol: 'RIF',
            address: '0x2043x1…..b5zq1b8e8',
        },
        {
            name: 'Zircontech Token',
            balance: 10,
            fiat: 50,
            symbol: 'ZTE',
            address: '0x9080a2…..f6re2s0x2',
        },
        {
            name: 'Pixel Token',
            balance: 18,
            fiat: 520,
            symbol: 'PXL',
            address: '0x1241u8…..n1it7v9v9',
        },
    ],

    channels: [
        {
            id: 143,
            balance: 120,
            address: '0x1408f5…..a6ca4b6f9',
            state: 'Opened',
        },
        {
            id: 371,
            balance: 20,
            address: '0x2043x1…..b5zq1b8e8',
            state: 'Closed',
        },
        {
            id: 682,
            balance: 10,
            address: '0x9080a2…..f6re2s0x2',
            state: 'Waiting for Close',
        },
    ],

    payments: {
        paymentReceived: [
            {
                "identifier": 13906316539898125218,
                "event": "EventPaymentReceivedSuccess",
                "amount": 100000000000000,
                "initiator": "0x15fA026eb6CD51dc76e9434dC74Fa52e768Bcc9c",
                "log_time": "2019-03-20T19:00:21.733"
            },
            {
                "identifier": 9761173779551624375,
                "event": "EventPaymentReceivedSuccess",
                "amount": 100000000000000,
                "initiator": "0x15fA026eb6CD51dc76e9434dC74Fa52e768Bcc9c",
                "log_time": "2019-03-20T19:00:22.352"
            },
            {
                "identifier": 2828430260273611673,
                "event": "EventPaymentReceivedSuccess",
                "amount": 100000000000000,
                "initiator": "0x15fA026eb6CD51dc76e9434dC74Fa52e768Bcc9c",
                "log_time": "2019-03-20T19:01:05.795"
            },
        ],

        paymentSent: [
            {
                "log_time": "2019-03-20T17:04:32.440",
                "event": "EventPaymentSentFailed",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "reason": "lock expired"
            },
            {
                "log_time": "2019-03-20T17:04:32.440",
                "event": "EventPaymentSentFailed",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "reason": "lock expired"
            },
            {
                "log_time": "2019-03-20T17:45:24.835",
                "event": "EventPaymentSentSuccess",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "identifier": 2000033236172752884,
                "amount": 100000000000000
            },
            {
                "log_time": "2019-03-20T17:45:25.231",
                "event": "EventPaymentSentSuccess",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "identifier": 11993466807028563357,
                "amount": 100000000000000
            },
            {
                "log_time": "2019-03-20T17:45:25.350",
                "event": "EventPaymentSentSuccess",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "identifier": 13929910074508679668,
                "amount": 100000000000000
            },
        ],

        allPayments:[
            {
                "log_time": "2019-03-20T17:04:32.440",
                "event": "EventPaymentSentFailed",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "reason": "lock expired"
            },
            {
                "log_time": "2019-03-20T17:04:32.440",
                "event": "EventPaymentSentFailed",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "reason": "lock expired"
            },
            {
                "log_time": "2019-03-20T17:45:24.835",
                "event": "EventPaymentSentSuccess",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "identifier": 2000033236172752884,
                "amount": 100000000000000
            },
            {
                "log_time": "2019-03-20T17:45:25.231",
                "event": "EventPaymentSentSuccess",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "identifier": 11993466807028563357,
                "amount": 100000000000000
            },
            {
                "log_time": "2019-03-20T17:45:25.350",
                "event": "EventPaymentSentSuccess",
                "target": "0x68EC2b76925e3d2ece474ED5c39a11DbA16C5BAF",
                "identifier": 13929910074508679668,
                "amount": 100000000000000
            },
            {
                "identifier": 13906316539898125218,
                "event": "EventPaymentReceivedSuccess",
                "amount": 100000000000000,
                "initiator": "0x15fA026eb6CD51dc76e9434dC74Fa52e768Bcc9c",
                "log_time": "2019-03-20T19:00:21.733"
            },
            {
                "identifier": 9761173779551624375,
                "event": "EventPaymentReceivedSuccess",
                "amount": 100000000000000,
                "initiator": "0x15fA026eb6CD51dc76e9434dC74Fa52e768Bcc9c",
                "log_time": "2019-03-20T19:00:22.352"
            },
            {
                "identifier": 2828430260273611673,
                "event": "EventPaymentReceivedSuccess",
                "amount": 100000000000000,
                "initiator": "0x15fA026eb6CD51dc76e9434dC74Fa52e768Bcc9c",
                "log_time": "2019-03-20T19:01:05.795"
            },
        ]
    }
}