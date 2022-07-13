function createCircles(id, value, color) {
    Circles.create({
        id: id,
        radius: 45,
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