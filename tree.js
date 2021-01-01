var scroller = scrollama();

function init() {
    scroller
        .setup({
            step: '#scrollTree article .stepTree',
            progress: true,
            offset: 0,
            debug: true,
        })
        .onStepProgress(handleStepProgress);
}
var vid = document.getElementById('treevid');
vid.onloadedmetadata = function() {
    console.log('hey')
  };



function handleStepProgress(response) {
    var vid = document.getElementById('treevid');

    var duration = 0;

    vid.onloadedmetadata = function() {
        console.log('hey')
        duration = this.duration;
      };
      
    const singleTree = 3.615; //single tree fall time
    
    var progress = response.progress;
    console.log(duration)
    if (progress > 0 && progress < 1) {
        vid.currentTime = vid.duration * progress;
        console.log(vid.currentTime)
    } 
    else if (progress == 1) {

    }
    //var progress = el.attr('progress');
    //var index = el.attr('index');
}

init();