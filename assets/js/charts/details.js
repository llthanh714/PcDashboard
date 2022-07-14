function viewDetail(id, branch) {

    let url = 'http://localhost:9839/api/chiso/khoaphong';
    let idChiSo = document.getElementById(id + '-id').textContent;
    let from = $("#date-from").text();
    let to = $("#date-to").text();

    //createBarChart('column-1', url, branch, idChiSo, from, to);
    createLineChart('column-1', url, branch, idChiSo, from, to);
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
