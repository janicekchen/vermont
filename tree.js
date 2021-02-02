var scroller = scrollama();

function init() {
    scroller
        .setup({
            step: '#scrollTree article .stepTree',
            offset: 0.5,
            debug: false,
        })
        .onStepEnter(handleStepEnter);
}

function handleStepEnter(response) {
    var vid = document.getElementById('treevid');
    var vid2 = document.getElementById('treevid2');

    var duration = 0;

    vid.onloadedmetadata = function() {
        duration = this.duration;
      };

    vid2.onloadedmetadata = function() {
        duration = this.duration;
      };
      
    const singleTree = 3.615; //single tree fall time
    //var progress = response.progress;
    var step = response.index;

    var pausing_function = function() {
                    if(this.currentTime >= singleTree) {
                        this.pause();
                        this.removeEventListener("timeupdate", pausing_function);
                    }
            }

    vid.addEventListener("timeupdate", pausing_function);


    if (response.direction == "down") {
        if (step == 0) {
            if (vid.currentTime != 0) {
                vid.currentTime = 0;
            }
            vid.pause();
            vid2.pause();
        } else if (step == 1) {
            if (vid.currentTime != 0) {
                vid.currentTime = 0;
            }
            vid.play();
            
        } else if (step == 2) { 
                d3.select("#treevid")
                  .style("opacity", 0);

                vid2.play();
        }

    } else if (response.direction == "up") {
        if (step == 0) {
            if(vid.currentTime != 0) {
                vid.currentTime = 0;
            };
            if(vid2.currentTime !=0) {
                vid2.currentTime = 0;
            }
            vid.pause();
            vid2.pause();
        } else if (step ==1) {
            if (vid.currentTime != 0) {
                vid.currentTime = 0;
            }
            d3.select("#treevid")
              .style("opacity", 1);

            vid.play();

        }
    }
        



    
    /*if (progress > 0 && progress < 1) {
        if(step == 1) {
            vid.currentTime = singleTree * progress;
        } else if (step == 2) {
            vid.currentTime = ((vid.duration - singleTree) * progress) + singleTree;
        }
    } 
    else if (progress == 1) {

    }*/
    //var progress = el.attr('progress');
    //var index = el.attr('index');
}

init();