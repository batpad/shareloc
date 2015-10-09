(function($) {
    var userName = prompt("What is your name?");
    var url = pageURL;
    var wsURL = "ws://192.168.1.28:1337";
    var ws;
    var map;
    var users = [];
    var foundLocation = false;
    var myMarker;

    $(function() {
        //alert("Hi " + userName + ". You are at " + url);

        L.mapbox.accessToken = 'pk.eyJ1Ijoic2FuamF5YiIsImEiOiJjaWZqZXE1d3gwMzdvczNrcWtzYzRybWI2In0.JgXxVkqvFYWikOCambi9oA';
        map = L.mapbox.map('map', 'mapbox.streets')
            .setView([40, -74.50], 9);

        
        ws = new WebSocket(wsURL);
        ws.onopen = function(e) {
            console.log("open", e);
            var msg = {
                'action': 'register',
                'url': url,
                'name': userName
            };
            ws.send(JSON.stringify(msg));
        };

        ws.onmessage = function(e) {
            console.log("message", e);
            var data = JSON.parse(e.data);
            if (data.action === 'update') {
                updateUserLocation(data);
            }
        };

        navigator.geolocation.watchPosition(updateLocation, locationError);
    });

    function updateLocation(loc) {
        console.log(loc);
        var coords = loc.coords;
        var myLatLng = [coords.latitude, coords.longitude];
        var markerOptions = {
            'title': 'Me'
        };
        if (!foundLocation) {
            myMarker = L.marker(myLatLng, markerOptions)
                .bindPopup('Me')
                .addTo(map);
            map.setView(myLatLng, 13);
            foundLocation = true;
        } else {
            map.removeLayer(myMarker);
            myMarker = L.marker(myLatLng, markerOptions)
                .bindPopup('Me')
                .addTo(map);
        }
        var msg = {
            'action': 'location',
            'url': url,
            'name': userName,
            'coords': myLatLng
        };
        ws.send(JSON.stringify(msg));

    }

    function updateUserLocation(data) {
        var user;
        user = _.find(users, function(user) {
            return user.name === data.name;
        });
        if (typeof(user) === 'undefined') {
            user = createUser(data);
        }
        var markerOptions = {
            'title': user.name,
            'icon': L.mapbox.marker.icon({
                'marker-color': user.markerColor
            })
        };
        user.coords = data.coords;
        if (user.marker) {
            map.removeLayer(user.marker);
        }
        user.marker = L.marker(user.coords, markerOptions)
            .bindPopup(user.name)
            .addTo(map);

    }

    function createUser(data) {
        var user = {
            'name': data.name,
            'markerColor': getRandomColor()
        };
        users.push(user);
        return user;
    }

    function locationError(err) {
        console.log(err);
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})(jQuery);