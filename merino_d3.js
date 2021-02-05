// H.A. PICTOGRAM

// create SVG object for pictogram
var svgPict = d3.select("#mapHApict")
                .append("svg")
                .attr("width", "100%")
                .attr("height", "100%");

// defining icon
svgPict.append("defs")
        .append("g")
        .attr("transform", "translate(0, 0)  scale(0.00200000,-0.00200000)")
        .attr("id", "sheepIcon")
        .append("path")
        .attr("d", "M10005 9225 l-7 -254 -68 -40 c-92 -55 -465 -306 -625 -421 -237 -170 -563 -424 -951 -742 l-71 -59 -224 11 c-123 5 -555 24 -959 40 -404 17 -951 39 -1215 50 -919 38 -1489 59 -2375 90 -534 18 -1126 23 -1287 11 -282 -22 -492 -65 -690 -142 -279 -109 -663 -334 -817 -479 -73 -69 -250 -298 -359 -465 -188 -289 -320 -632 -349 -908 -19 -176 12 -415 81 -631 67 -210 103 -490 191 -1486 43 -481 57 -598 84 -677 29 -84 77 -197 222 -524 l114 -256 -10 -459 c-13 -569 -13 -1354 -1 -1494 5 -58 21 -149 36 -202 l27 -97 62 -5 c128 -12 569 -36 577 -31 12 8 1 112 -15 143 -8 15 -24 36 -36 47 -77 69 -146 359 -157 655 -11 309 42 685 122 867 47 105 169 204 341 274 53 21 99 39 104 39 27 0 136 -513 305 -1446 16 -86 18 -92 48 -105 31 -14 50 -39 120 -159 27 -46 42 -60 94 -86 84 -42 169 -54 376 -54 230 0 226 -3 152 120 -87 143 -190 339 -208 395 -63 190 -139 985 -141 1460 -1 202 0 212 24 273 24 61 27 64 127 127 122 77 191 102 322 115 161 17 461 -15 1076 -115 620 -101 926 -118 2025 -113 l784 3 216 -262 216 -263 -8 -102 c-15 -196 -39 -444 -74 -743 -19 -165 -42 -365 -51 -445 l-16 -145 71 -161 c38 -88 85 -201 102 -251 l32 -90 71 -6 c177 -15 498 -30 504 -24 3 4 -17 76 -45 159 -152 454 -170 766 -71 1232 37 177 92 388 119 455 11 28 38 80 60 115 l41 64 57 4 c73 6 96 -8 115 -69 49 -151 68 -424 83 -1163 l6 -336 185 -174 c151 -143 192 -176 222 -181 20 -4 140 -10 268 -14 l232 -7 -13 55 c-17 72 -61 151 -218 389 l-130 197 16 283 c52 917 66 1070 109 1217 20 68 26 77 77 116 91 70 226 163 368 251 74 47 161 105 194 130 139 107 307 304 472 554 197 296 263 430 441 885 153 391 233 739 335 1455 46 325 95 615 116 698 21 79 58 137 106 170 80 52 169 38 838 -137 190 -50 359 -94 377 -100 29 -8 37 -6 75 23 73 55 137 88 293 152 l150 61 -3 139 c-5 250 -35 394 -111 525 -140 246 -774 996 -1064 1260 -250 228 -421 316 -872 450 -48 14 -57 24 -204 204 -173 212 -327 373 -383 398 -20 9 -61 17 -91 17 l-55 0 -7 -255z");

