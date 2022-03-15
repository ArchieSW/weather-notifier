const GetEmoji =  (icon) => {
    let emoji = '🌈';
    switch(icon) {
        case '01':
            emoji = '☀️';
            break
        case '02':
            emoji = '🌤';
            break
        case '03':
            emoji = '🌥';
            break
        case '04':
            emoji = '☁️';
            break
        case '09':
            emoji = '🌧';
            break
        case '10':
            emoji = '🌦';
            break
        case '11':
            emoji = '⛈';
            break
        case '13':
            emoji = '❄️';
            break
        case '50':
            emoji = '🌫';
            break
    }
    return emoji;
}

/*
    Template for message:
    Weather in ${city}:
    ${emoji} ${temp}
    Additional info:
    ....
*/
const GetMessageText = (weatherData, city) => {
    const temp = weatherData.main.temp;
    const emoji = GetEmoji(weatherData.weather[0].icon.slice(0, 2));
    const addInfo = weatherData.weather[0].description;
    const message = `Weather in ${city}\n${emoji}  ${temp}°C\nAdditional info:\n${addInfo}`;
    return message;
};

export default GetMessageText;