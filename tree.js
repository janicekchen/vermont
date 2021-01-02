var scroller = scrollama();

function init() {
    scroller
        .setup({
            step: '#scrollTree article .stepTree',
            progress: true,
            offset: 0.5,
            debug: false,
        })
        .onStepEnter(handleStepProgress);
}

function handleStepProgress(response) {
    var vid = document.getElementById('treevid');
    console.log(response)
    var duration = 0;

    vid.onloadedmetadata = function() {
        duration = this.duration;
      };
      
    const singleTree = 3.615; //single tree fall time
    var progress = response.progress;
    var step = response.index;
        if (step == 1) {
            if (vid.currentTime != 0) {
                vid.currentTime = 0;
            }
            vid.play()

            var pausing_function = function() {
                    if(this.currentTime >= singleTree) {
                        this.pause();

                        this.removeEventListener("timeupdate", pausing_function);
                    }
            }
            
            vid.addEventListener("timeupdate", pausing_function);
            

        } else if (step == 2) { 
                vid.play();
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