function drawPict(myCol, mySheep, myID, sheepID, myYear, myLabel, myOpacity = 0, myFill = "black"){

    // number of columns and sheep:
    var nCol = myCol;
    var nSheep = mySheep;

    // padding b/w elements
    var hBuff = 30;
    var wBuff = 50;

    // generating d3 range
    var myIndex = d3.range(nSheep / 10000)

    var sheepPict = svgPict.append("g")
                            .attr("id", myID)
                            .selectAll("use")
                            .data(myIndex)
    
    // drawing pictogram:
    
    sheepPict.enter()
                .append("use")
                .attr("xlink:href", "#sheepIcon")
                .attr("x", function(d) {
                    var remainder = d % nCol;
                    return remainder * wBuff;
                })
                .attr("y", function(d) {
                    var rowNum = Math.floor(d / nCol);
                    return rowNum * hBuff;
                })
                .attr("opacity", 0)
                .attr("fill", myFill)
                .merge(sheepPict)
                .attr("opacity", myOpacity)
                
    var textCont = svgPict.append("g")
                            .attr("id", myID + "text")

    textCont.append("text")
            .attr("id", sheepID)	
            .attr("class", "sheepValue")
            .attr("x", 0)
            .attr("y", -35)
            .text(myLabel + " sheep")
            .attr("opacity", 0)

    var sheepText = d3.select("#" + sheepID).node().getBoundingClientRect();


    textCont.append("text")
            .attr("class", "txtValue")	
            .attr("x", 0)
            .attr("y", -60)
            .text(myYear)
            .attr("opacity", 0);

    // calculating and transforming to center
    var rootSVG = d3.select("#mapHApict").node().getBoundingClientRect();
    var svgGraphic = d3.select("#" + myID).node().getBoundingClientRect();

    var graphicX = (rootSVG.x - svgGraphic.x) + (rootSVG.width - svgGraphic.width) / 2;
    var graphicY = (rootSVG.y - svgGraphic.y) + (rootSVG.height - svgGraphic.height) / 2;

    d3.select("#" + myID)
        .attr("transform", "translate("+ graphicX + "," + graphicY + ")");

    d3.select("#" + myID + "text")
        .attr("transform", "translate("+ graphicX + "," + graphicY + ")");

    var svgGraphicCenter = d3.select("#" + myID).node().getBoundingClientRect();

}

function showTheSheep(myID, myDelay = 0, opacity = 1, textOpacity = 1) {

    d3.select(myID)
        .selectAll("use")
        .transition()
        .delay(myDelay)
        .duration(500)
        .attr("opacity", opacity)

    d3.select(myID + "text")
        .selectAll("text")
        .transition()
        .delay(myDelay)
        .duration(500)
        .attr("opacity", textOpacity)
}

function hideTheSheep(myID, opacity = 0, textopacity = 0) {

    d3.select(myID)
        .selectAll("use")
        .transition()
        .duration(500)
        .attr("opacity", opacity)

    d3.select(myID + "text")
        .selectAll("text")
        .transition()
        .duration(500)
        .attr("opacity", textopacity)
}

// sheep legend
var sheepLegendPadding = d3.select("#sheepLegend")
                            .style("padding-left")

sheepLegendPadding = sheepLegendPadding.substring(0, sheepLegendPadding.length -2)



// width of div containing sheepLegend
var sheepLegendWidth = d3.select("#sheepLegend")
                            .style("width")      

sheepLegendWidth = sheepLegendWidth.substring(0, sheepLegendWidth.length -2)               


var sheepLegend = d3.select("#sheepLegend")
                    .append("svg")
                    .attr("id", "#sheepLegendSVG")
                    


sheepLegend
            .append("use")
            .attr("xlink:href", "#sheepIcon")
            .attr("x", 0)
            .attr("y", 30)
            .attr("fill", "black")
            .attr("opacity", 1)

sheepLegend.append("text")
            .attr("class", "legendText")
            .text("10,000 sheep")
            .attr("x", 30)
            .attr("y", 30)


drawPict(6, 475000, "picto1", "sheep1", 1825, "480,000")
drawPict(12, 1600000, "picto2", "sheep2", 1835, "1,600,000", 0, "darkgreen")

var scrollerHA1 = scrollama();


function handleStepHA1(response) {

    var el = d3.select(response.element);
    var dataStep = el.attr('data-step');

    if (response.direction == "down") {

        if (dataStep == 0) {
            
        } 
        else if (dataStep == 1) {
            showTheSheep("#picto1", 500)


            d3.select("#picto1text")
                .attr("opacity", 1)
                .transition()
                .delay(1000)
                .duration(500)
                .attr("opacity", 0.3)

            showTheSheep("#picto2", 1000, 0.3)
            
            d3.select("#merino")
                .style("opacity", 1)
                .transition()
                .duration(500)
                .style("opacity", 0)

        }
        else if (dataStep == 2) {
            
        }

    }

    else if (response.direction == "up") {
        if (dataStep == 0) {
            
        }
        else if (dataStep == 1) {
            hideTheSheep("#picto1");
            hideTheSheep("#picto2");

            d3.select("#merino")
                .style("opacity", 0)
                .transition()
                .delay(1000)
                .duration(500)

                .style("opacity", 1)
        }
    }
};

