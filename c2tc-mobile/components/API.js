async function getBusStops() {
  try {
    let response = await fetch("https://cut-to-the-case.now.sh/bus-stops");
    let responseJson = await response.json();
    return responseJson.result.busStops;
  } catch (error) {
    console.error(error);
  }
}

async function getCrimes() {
  try {
    let response = await fetch("https://cut-to-the-case.now.sh/crimes");
    let responseJson = await response.json();
    return responseJson.result.crimes;
  } catch (error) {
    console.error(error);
  }
}

async function getBusinesses() {
  try {
    let response = await fetch("https://cut-to-the-case.now.sh/businesses");
    let responseJson = await response.json();
    return responseJson.result.businesses;
  } catch (error) {
    console.error(error);
  }
}

async function getEmergencyPhones() {
  try {
    let response = await fetch(
      "https://cut-to-the-case.now.sh/emergency-phones"
    );
    let responseJson = await response.json();
    return responseJson.result.emergencyPhones;
  } catch (error) {
    console.error(error);
  }
}

async function getPoliceStations() {
  try {
    let response = await fetch(
      "https://cut-to-the-case.now.sh/police-stations"
    );
    let responseJson = await response.json();
    return responseJson.result.policeStations;
  } catch (error) {
    console.error(error);
  }
}

async function getStreetLight() {
  try {
    let response = await fetch("https://cut-to-the-case.now.sh/streetlights");
    let responseJson = await response.json();
    return responseJson.result.streetlights;
  } catch (error) {
    console.error(error);
  }
}

export default {
  getPoliceStations,
  getBusStops,
  getCrimes,
  getBusinesses,
  getEmergencyPhones,
  getStreetLight
};
