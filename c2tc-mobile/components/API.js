const host = "https://cut-to-the-case.now.sh";

async function getEndpoint(endPoint, dataKey) {
  try {
    let response = await fetch(host + "/" + endPoint);
    let responseJson = await response.json();
    return responseJson.result[dataKey];
  } catch (error) {
    console.error(error);
  }
}

async function postEndpoint(endPoint, data) {
  try {
    let response = await fetch(host + "/" + endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let responseJson = await response.json();
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
}

async function putEndpoint(endPoint, data) {
  try {
    let response = await fetch(host + "/" + endPoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let responseJson = await response.json();
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
}

async function deleteEndpoint(endPoint) {
  try {
    let response = await fetch(host + "/" + endPoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    let responseJson = await response.json();
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
}
async function createTip(data) {
  return postEndpoint("tips", data);
}
async function getTips() {
  return getEndpoint("tips", "tips");
}

async function getUsers() {
  return getEndpoint("users", "users");
}

async function getUser(id) {
  return getEndpoint(`users/${id}`, "user");
}

async function createUser(data) {
  return postEndpoint("users", data);
}

async function updateUser(id, data) {
  return putEndpoint(`users/${id}`, data);
}

async function deleteUser(id) {
  return deleteEndpoint(`users/${id}`);
}

async function getBusStops() {
  return getEndpoint("bus-stops", "busStops");
}

async function getCrimes() {
  return getEndpoint("crimes", "crimes");
}

async function getBusinesses() {
  return getEndpoint("businesses", "businesses");
}

async function getEmergencyPhones() {
  return getEndpoint("emergency-phones", "emergencyPhones");
}

async function getPoliceStations() {
  return getEndpoint("police-stations", "policeStations");
}

async function getStreetLight() {
  return getEndpoint("streetlights", "streetlights");
}

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getPoliceStations,
  getBusStops,
  getCrimes,
  getBusinesses,
  getEmergencyPhones,
  getStreetLight,
  getTips,
  createTip
};