function initHA1() { 

    scrollerHA1
        .setup({
            step: '#scrollHA1 article .stepText', // step elements
            offset: 0.5, // set trigger 50% down screen
            debug: false// display trigger offset
        })
        .onStepEnter(handleStepHA1);
};

initHA1();

/*********************/
/*********************/
/*********************/
// HISTORICAL AG MAP //
/*********************/
/*********************/
/*********************/

// centroid data here:

var vtCentroid = {
    name: "Vermont",
    cent: [44.0687, -72.6658]
}

var ohCentroid = {
    name: "Ohio",
    cent: [40.2862, -82.7937]
}

var nyCentroid = {
    name: "New York, NY",
    cent: [40.7216374832643, -73.9029495172901]
}

var bosCentroid = {
    name: "Boston, MA",
    cent: [42.30491919511341, -71.07593614677295]
}

var centroids = [vtCentroid, ohCentroid];
var centroidDairy = [nyCentroid, bosCentroid];

var lakeCentroid = {
    name: "Lake Erie",
    cent: [42.0669, -81.3399]
}

var erieCentroid = {
    name: "Erie Canal",
    cent: [43.0030, -76.312]
}

var ohioCentroid = {
    name: "Ohio Canal",
    cent: [40.73783, -80.88949]
}

var waterCentroid = [lakeCentroid, erieCentroid, ohioCentroid]

// creating svg

var svgHA = d3.select("#mapHA")
                .append("svg");

// retrieving dimensions of window
var widthHA = window.innerWidth;
var heightHA = window.innerHeight;


// setting projection
var projectionHA = d3.geoMercator()
                        .center([-78, 41.5])
                        .translate([widthHA/2, heightHA / 2]) 
                        .scale([3500])


var zoomHA = [-68.60945, 44.10] // zoom destination for dairy zoom
var pathHA = d3.geoPath(projectionHA);

var woolGrp = svgHA.append("g");
var milkGrp = svgHA.append("g").attr("opacity", 0);
var statesGrp = svgHA.append("g");
var canalsGrp = svgHA.append("g");
var canalsGrp2 = svgHA.append("g");
var railsGrp = svgHA.append("g");

var stateLabGrp = svgHA.append("g");
var waterLabGrp = svgHA.append("g");
var cityLabGrp = svgHA.append("g");

// DATA VARIABLES

var states = "https://gist.githubusercontent.com/janicekchen/31b7130ba15ef2b1f255cf10827848cd/raw/ab60b37987768037b7ec24b1bf59d9f2d2debfec/HAstates.geojson";

var counties = "https://gist.githubusercontent.com/janicekchen/31b7130ba15ef2b1f255cf10827848cd/raw/d228b49cbc0e9f6b88fcfd6aafb96b2f611b01b7/HAcounties.geojson";

var canals = "https://gist.githubusercontent.com/janicekchen/31b7130ba15ef2b1f255cf10827848cd/raw/0236a46e35f4256049037ac234ae3c748b417782/HAcanals.geojson";

var railroads = "https://gist.githubusercontent.com/janicekchen/31b7130ba15ef2b1f255cf10827848cd/raw/ab60b37987768037b7ec24b1bf59d9f2d2debfec/mapHA_simplerail.geojson";

var dataHA = "https://gist.githubusercontent.com/janicekchen/31b7130ba15ef2b1f255cf10827848cd/raw/d624ba97260b03a89f893ca7256ea11b84a9fc15/dataHA.csv";

var bgColor = "#fafffb"

// DEFINING TEXTURE FILLS

const texture1 = textures.circles()
                            .size(5)
                            .radius(0.3)
                            .background(bgColor);
const texture15 = textures.circles()
                            .size(5)
                            .radius(0.5)
                            .background(bgColor)
const texture2 = textures.circles()
                            .size(4)
                            .radius(0.6)
                            .background(bgColor);
const texture3 = textures.circles()
                            .size(3)
                            .radius(0.8)
                            .background(bgColor);                                                                         
const texture4 = textures.circles()
                            .size(2)
                            .radius(0.7)
                            .background(bgColor);
