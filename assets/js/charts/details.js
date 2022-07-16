function viewDetail(id, branch) {
    let url = endpoint + 'chiso/khoaphong';
    let idChiSo = document.getElementById(id + '-id').textContent;
    let from = $("#date-from").text();
    let to = $("#date-to").text();
    let type = document.getElementById(id + '-type').textContent;

    if (type == 'Column & Bar'){
        createBarChart('column-1', url, branch, idChiSo, from, to);
    }
    else if (type == 'Line & Area'){
        createLineChart('column-1', url, branch, idChiSo, from, to);
    }
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
