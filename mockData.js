export function isDevelopmentMode() {
    return true;
}

export const mockOrders = [
    {
        "id": 1001,
        "itemsCount": 51,
        "priceComposition": {
            "total": {
                "amount": 3637.39,
                "currency": "CZK"
            }
        },
        "orderTime": "2024-10-18T13:50:44.000+0200",
    },
    {
        "id": 1002,
        "itemsCount": 26,
        "priceComposition": {
            "total": {
                "amount": 1605.17,
                "currency": "CZK"
            }
        },
        "orderTime": "2024-10-07T15:26:53.000+0200",
    },
    {
        "id": 1003,
        "itemsCount": 26,
        "priceComposition": {
            "total": {
                "amount": 1605.17,
                "currency": "CZK"
            }
        },
        "orderTime": "2024-10-12T15:26:53.000+0200",
    }
];

export const mockOrderDetails = {
    1001: {
        "id": 1001,
        "itemsCount": 51,
        "priceComposition": {
            "total": {
                "amount": 3637.39,
                "currency": "CZK"
            },
            "goods": {
                "amount": 3637.39,
                "currency": "CZK"
            },
            "delivery": {
                "amount": 0.00,
                "currency": "CZK"
            },
            "creditsUsed": {
                "amount": 0.00,
                "currency": "CZK"
            },
            "courierTip": {
                "amount": 0.00,
                "currency": "CZK"
            },
            "fines": {
                "amount": 0.00,
                "currency": "CZK"
            },
            "reusableBagsDeposit": {
                "amount": 0.00,
                "currency": "CZK"
            }
        },
        "orderTime": "22024-10-18T13:50:44.000+0200",
        "state": "DELIVERED",
        "items": [
            {
                "name": "Pór čerstvý 1 ks",
                "unit": "kg",
                "textualAmount": "250 g",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/709615/709615-1502714273.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 24.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 24.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 709615
            },
            {
                "name": "Kinder Chocolate tyčinky z mléčné čokolády s mléčnou náplní",
                "unit": "kg",
                "textualAmount": "100 g",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/824169/824169-1554725303.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 39.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 39.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 824169
            },
            {
                "name": "Maille Originální dijonská hořčice",
                "unit": "l",
                "textualAmount": "200 ml",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/962175/962175-1534407265.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 89.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 89.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 962175
            },
            {
                "name": "Dobroty Babičky Kláry Játrové knedlíčky",
                "unit": "kg",
                "textualAmount": "300 g",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/1287739/1287739-1455524304.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 41.31,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 41.31,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 1287739
            },
            {
                "name": "Figaro Čokoláda na vaření hořká",
                "unit": "kg",
                "textualAmount": "90 g",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/1294167/1294167-1668172082691.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 31.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 31.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 1294167
            },
            {
                "name": "Okurka hadovka (cca 300 g)",
                "unit": "ks",
                "textualAmount": "1 ks",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/1294559/1294559-1599144049.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 25.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 25.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 1294559
            },
            {
                "name": "Pearl River Bridge Sójová omáčka světlá",
                "unit": "l",
                "textualAmount": "150 ml",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/1296127/1296127-1436347586.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 29.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 29.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 1296127
            },
            {
                "name": "Rajčata cherry na větvičce, vanička",
                "unit": "kg",
                "textualAmount": "500 g",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/1296929/1296929-1482842956.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 79.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 79.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 1296929
            },
        ]
    },
    1002: {
        "id": 1002,
        "itemsCount": 26,
        "priceComposition": {
            "total": {
                "amount": 1605.17,
                "currency": "CZK"
            }
        },
        "orderTime": "2024-10-07T15:26:53.000+0200",
        "state": "DELIVERED",
        "items": [
            {
                "name": "Pór čerstvý 1 ks",
                "unit": "kg",
                "textualAmount": "250 g",
                "amount": 10,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/709615/709615-1502714273.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 249.00,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 24.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 709615
            },
            {
                "name": "Kinder Chocolate tyčinky z mléčné čokolády s mléčnou náplní",
                "unit": "kg",
                "textualAmount": "100 g",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/824169/824169-1554725303.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 39.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 39.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 824169
            },
            {
                "name": "Maille Originální dijonská hořčice",
                "unit": "l",
                "textualAmount": "200 ml",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/962175/962175-1534407265.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 89.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 89.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 962175
            },
        ]
    },
    1003: {
        "id": 1003,
        "itemsCount": 26,
        "priceComposition": {
            "total": {
                "amount": 1605.17,
                "currency": "CZK"
            }
        },
        "orderTime": "2024-10-12T15:26:53.000+0200",
        "state": "DELIVERED",
        "items": [
            {
                "name": "Pór čerstvý 1 ks",
                "unit": "kg",
                "textualAmount": "250 g",
                "amount": 10,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/709615/709615-1502714273.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 249.00,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 24.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 709615
            },
            {
                "name": "Kinder Chocolate tyčinky z mléčné čokolády s mléčnou náplní",
                "unit": "kg",
                "textualAmount": "100 g",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/824169/824169-1554725303.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 39.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 39.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 824169
            },
            {
                "name": "Maille Originální dijonská hořčice",
                "unit": "l",
                "textualAmount": "200 ml",
                "amount": 1,
                "images": [
                    "https://cdn.rohlik.cz/images/grocery/products/962175/962175-1534407265.jpg"
                ],
                "priceComposition": {
                    "total": {
                        "amount": 89.90,
                        "currency": "CZK"
                    },
                    "unit": {
                        "amount": 89.90,
                        "currency": "CZK"
                    }
                },
                "compensated": false,
                "id": 962175
            },
        ]
    }
};

// https://www.rohlik.cz/api/v1/products/709615/categories
export const mockProductCategory = {
    "productId": 709615,
    "categories": [
        {
            "id": 300102000,
            "type": "normal",
            "name": "Ovoce a zelenina",
            "slug": "ovoce-a-zelenina",
            "level": 0
        },
        {
            "id": 300102008,
            "type": "normal",
            "name": "Zelenina",
            "slug": "zelenina",
            "level": 1
        },
        {
            "id": 300102010,
            "type": "normal",
            "name": "Cibule, česnek a pórek",
            "slug": "cibule-cesnek-a-porek",
            "level": 2
        },
        {
            "id": 300117577,
            "type": "normal",
            "name": "Česnek a pórek",
            "slug": "cesnek-a-porek",
            "level": 3
        }
    ]
};