const texture5 = textures.circles()
                            .size(2)
                            .radius(0.9)
                            .background(bgColor);
const texture6 = textures.circles()
                            .size(2)
                            .radius(1.2)
                            .background(bgColor);                        

svgHA.call(texture1)                         
svgHA.call(texture2)
svgHA.call(texture3)                         
svgHA.call(texture4)
svgHA.call(texture5)                         
svgHA.call(texture6)
svgHA.call(texture15)


function woolUpdate(source, thisYear) {

    d3.csv(source).then(function(data) {

        var filtData = data.filter(function(d) {
            return d.YEAR == thisYear;
        });

        var minFilt = d3.min(filtData, function(d) {
            return +d.acreWOOL;
        });

        var woolArray = filtData.map(function(d) {
            return +d.acreWOOL;
        });

        var woolArraySort = woolArray.sort(d3.ascending);

        if (thisYear == 1840) {
            woolArraySort.pop();
        }

        var color = d3.scaleQuantile()
                        .domain([minFilt, d3.max(woolArraySort)])
                        .range([texture1.url(), texture2.url(), texture3.url(), texture5.url() ,texture6.url()]);


        woolGrp.selectAll("path")
                .transition()
                .duration(500)
                .style("fill", function(d) {

                var countyFIPS = d.properties.FIPS;

                var selectCounty = filtData
                .filter(function(d) {

                    return d.FIPS == countyFIPS;

                })

                if (selectCounty.length != 0) {

                    var dataValue = selectCounty[0].acreWOOL;

                    return	color(dataValue);


                } else {

                    return bgColor;	

                }


                });
    });

};

// MILK LEGEND DIMENSIONS:

var legendDim = 20;
var legendPadding = 5;
var legendBorder = 10; // border padding
var legendWidth = 100;
var legendTitleHeight = 30;
var legendHeight = (5*legendDim) + (4*legendPadding) + (2*legendBorder) + legendTitleHeight;

var milkLegendSVG = d3.select("#milkLeg")
                      .append("svg")
                      .attr("id", "milkLegendSVG")
                      .attr("width", legendWidth)
                      .attr("height", legendHeight);
                      
// group to wrap all elements
var milkLegendGroup = milkLegendSVG.append("g")
                                   .attr("opacity", 0)
// background rectangle for milk legend:
var milkLegendBack = milkLegendGroup.append("rect")
             .attr("width", legendWidth)
             .attr("height", legendHeight)
             .attr("fill", "black")

var milkLegend = milkLegendGroup.append("g")


