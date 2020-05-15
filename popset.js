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
// set the dimensions of the canvas
var margin = {top: 10, right: 20, bottom: 50, left: 50},
    width = 3000  - margin.right,
    height = 700 - margin.top - margin.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 10]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(40);


// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


// load the data
d3.json("https://uskatebolt.github.io/Info/csvjsonnn.json", function(error, data) {
    

    data.forEach(function(d) {
        d.GeoAreaName = d.GeoAreaName;
        d.Value = +d.Value;
    });
	
  // scale the range of the data
  x.domain(data.map(function(d) { return d.GeoAreaName; }));
  y.domain([0, d3.max(data, function(d) { return d.Value; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" )
          .style("text-anchor", "end")

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value");


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.GeoAreaName); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Value); })
      .attr("height", function(d) { return height - y(d.Value); });
});
    
    
    
    $(function() {
  // choose target dropdown
  var select = $('select');
  select.html(select.find('option').sort(function(x, y) {
    // to change to descending order switch "<" for ">"
    return $(x).text() > $(y).text() ? 1 : -1;
  }));

  // select default item after sorting (first item)
  // $('select').get(0).selectedIndex = 0;
});

    
