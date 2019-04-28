import { AsyncStorage } from "react-native";
const host = "https://cut-to-the-case.now.sh";
const auth_server_host = "https://cut-to-the-case.now.sh"

async function getEndpoint(endPoint, dataKey, additonal_headers=null) {
  try {
    let headers = { ... additonal_headers, "Content-Type": "application/json" }
    let response = await fetch(host + "/" + endPoint, {
      method: "GET",
      headers
    });
    let responseJson = await response.json();
    return dataKey === "" || responseJson.success === false
      ? responseJson.result
      : responseJson.result[dataKey];
  } catch (error) {
    console.error(error);
  }
}

async function postEndpoint(endPoint, data, additonal_headers=null) {
  try {
    let headers = { ... additonal_headers, "Content-Type": "application/json" }
    let response = await fetch(host + "/" + endPoint, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    let responseJson = await response.json();
    return responseJson.result;
  } catch (error) {
    console.error(error);
  }
}

async function putEndpoint(endPoint, data, additonal_headers=null) {
  try {
    let headers = { ... additonal_headers, "Content-Type": "application/json" }
    let response = await fetch(host + "/" + endPoint, {
      method: "PUT",
      headers,
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

async function postToAuthServer(endPoint, data, additonal_headers=null){
  console.log("postToAuthServer");
  try {
    let headers = { ... additonal_headers, "Content-Type": "application/json" }
    let response = await fetch(auth_server_host + "/" + endPoint, {
      method: "POST",
      headers,
      body: JSON.stringify(data)
    });
    let responseJson = await response.json();
    console.log("responseJson");
    console.log(responseJson);
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

async function registerNewUser(email, password, username){
  let anon = true;
  let role = "student";
  return postToAuthServer("register", { email, password, anon, username, role});
}

async function login(email, password){
  return postToAuthServer("login", { email, password });
}

async function verifyPin(pin){
  let token = await AsyncStorage.getItem("token");
  return postToAuthServer("verifyEmail", { pin }, { token });
}

async function createTip(data) {
  let token = await AsyncStorage.getItem("token");
  return postEndpoint("tips", data, { token });
}

async function getTips() {
  return getEndpoint("tips", "tips");
}

async function getTip(id) {
  return getEndpoint(`tips/${id}`, "");
}

async function getTipsNearby(lat, long) {
  return getEndpoint(`tips?lat=${lat}&long=${long}`, "tips");
}

async function getTipsFromUser(token) {
  return getEndpoint(`user/tips`, "tips", { token });
}

async function getTipsFromCategory(category) {
  return getEndpoint(`tips_category/${category}`, "tips");
}

async function getUserUpvotes(tips_id) {
  return getEndpoint(`tips_upvotes/${tips_id}`, "users");
}

async function getUserDownvotes(tips_id) {
  return getEndpoint(`tips_downvotes/${tips_id}`, "users");
}

async function getVerifiedTips() {
  return getEndpoint("tips/verified", "verified_tips");
}

async function getPendingTips() {
  return getEndpoint("tips/pending", "pending_tips");
}

async function getDeniedTips() {
  return getEndpoint("tips/denied", "denied_tips");
}

async function getVerifiedTipsByUser(token) {
  return getEndpoint(`tips/verified`, "verified_tips", { token });
}

async function getPendingTipsByUser(token) {
  return getEndpoint(`tips/pending`, "pending_tips", { token });
}

async function getDeniedTipsByUser(token) {
  return getEndpoint(`tips/denied`, "denied_tips", { token });
}

async function editTip(id, data) {
  return putEndpoint(`tips/${id}`, data);
}

async function updateStatus(id, data) {
  return putEndpoint(`tips/${id}/status`, data);
}

async function voteTip(data, token) {
  return putEndpoint("tips_votes", data, { token });
}

async function deleteTip(id) {
  return deleteEndpoint(`tips/${id}`);
}

async function getUsers() {
  return getEndpoint("users", "users");
}

async function getUser(token) {
  return getEndpoint("userinfo", "", { token });
}

async function createUser(data) {
  return postEndpoint("users", data);
}

async function updateUser(token, data) {
  return putEndpoint(`users`, data, { token });
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
  getTip,
  getTipsNearby,
  createTip,
  getTipsFromUser,
  getTipsFromCategory,
  getUserUpvotes,
  getUserDownvotes,
  getVerifiedTips,
  getPendingTips,
  getDeniedTips,
  getVerifiedTipsByUser,
  getPendingTipsByUser,
  getDeniedTipsByUser,
  editTip,
  updateStatus,
  voteTip,
  deleteTip,
  registerNewUser,
  login,
  verifyPin
};