function milkUpdate(source, thisYear) {

    d3.csv(source).then(function(data) {

        if (thisYear >= 1880) {

            var filtData = data.filter(function(d) {
                return d.YEAR == thisYear;
            })

            var minFilt = d3.min(filtData, function(d) {
                return +d.acreMILK;
            });

            var maxFilt = d3.max(filtData, function(d) {
                return +d.acreMILK;
            });

            var milkArray = filtData.map(function(d) {
                return +d.acreMILK;
            });

            var milkArraySort = milkArray.sort(d3.ascending);

           /*var color = d3.scaleQuantile()
                            .domain([minFilt, d3.max(milkArraySort)])
                            .range(["#f7fbff","#e1edf8","#cadef0","#abcfe6","#82badb","#59a1cf","#3787c0","#1c6aaf","#0b4d94","#08306b"]);*/


            var color = d3.scaleCluster()
                            .domain(milkArraySort)
                            .range(["#f7fbff","#e1edf8","#cadef0","#abcfe6","#82badb","#59a1cf","#3787c0","#1c6aaf","#0b4d94","#08306b"]);

            milkGrp.selectAll("path")
                    .transition()
                    .duration(500)
                    .style("fill", function(d) {

                    var countyFIPS = d.properties.FIPS;

                    var selectCounty = filtData
                    .filter(function(d) {

                        return d.FIPS == countyFIPS;

                    });

                    if (selectCounty.length != 0) {

                        var dataValue = +selectCounty[0].acreMILK;


                        return color(dataValue);

                    } else {

                        return "white";

                    };


                    })
                    .style("mix-blend-mode", "multiply");
        }

                        if (thisYear == 1880) {

                            var colorClusters = color.clusters();
                            var f = d3.format(".1f");

                            const meter2conversion = 4046.86;
                            for(var i=0; i<colorClusters.length; i++) {
                                //Let's take the constant factor as 2
                                colorClusters[i] = colorClusters[i] * meter2conversion;
                            }
                        
    
                            var milkLegendData = [{index: 0, fill: "#e1edf8", value: minFilt + " – " + f(colorClusters[1])},
                                            {index: 1, fill: "#abcfe6", value: f(colorClusters[1])  + " – " + f(colorClusters[3])},
                                            {index: 2,fill: "#59a1cf", value: f(colorClusters[3]) + " – " + f(colorClusters[5])},
                                            {index: 3, fill: "#1c6aaf", value: f(colorClusters[5]) + " – " + f(colorClusters[7])},
                                            {index: 4, fill: "#08306b", value: f(colorClusters[7]) + " – " + f(maxFilt * meter2conversion)}];
            
                            milkLegend.selectAll("rect")
                                        .data(milkLegendData)
                                        .enter()
                                        .append("rect")
                                        .attr("width", legendDim)
                                        .attr("height", legendDim)
                                        .attr("x", legendBorder)
                                        .attr("y", function(d) {
                                            return (d.index * (legendDim + legendPadding) + legendBorder + legendTitleHeight);
                                        })
                                        .attr("fill", function(d) {
                                            return d.fill;
                                        })

                            milkLegendGroup.transition()
                                            .duration(1000)
                                            .attr('opacity', 1)

                            var texts = milkLegend.selectAll("text")
                                                  .data(milkLegendData);


                            texts.enter()
                                        .append("text")
                                        .attr("class", "legendText")
                                        .attr("fill", "white")
                                        .attr("x", legendBorder + legendDim + legendPadding)
                                        .attr("y", function(d) {
                                        return (d.index * (legendDim + legendPadding) + legendBorder + (0.5 * legendDim) + 5 + legendTitleHeight); // 5 is half of the font size
                                        })
                                        .text(function(d) {
                                        return d.value;
                                        });

                            texts.text(function(d) {
                                    return d.value;
                                    })

                        } else if (thisYear == 1900 || thisYear == 1920) {

                            var colorClusters = color.clusters();
                            var f = d3.format(".1f");

                            const meter2conversion = 4046.86;
                            for(var i=0; i<colorClusters.length; i++) {
                                colorClusters[i] = colorClusters[i] * meter2conversion;
                                }

                            var milkLegendData = [{index: 0, fill: "#e1edf8", value:    minFilt + " – " + f(colorClusters[1])},
                                {index: 1, fill: "#abcfe6", value: f(colorClusters[1])  + " – " + f(colorClusters[3])},
                                {index: 2,fill: "#59a1cf", value: f(colorClusters[3]) + " – " + f(colorClusters[5])},
                                {index: 3, fill: "#1c6aaf", value: f(colorClusters[5]) + " – " + f(colorClusters[7])},
                                {index: 4, fill: "#08306b", value: f(colorClusters[7]) + " – " + f(maxFilt * meter2conversion)}];

                            /*milkLegend.selectAll("text")
                                      .attr("opacity", 1)
                                      .transition()
                                      .attr("opacity", 0)
                                      .remove()*/

                            var texts = milkLegend.selectAll("text")
                                    .data(milkLegendData)

                                texts.text(function(d) {
                                    return d.value;
                                    })
                                    /*.attr("opacity", 0)
                                    .transition()*/
                                    .attr("opacity", 1);
                                    
                                    
                        }

                        milkLegendGroup.append("text")
                                .attr("class", "legendTitle")
                                .attr("x", legendBorder)
                                .attr("y", legendBorder + 12)
                                .attr("fill", "white")
                                .text("gallons / acre")


    });

};



function drawBoundaries (source, group, strokeCol, strokeW, polyFill, blendMode = "normal") {

    d3.json(source).then(function(data) {
        if(group == canalsGrp) {
            group.selectAll("path")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("d", pathHA)
                    .style("fill-opacity", 0)
                    .style("stroke-width", 0)
                    .transition()
                    .style("stroke", strokeCol)
                    .style("fill", polyFill)
                    .style("stroke-width", strokeW)
                    .style("mix-blend-mode", blendMode);

        } else {
            group.selectAll("path")
                    .data(data.features)
                    .enter()
                    .append("path")
                    .attr("d", pathHA)
                    .style("stroke", strokeCol)
                    .style("fill", polyFill)
                    .style("stroke-width", strokeW)
                    .style("mix-blend-mode", blendMode);
        }
    });
};

