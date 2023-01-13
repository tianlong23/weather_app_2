
/*Function to fetch the city API, get the city ID, and pass this to another API to get the conditions, then get the attributes and set them to constants*/
function getData (cityName) {
    fetch('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=0q1kzenolJKT7EMMi51UBJ0M4r1VTHyF&q=' + cityName + '')
    .then(res => res.json())
    .then((data) => {
        console.log('data: '+ data)
        const {EnglishName, Country: {ID}} = data[0]
        console.log('english name: '+ EnglishName);
        const {Key} = data[0]
            fetch('http://dataservice.accuweather.com/currentconditions/v1/' + Key + '?apikey=0q1kzenolJKT7EMMi51UBJ0M4r1VTHyF')
            .then(info => info.json())
            .then((info) => {
                const { Temperature: {Metric: { Value}}} = info[0];
                const {WeatherText, WeatherIcon} = info[0];
                updateData(EnglishName, Value, WeatherIcon, WeatherText, ID);
            })
    })
    .catch(error => {
        console.log('here')
        document.getElementsByClassName('dataContainer')[0].setAttribute('id', 'tryAgain');
        console.error('catch error', error)
    })
}

/*When the page loads, runs a first search with shanghai as a city choice. Then runs the API function. */

/*This function also sets event listeners for clicking on the search icon and clicking the enter key for a new search*/
window.onload=function(){
    cityName = 'shanghai';
    getData(cityName)
    const findCity = document.getElementsByClassName("searchButton")[0];
    findCity.addEventListener('click', function() {        
        document.getElementsByClassName('dataContainer')[0].setAttribute('id', 'hideData');
        var cityLocation = document.getElementsByClassName("search-bar")[0];
        var cityName = cityLocation.value;
        getData (cityName);
    
    })
    const searchEnter = document.getElementsByClassName("search-bar")[0];
    searchEnter.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            document.getElementsByClassName('dataContainer')[0].setAttribute('id', 'hideData');
            var cityLocation = document.getElementsByClassName("search-bar")[0];
            var cityName = cityLocation.value;
            getData (cityName);
        }
        })
  }

  /* This function updates the DOM elements with the attributes pulled from the API*/
function updateData (EnglishName, Value, WeatherIcon, WeatherText, ID) {
    const name = document.getElementsByClassName('name')[0];
    name.innerText = 'Weather in ' + EnglishName;
    const temp = document.getElementsByClassName('temp')[0];
    temp.innerText = 'Temperature: ' + Value + '° C';
    const description = document.getElementsByClassName('description')[0];
    description.innerText = WeatherText
    /* This if statement adds a '0' to the icon if the icon number is less than 10, as it is missing an intial '0'*/
    if (WeatherIcon < 10) {
    document.getElementsByClassName('icon')[0].src='https://developer.accuweather.com/sites/default/files/0' + WeatherIcon + '-s.png'
    } else {
    document.getElementsByClassName('icon')[0].src='https://developer.accuweather.com/sites/default/files/' + WeatherIcon + '-s.png'
    }
    document.getElementsByClassName('flag')[0].src='https://flagsapi.com/' + ID + '/flat/64.png';
    document.body.style.backgroundImage = 'url("https://source.unsplash.com/1600x900/?' + EnglishName + '")';
    setTimeout(document.getElementsByClassName('dataContainer')[0].removeAttribute('id', 'hideData'), 1000);

}