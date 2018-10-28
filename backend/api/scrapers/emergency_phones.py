import requests
import json

phones = [
    {"latitude": 40.0957696644812, "longitude": -88.2405983758263, "id": 0},
    {"latitude": 40.108900829088, "longitude": -88.230672676274, "id": 1},
    {"latitude": 40.108153502015, "longitude": -88.2312650782796, "id": 2},
    {"latitude": 40.1062696203638, "longitude": -88.227582555629, "id": 3},
    {"latitude": 40.1053064152121, "longitude": -88.2332534323185, "id": 4},
    {"latitude": 40.1040484113017, "longitude": -88.2305198505348, "id": 5},
    {"latitude": 40.1011685523957, "longitude": -88.2200390954902, "id": 6},
    {"latitude": 40.0963186128832, "longitude": -88.2255865263258, "id": 7},
    {"latitude": 40.1153308841568, "longitude": -88.223901994968, "id": 8},
    {"latitude": 40.1155293305783, "longitude": -88.2241735309661, "id": 9},
    {"latitude": 40.1154860226732, "longitude": -88.2255966171525, "id": 10},
    {"latitude": 40.1152541099075, "longitude": -88.2269993612424, "id": 11},
    {"latitude": 40.1144443737128, "longitude": -88.2275677301718, "id": 12},
    {"latitude": 40.1136422885451, "longitude": -88.2271974078571, "id": 13},
    {"latitude": 40.1144351814401, "longitude": -88.2255421958797, "id": 14},
    {"latitude": 40.1145134460554, "longitude": -88.2249901437491, "id": 15},
    {"latitude": 40.1134327604323, "longitude": -88.2250744675027, "id": 16},
    {"latitude": 40.1126178627756, "longitude": -88.2257416048253, "id": 17},
    {"latitude": 40.1128212996944, "longitude": -88.2271199654827, "id": 18},
    {"latitude": 40.111594063769, "longitude": -88.2276790695158, "id": 19},
    {"latitude": 40.1115161572726, "longitude": -88.2257198928538, "id": 20},
    {"latitude": 40.112021993743, "longitude": -88.2238296363227, "id": 21},
    {"latitude": 40.1106590345767, "longitude": -88.2225725436292, "id": 22},
    {"latitude": 40.1114123952184, "longitude": -88.2298200454636, "id": 23},
    {"latitude": 40.1088889776135, "longitude": -88.227875549103, "id": 24},
    {"latitude": 40.1085582367152, "longitude": -88.2290291258499, "id": 25},
    {"latitude": 40.1088065061748, "longitude": -88.2257239688097, "id": 26},
    {"latitude": 40.1064903286909, "longitude": -88.2256433940492, "id": 27},
    {"latitude": 40.1053429588434, "longitude": -88.2268047853007, "id": 28},
    {"latitude": 40.1053277643859, "longitude": -88.2249452207195, "id": 29},
    {"latitude": 40.1060329957132, "longitude": -88.2248572858256, "id": 30},
    {"latitude": 40.1079601489434, "longitude": -88.2244923651701, "id": 31},
    {"latitude": 40.1042672981332, "longitude": -88.2239993835787, "id": 32},
    {"latitude": 40.1053088556378, "longitude": -88.2214299304216, "id": 33},
    {"latitude": 40.1071095282756, "longitude": -88.2206559952995, "id": 34},
    {"latitude": 40.1081201551601, "longitude": -88.2214139121197, "id": 35},
    {"latitude": 40.1091413296473, "longitude": -88.2202056480429, "id": 36},
    {"latitude": 40.1030720915384, "longitude": -88.2280244527834, "id": 37},
    {"latitude": 40.1038525703531, "longitude": -88.2291399902866, "id": 38},
    {"latitude": 40.1013729107359, "longitude": -88.2278757999843, "id": 39},
    {"latitude": 40.1026185952179, "longitude": -88.2255039661024, "id": 40},
    {"latitude": 40.1030785755548, "longitude": -88.2246681930938, "id": 41},
    {"latitude": 40.1034825199358, "longitude": -88.222604152514, "id": 42},
    {"latitude": 40.1034837688445, "longitude": -88.2217432022013, "id": 43},
    {"latitude": 40.1023221286569, "longitude": -88.2209867723194, "id": 44},
    {"latitude": 40.1024538925846, "longitude": -88.2192835508928, "id": 45},
    {"latitude": 40.1016051630037, "longitude": -88.220458668589, "id": 46},
    {"latitude": 40.1014484580189, "longitude": -88.2217086955956, "id": 47},
    {"latitude": 40.1007446592364, "longitude": -88.2229730766282, "id": 48},
    {"latitude": 40.0979028839245, "longitude": -88.221126021137, "id": 49},
    {"latitude": 40.092248279751, "longitude": -88.2207073420187, "id": 50},
    {"latitude": 40.0923324893079, "longitude": -88.2217349916905, "id": 51},
    {"latitude": 40.0941606201313, "longitude": -88.2278288347549, "id": 52},
    {"latitude": 40.0957493753066, "longitude": -88.2276495295863, "id": 53},
    {"latitude": 40.0962802725601, "longitude": -88.2282206081218, "id": 54},
    {"latitude": 40.0951450620077, "longitude": -88.2320469284582, "id": 55},
    {"latitude": 40.0968980603088, "longitude": -88.2396824215302, "id": 56},
    {"latitude": 40.1011025875766, "longitude": -88.2387259850278, "id": 57},
    {"latitude": 40.1036694056589, "longitude": -88.2416724682162, "id": 58},
    {"latitude": 40.1079794065974, "longitude": -88.2416733651927, "id": 59},
    {"latitude": 40.1029977057437, "longitude": -88.2343605660361, "id": 60},
    {"latitude": 40.1015535758818, "longitude": -88.2335256439096, "id": 61},
    {"latitude": 40.1040576884692, "longitude": -88.2315614763865, "id": 62},
    {"latitude": 40.1028314113639, "longitude": -88.2301199128279, "id": 63},
    {"latitude": 40.1006436158821, "longitude": -88.2299843043262, "id": 64},
    {"latitude": 40.1067122819879, "longitude": -88.2304362253203, "id": 65},
    {"latitude": 40.1080527825068, "longitude": -88.231199475882, "id": 66},
    {"latitude": 40.10917256217, "longitude": -88.2298553902326, "id": 67},
]


def get_phones():
    return phones