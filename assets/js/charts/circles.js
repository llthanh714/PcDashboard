function createCircles(id, branch, idChiSo, from, to) {
    postData(endpoint + 'chiso/tongquan', {
        ChiNhanh: branch,
        ChiSo: idChiSo,
        TuNgay: from,
        DenNgay: to
    })
        .then(data => {

            var color = '';
            if (data.phanTram < 75) {
                color = '#F25961';
            }
            else if (data.phanTram <= 98) {
                color = '#FF9E27';
            }
            else {
                color = '#2BB930';
            }

            Circles.create({
                id: id,
                radius: 45,
                value: data.phanTram,
                maxValue: 100,
                width: 9,
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
            $("#" + id + "-type").text(data.loaiBieuDo);
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