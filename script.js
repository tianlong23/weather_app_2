//STEPS
//Find Free API for the Weather, see what data is available - DONE
//find free API for flags based on country input - DONE
//create HTML with spaces for each of the pieces of information I want - DONE
//create CSS to look nice - DONE
//Create JS to pull relevant into in
//first setup API as an object, make sure data is coming to the page
//then take data from the API, put into variables or consts, and display in the app
//make everything look nice, add any other cool features available such as a changing background


//link https://api.weatherbit.io/v2.0/current?&city=shanghai&key=d53492af289a4192aa1756cb771b4f09&include=minutely
//API key: d53492af289a4192aa1756cb771b4f09

//data desired: country code, which then pulls the flag, temp, icon, wind speed, description, AQI
//example icon link: https://www.weatherbit.io/static/img/icons/t01d.png
fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=0q1kzenolJKT7EMMi51UBJ0M4r1VTHyF&q=shanghai')
.then(res => res.json())
.then((data) => {
    console.log(data)
    const {EnglishName, Country: {ID}} = data[0]
    const {Key} = data[0]
    console.log(ID)
    console.log(EnglishName)
    console.log(Key)
        fetch('http://dataservice.accuweather.com/currentconditions/v1/' + Key + '?apikey=0q1kzenolJKT7EMMi51UBJ0M4r1VTHyF')
        .then(info => info.json())
        .then((info) => {
            console.log(info)
            const { Temperature: {Metric: { Value}}} = info[0]
            const {WeatherText, WeatherIcon} = info[0]
            console.log(Value, WeatherText, WeatherIcon)
        })
})

//continue getting data, see how to pull into the fields in the DOM. 
//Then see how to pull based on search request in the HTML