import { createStore } from "redux";

const initialState = {
  markerClicked: false,
  markerTitle: "",
  markerDescription: "",
  page: "filter",
  markers: [],
  layerData: {},
  colorData: {},
  renderData: {
    busStop: false,
    crime: false,
    business: false,
    emergency: false,
    policeStations: false,
    streetLights: false
  },
  mapRegion: null
};

export default (reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_MAP_REGION":
      return { ...state, mapRegion: action.value };
    case "UPDATE_MARKERS":
      return { ...state, markers: action.value };
    case "UPDATE_RENDER_DATA":
      return {
        ...state,
        renderData: {
          ...state.renderData,
          [action.payload.field]: action.payload.value
        }
      };
    case "UPDATE_COLOR_DATA":
      return { ...state, colorData: action.value };
    case "UPDATE_LAYER_DATA":
      return { ...state, layerData: action.value };
    case "UPDATE_DETAIL_VIEW":
      return {
        ...state,
        markerClicked: action.payload.clicked,
        markerTitle: action.payload.title,
        markerDescription: action.payload.desc
      };
    case "UPDATE_PAGE":
      return { ...state, page: action.value };
    default:
      return state;
  }
});

export const updateMapRegion = value => ({
  type: "UPDATE_MAP_REGION",
  value
});
export const updateMarkers = value => ({
  type: "UPDATE_MARKERS",
  value
});
export const updateRenderData = (field, value) => ({
  type: "UPDATE_RENDER_DATA",
  payload: {
    field,
    value
  }
});
export const updateLayerData = value => ({
  type: "UPDATE_LAYER_DATA",
  value
});
export const updateColorData = value => ({
  type: "UPDATE_COLOR_DATA",
  value
});

export const updateDetailView = (clicked, title, desc) => ({
  type: "UPDATE_DETAIL_VIEW",
  payload: {
    clicked,
    title,
    desc
  }
});

export const updatePage = value => ({
  type: "UPDATE_PAGE",
  value
});

export const store = createStore(reducer, initialState);
