import ns from '../module/ns';

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    this.$body = $('body');

    var firstAudio = new Audio();
    var onAudio = new Audio();
    var offAudio = new Audio();

    var isWired = true;

    firstAudio.src = './audio/first.mp3';
    onAudio.src = './audio/on.mp3';
    offAudio.src = './audio/off.mp3';

    firstAudio.play();
    this.alert({
      text: 'ネットが切れたらお知らせするよー',
    });

    setInterval(() => {
      $.ajax(`./js/online.js?${Date.now()}`, {
        success: (res) => {
          console.log('success');

          if(isWired === null) {
            isWired = true;
          } else if(isWired === false) {
            this.alert({
              text: 'ネットがつながったー',
            });

            onAudio.play();
          }
          isWired = true;
        },
        error: (err) => {
          console.log('failed');

          if(isWired === null) {
            isWired = false;
          } else if(isWired === true) {
            offAudio.play();

            this.alert({
              text: 'ネットが切れたー',
            });
          }

          isWired = false;
        },
      });
    }, 1000);
  }

  alert(opts = {}) {
    var time = new Date();
    var timeStr = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });

    var text = opts.text;

    var $time = $('<time></time>')
      .text(timeStr)
    ;
    var $content = $('<p></p>')
      .text(` ${text}`)
      .prepend($time)
    ;
    this.$body.append($content);
  }
}