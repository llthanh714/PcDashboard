function createCircles(id, branch, idChiSo, from, to) {
    postData('http://localhost:9839/api/chiso/tongquan', {
        ChiNhanh: branch,
        ChiSo: idChiSo,
        TuNgay: from,
        DenNgay: to
    })
        .then(data => {

            //alert(JSON.stringify(data))

            var color = '';
            if (data.datDuoc < data.mucTieu - 10) {
                color = '#F25961';
            }
            else if (data.datDuoc >= data.mucTieu - 10 && data.datDuoc < data.mucTieu) {
                color = '#FF9E27';
            }
            else {
                color = '#2BB930';
            }

            Circles.create({
                id: id,
                radius: 40,
                value: data.datDuoc,
                maxValue: 100,
                width: 7,
                text: data.datDuoc,
                colors: ['#f1f1f1', color],
                duration: 400,
                wrpClass: 'circles-wrp',
                textClass: 'circles-text',
                styleWrapper: true,
                styleText: true
            })

            $("#" + id + "-title").text(data.tenChiSo);
            $("#" + id + "-id").text(data.idChiSo);
        });
}

async function postData(url = '', request) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(request)
    });
    return response.json();
}