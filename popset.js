 window.onload = populateSelect();

    function populateSelect() {

        var xhr = new XMLHttpRequest(), 
            method = 'GET',
            url = 'https://uskatebolt.github.io/Info/csvjsonnn.json';        // ADD THE URL OF THE FILE.

        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                
                // PARSE JSON DATA.
                var birds = JSON.parse(xhr.responseText);

                var ele = document.getElementById('sel');
                for (var i = 0; i < birds.length; i++) {
                    // BIND DATA TO <select> ELEMENT.
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + birds[i].Value + '">' + birds[i].GeoAreaName + '</option>';
                }
            }
        };
        xhr.open(method, url, true);
        xhr.send();
    }

    function show(ele) {
        var msg = document.getElementById('msg');
        msg.innerHTML = 'Selected Region: <b>' + ele.options[ele.selectedIndex].text + '</b> </br>' +
            'Value: <b>' + ele.value + '</b>';
    }