function drawLabel(data, group, circleRadius) {



    group.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", circleRadius)
            .attr("stroke", "black")
            .attr("fill", "white")
            .attr("cx", function(d) {
            var lon = d.cent[1];
            var lat = d.cent[0];

            var proj = projectionHA([lon, lat]);

            return proj[0];
            })
            .attr("cy", function(d) {
            var lon = d.cent[1];
            var lat = d.cent[0];

            var proj = projectionHA([lon, lat]);

            return proj[1];
            })

    group.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "mapLabel")
            .attr("x", function(d) {
            var lon = d.cent[1];
            var lat = d.cent[0];

            var proj = projectionHA([lon, lat]);

            return proj[0];
            })
            .attr("y", function(d) {
            var lon = d.cent[1];
            var lat = d.cent[0];

            var proj = projectionHA([lon, lat]);

            return proj[1];
            })
            .attr("dy", function(d) {
            if (d.name == "Vermont") {
                return -100
            } 
            else if (d.name == "Erie Canal") {
                return -50
            }
            else {
                return -10
            }
            })
            .attr("dx", function(d) {
            if (d.name == "Erie Canal") {
                return 50
            }
            })
            .attr("text-anchor", function(d) {
                if (d.name == "Boston, MA" || d.name == "New York, NY") {
                    return "end";
                } else {
                    return "middle";
                }
            })
            .text(function(d) {
            return d.name;
            })
            .attr("font-style", function(d) {
            if (group == waterLabGrp) {
                return "italic";
            } 
            })
            .attr("fill", function(d) {
            if (d.name == "Lake Erie") {
                return "white";
            }
            })
            .attr("font-size", function(d) {
            if (group == waterLabGrp) {
                return 9;
            } else {
                return 12;
            }
            })


    group.selectAll("line")
            .data(data)
            .enter()
            .append("line")
            .attr("x1", function(d) {
            if (d.name == "Vermont") {
                var lon = d.cent[1];
                                        
                var lat = d.cent[0];

                var proj = projectionHA([lon, lat]);

                return proj[0]; 
            } else if (d.name == "Erie Canal") {
                var lon = d.cent[1];
                                        
                var lat = d.cent[0];

                var proj = projectionHA([lon, lat]);

                return proj[0] + 25; 
            }

            else {
                return 0
            }
            })
            .attr("y1", function(d) {
            if (d.name == "Vermont" || d.name == "Erie Canal") {
                var lon = d.cent[1];
                                        
                var lat = d.cent[0];

                var proj = projectionHA([lon, lat]);

                return proj[1] - 10; 
            } else {
                return 0
            }
            })
            .attr("x2", function(d) {
            if (d.name == "Vermont") {
                var lon = d.cent[1];
                                        
                var lat = d.cent[0];

                var proj = projectionHA([lon, lat]);

                return proj[0]; 
            } else if (d.name == "Erie Canal") {
                var lon = d.cent[1];
                                        
                var lat = d.cent[0];

                var proj = projectionHA([lon, lat]);

                return proj[0] + 50;
            }
            else {
                return 0
            }
            })
            .attr("y2", function(d) {
            if (d.name == "Vermont" ) {
                var lon = d.cent[1];
                                        
                var lat = d.cent[0];

                var proj = projectionHA([lon, lat]);

                return proj[1] - 95; 
            } else if (d.name == "Erie Canal") {
                var lon = d.cent[1];
                                        
                var lat = d.cent[0];

                var proj = projectionHA([lon, lat]);

                return proj[1] - 45;
            }
            else {
                return 0
            }
            })
            .attr("stroke", "black")
            .attr("stroke-width", 1)




}

function drawRail(source, strokeW = 0.5) {
    d3.json(source).then(function(data) {

        var railpaths = railsGrp.selectAll("path")
                            .data(data.features)

        railpaths.enter()
                    .append("path")
                    .attr("d", pathHA)
                    .style("stroke-width", 0)
                    .merge(railpaths)
                    .transition()
                    .style("stroke", "rgba(0, 0, 0, 0.5)")
                    .style("fill", "rgba(0,0,0, 0")
                    .style("stroke-width", strokeW)
                    .style("mix-blend-mode", "multiply");
                
    });
};

