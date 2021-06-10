import _ from "lodash";

const IAQI_level = [
    0, 50, 100, 150, 200, 300, 400, 500
];
const pollutant_level = {
    "SO2": [0, 50, 150, 475, 800, 1600, 2100, 2620],
    "NO2": [0, 40, 80, 180, 280, 565, 750, 940],
    "PM10": [0, 50, 150, 250, 350, 420, 500, 600],
    "CO": [0, 5, 10, 35, 60, 90, 120, 150],
    "O3": [0, 160, 200, 300, 400, 800, 1000, 1200],
    "PM2.5": [0, 35, 75, 115, 150, 250, 350, 500]
}

function iaqi(pollutant, value) {
    const level = pollutant_level[pollutant];
    if (value >= level[level.length - 1]) {
        return IAQI_level[level.length - 1];
    }
    const index = _.findIndex(level, x => x >= value);
    const IAQI_hi = IAQI_level[index];
    const IAQI_low = IAQI_level[index - 1];
    const BP_hi = level[index];
    const BP_low = level[index - 1];
    return ((IAQI_hi - IAQI_low) / (BP_hi - BP_low)) * (value - BP_low) + IAQI_low;
}

function aqi(pollutant_list) {
    return _(pollutant_list).map(d => iaqi(d[0], d[1])).max();
}

function most_polluant(pollutant_list) {
    return _(pollutant_list).maxBy(d => iaqi(d[0], d[1]))[0];
}

export default { iaqi, aqi, most_polluant };