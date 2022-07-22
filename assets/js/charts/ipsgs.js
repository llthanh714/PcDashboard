async function createIPSGs(branch, from, to) {
    document.getElementById("ipsgs-chart").innerHTML = '';
    let request = { ChiNhanh: branch, TuNgay: from, DenNgay: to }
    fetch(endpoint + 'chiso/ipsgs', {
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
    })
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Error: ' + response.status);
                    return;
                }
                response.json().then(data => {
                    data.forEach(addDetail);
                })
            }
        )
        .catch(err => {
            console.log('Error: ', err)
        });
}

async function addDetail(item, index, array) {
    var obj = Object.values(item);
    var color = '';
    if (obj[4] >= 90) {
        color = 'bg-success';
    }
    else if (obj[4] >= 70) {
        color = 'bg-warning';
    }
    else {
        color = 'bg-danger';
    }
    var html = '<div class="d-flex justify-content-between mt-2" style="animation-name: fadeIn; animation-duration: 0.5s;">'
        + '<p class="text-muted mb-0">' + obj[1] + '</p>'
        + '<p class="text-muted mb-0">' + obj[4] + '%</p>'
        + '</div>'
        + '<div class="progress" style="animation-name: pulse; animation-duration: 0.5s; height: 9px">'
        + '<div class="progress-bar ' + color + '" role="progressbar"'
        + 'aria-valuenow="' + obj[4] + '" aria-valuemin="0" aria-valuemax="100" style="width:' + obj[4] + '%">'
        + '</div>'
        + '</div>'
        + '<br>';
    document.getElementById("ipsgs-chart").innerHTML += html;
};