function updateDataHA(thisYear, strokeW = "0.3px") {
    woolUpdate(dataHA, thisYear);
    milkUpdate(dataHA, thisYear);

    d3.select("#HAYear")
        .text(thisYear)
}

function drawLegend(legendData, legendID) {

    var legendWindow = d3.select(legendID).node().getBoundingClientRect();

    var legendDim = 20;
    var legendPadding = 5;

    var legend = d3.select(legendID)
                    .append("svg")
                    .attr("width", '80%')
                    .attr("height", legendData.length * (legendDim + 2*legendPadding));

    

    legend.selectAll("rect")
            .data(legendData)
            .enter()
            .append("rect")
            .attr("width", legendDim)
            .attr("height", legendDim)
            .attr("x", legendWindow.width / 2 - 80)
            .attr("y", function(d) {
            return d.index *  (legendDim + legendPadding) + 10;
            })
            .attr("fill", function(d) {
            return d.fill;
            })
            .attr("stroke", "black")
            .attr("stroke-width", 1)

        legend.selectAll("text")
            .data(legendData)
            .enter()
            .append('text')
            .attr("class", "legendText")
            .attr("x", legendDim + legendPadding + legendWindow.width / 2 - 70)
            .attr("y", function(d) {
                return (d.index * ((legendDim) + legendPadding)) + (0.5*legendDim + legendPadding) + 10;
            })
            .text(function(d) {
                    return d.value;
            })

};



// drawing Legend for wool 
var woolLegend = d3.select("#woolLegend")
                    .append("svg")
                    .attr("id", "woolLegendSVG")



var woolLegendData = [{index: 0, fill: texture1, perc: "20th percentile"},
                        {index: 1, fill: texture2, perc: "40%"},
                        {index: 2,fill: texture3, perc: "60%"},
                        {index: 3, fill: texture5, perc: "80%"},
                        {index: 4, fill: texture6, perc: "100%"}]

var legendDim = 20
var legendPadding = 5

woolLegend.selectAll("rect")
            .data(woolLegendData)
            .enter()
            .append("rect")
            .attr("width", legendDim)
            .attr("height", legendDim)
            .attr("x", 0)
            .attr("y", function(d) {
            return d.index * (legendDim + legendPadding);
            })
            .attr("fill", function(d) {
            return d.fill.url()
            })

woolLegend.selectAll("text")
            .data(woolLegendData)
            .enter()
            .append("text")
            .attr("class", "legendText")
            .attr("x", legendDim + legendPadding)
            .attr("y", function(d) {
            return (d.index * ((legendDim) + legendPadding)) + (0.5*legendDim + legendPadding);
            })
            .text(function(d) {
            if (d.index == 0) {
                return d.perc + " of wool-producing counties"
            }
            return d.perc;
            })




        



drawBoundaries(states, statesGrp, "rgba(0, 0, 0, 0.4)", "0.7px", "rgba(255, 255, 255, 0)");
drawBoundaries(counties, woolGrp, "rgba(0, 0, 0, 0.00)", "0px", "rgba(0, 0, 0, 0)");
drawBoundaries(counties, milkGrp, "rgba(0, 0, 0, 0.00)", "0px", "rgba(0, 0, 0, 0)");



var scrollerHA2 = scrollama();


