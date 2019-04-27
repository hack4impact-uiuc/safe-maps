const host = "https://cut-to-the-case.now.sh";

async function getEndpoint(endPoint, dataKey) {
  try {
    let response = await fetch(host + "/" + endPoint);
    let responseJson = await response.json();
    return dataKey === "" || responseJson.success === false
      ? responseJson.result
      : responseJson.result[dataKey];
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

async function getTip(id) {
  return getEndpoint(`tips/${id}`, "");
}

async function getTipsNearby(lat, long) {
  return getEndpoint(`tips?lat=${lat}&long=${long}`, "tips");
}

async function getTipsFromUser(user_id) {
  return getEndpoint(`user/${user_id}/tips`, "tips");
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

async function getVerifiedTipsByUser(id) {
  return getEndpoint(`tips/verified?id=${id}`, "verified_tips");
}

async function getPendingTipsByUser(id) {
  return getEndpoint(`tips/pending?id=${id}`, "pending_tips");
}

async function getDeniedTipsByUser(id) {
  return getEndpoint(`tips/denied?id=${id}`, "denied_tips");
}

async function editTip(id, data) {
  return putEndpoint(`tips/${id}`, data);
}

async function updateStatus(id, data) {
  return putEndpoint(`tips/${id}/status`, data);
}

async function voteTip(data) {
  return putEndpoint("tips_votes", data);
}

async function deleteTip(id) {
  return deleteEndpoint(`tips/${id}`);
}

async function getUsers() {
  return getEndpoint("users", "users");
}

async function getUser(id) {
  return getEndpoint(`users/${id}`, "");
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
  deleteTip
};
