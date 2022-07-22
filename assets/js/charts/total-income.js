async function createIncome(branch, from, to) {
    document.getElementById("totalIncomeChart").innerHTML = '';
    let request = { ChiNhanh: branch, TuNgay: from, DenNgay: to }
    fetch(endpoint + 'chiso/sluong-tiepnhan', {
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
                response.json().then(ApiData => {
                    var totalIncomeChart = document.getElementById('totalIncomeChart').getContext('2d');
                    var mytotalIncomeChart = new Chart(totalIncomeChart, {
                        type: 'bar',
                        data: {
                            labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                            datasets: [{
                                label: "Tổng",
                                backgroundColor: '#ff9e27',
                                borderColor: 'rgb(23, 125, 255)',
                                data: ApiData,
                            }],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            legend: {
                                display: false,
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        display: true //this will remove only the label
                                    },
                                    gridLines: {
                                        drawBorder: false,
                                        display: false
                                    }
                                }],
                                xAxes: [{
                                    gridLines: {
                                        drawBorder: true,
                                        display: false
                                    }
                                }]
                            }
                        }
                    });
                })
            }
        )
        .catch(err => {
            console.log('Error: ', err)
        });
}