function handleStepHA2(response) {

    var el = d3.select(response.element);
    var dataStep = el.attr('data-step');

    if (response.direction == "down") {
        if (dataStep == 0) {
            drawLabel(centroids, stateLabGrp, 3)
            updateDataHA(1840);
            d3.select("#titleYearWrapper")
                .transition()
                .style("opacity", 1)

            // draw title
            d3.select("#mapTitleText")
              .text("Wool Production")
              .transition()
              .style("opacity", 1)
        }
        else if (dataStep == 1) {
            drawBoundaries(canals, canalsGrp, "rgb(0, 0, 0)", "1.5px", "rgba(0, 0, 0, 0)");
            drawLabel(waterCentroid, waterLabGrp, 0)
        }
        else if (dataStep == 2) {
            d3.select("#HAYear")
                .text(1845)

            drawBoundaries(canals, canalsGrp2, "rgba(100, 0, 0, 0.3)", "40px", "rgba(0, 0, 0, 0)")
        }
        else if (dataStep == 4) {
            updateDataHA(1850)
        }
        else if (dataStep == 5) {
            updateDataHA(1860)
        }
        else if (dataStep == 6) {
            updateDataHA(1870)
        }
        else if (dataStep == 8) {
            updateDataHA(1880)
            drawLabel(centroidDairy, cityLabGrp, 3)

            d3.select("#mapTitleText")
              .text("Milk Sales")

            milkGrp
                    .transition()
                    .attr("opacity", 1)

            canalsGrp.selectAll("path")
                        .transition()
                        .style("stroke-opacity", 0)
                        .remove()

            canalsGrp2.selectAll("path")
                        .transition()
                        .style("stroke-opacity", 0)
                        .remove()

            waterLabGrp.transition()
                        .style("fill-opacity", 0)
                        .remove()

            // drawRail(railroads)
            
            var zoomCent = projectionHA(zoomHA);
            var x = widthHA/2 - zoomCent[0];
            var y = heightHA/2 - zoomCent[1];
            svgHA.transition()
                 .duration(750)
                 .attr("transform",  "translate(" + x + "," + y + ")scale(1.8)")
        
        }
        else if (dataStep == 9) {
            updateDataHA(1900)
        
        }
        else if (dataStep == 10) {
            updateDataHA(1920)
        }

    }
    else if(response.direction == "up") {
        if (dataStep == 0) {
            updateDataHA(1840);
            d3.select("#titleYearWrapper")
                .transition()
                .style("opacity", 0)
        }
        else if (dataStep == 1) {
            canalsGrp.selectAll("path")
                        .transition()
                        .style("stroke-opacity", 0)
                        .remove()

            waterLabGrp.transition()
                            .style("fill-opacity", 0)
                            .remove()	         



        }
        else if (dataStep == 2) {
            d3.select("#HAYear")
                .text(1845)

            canalsGrp2.selectAll("path")
                        .transition()
                        .style("stroke-opacity", 0)
                        .remove()
            
        }
        else if (dataStep == 4) {
            updateDataHA(1850)
        }
        else if (dataStep == 5) {
            updateDataHA(1860)
        }
        else if (dataStep == 6) {
            updateDataHA(1870)
        }
        else if (dataStep == 7) {
            milkGrp
                    .transition()
                    .attr("opacity", 0)

            var zoomCent = projectionHA(zoomHA);
            var x = widthHA/2 - zoomCent[0];
            var y = heightHA/2 - zoomCent[1];
            svgHA.transition()
                 .duration(750)
                 .attr("transform",  "translate(" + -x + "," + -y + ")")
                 .attr("transform", "scale(1)")

            d3.select("#mapTitleText")
                 .text("Wool Production")

            milkLegendGroup.transition()
                           .duration(1000)
                           .attr("opacity", 0)

            cityLabGrp.selectAll("circle")
                      .attr("opacity", 1)
                      .transition()
                     .duration(1000)
                       .attr("opacity", 0)
                       .remove()
            
            cityLabGrp.selectAll("text")
                      .attr("opacity", 1)
                      .transition()
                      .duration(1000)
                      .attr("opacity", 0)
                      .remove()

        }
        else if (dataStep == 8) {
            updateDataHA(1880)

            drawBoundaries(canals, canalsGrp, "rgb(0, 0, 0)", "1.5px", "rgba(0, 0, 0, 0)");

            drawBoundaries(canals, canalsGrp2, "rgba(100, 0, 0, 0.3)", "40px", "rgba(0, 0, 0, 0)")

            drawLabel(waterCentroid, waterLabGrp, 0)

        
        }
        else if (dataStep == 9) {
            updateDataHA(1900)
        
        }
        else if (dataStep == 10) {
            updateDataHA(1920)
        }
    }
    


};

function initHA2() { 

    scrollerHA2
        .setup({
            step: '#scrollHA2 article .stepText', // step elements
            offset: 0.5, // set trigger 80% down screen
            debug: false// display trigger offset
        })
        .onStepEnter(handleStepHA2);
};

initHA2();
