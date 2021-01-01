var scroller = scrollama();

function init() {
    scroller
        .setup({
            step: '#scrollTree article .step',
            progress: true,
            offset: 0,
            debug: true,

        })
        .onStepProgress(handleStepProgress);
}

function handleStepProgress(response) {
    var vid = document.getElementById('treevid');

    const fallTime = 3.859;
   console.log(vid.currentTime);
    var progress = response.progress;
    if (progress > 0 && progress < 1) {
        vid.pause();
        vid.currentTime = fallTime * progress;
    } 
    else if (progress == 1) {
        vid.play();
    }
    //var progress = el.attr('progress');
    //var index = el.attr('index');
}

init();