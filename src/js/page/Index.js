import ns from '../module/ns';

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    var $body = $('body');

    var onAudio = new Audio();
    var offAudio = new Audio();

    var isWired = true;

    onAudio.src = '/audio/on.mp3';
    offAudio.src = '/audio/off.mp3';

    setInterval(function() {
      var time = new Date();
      var timeStr = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      });

      $.ajax('/api/wired', {
        success: function(res) {
          let $content;
          let $time;

          if(isWired === null) {
            isWired = true;
          } else if(isWired === false) {
            $time = $('<time></time>')
              .text(timeStr)
            ;
            $content = $('<p></p>')
              .text(' ネットがつながったー')
              .prepend($time)
            ;
            $body.append($content);

            onAudio.play();
          }
          isWired = true;
        },
        error: function(err) {
          let $content;
          let $time;

          if(isWired === null) {
            isWired = false;
          } else if(isWired === true) {
            $time = $('<time></time>')
              .text(timeStr)
            ;
            $content = $('<p></p>')
              .text(' ネットが切れたー')
              .prepend($time)
            ;
            $body.append($content);

            offAudio.play();
          }
          isWired = false;
        },
      });
    }, 1000);
  }
}