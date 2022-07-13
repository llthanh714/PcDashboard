function createCircles(id, value, base) {
    var color = '';
    if (value < base - 10) {
        color = '#F25961';
    }
    else if (value >= base - 10 && value < base) {
        color = '#FF9E27';
    }
    else {
        color = '#2BB930';
    }

    Circles.create({
        id: id,
        radius: 40,
        value: value,
        maxValue: 100,
        width: 7,
        text: value,
        colors: ['#f1f1f1', color],
        duration: 400,
        wrpClass: 'circles-wrp',
        textClass: 'circles-text',
        styleWrapper: true,
        styleText: true
    })
}