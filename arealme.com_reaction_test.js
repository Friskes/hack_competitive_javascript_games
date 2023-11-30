// https://www.arealme.com/reaction-test/ru/
setInterval(() => {
    let green = $('.tfny-circleGreen');
    ((green) => {
        if (green.length == 1) {
            green[0].dispatchEvent(new Event('mousedown', { button: 0 }));
        };
    })(green);
}, 200);
