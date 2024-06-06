document.addEventListener('DOMContentLoaded', function () {
    const covidApiUrl = 'https://api.rootnet.in/covid19-in/stats/latest';
    const hospitalApiUrl = 'https://api.rootnet.in/covid19-in/hospitals/beds';
    
    const confirmedElem = document.getElementById('confirmed');
    const activeElem = document.getElementById('active');
    const recoveredElem = document.getElementById('recovered');
    const deathsElem = document.getElementById('deaths');
    const covidCtx = document.getElementById('myChart').getContext('2d');
    const hospitalBedsCtx = document.getElementById('hospitalChartBeds').getContext('2d');
    const hospitalHospitalsCtx = document.getElementById('hospitalChartHospitals').getContext('2d');

    let covidChartInstance, hospitalBedsChartInstance, hospitalHospitalsChartInstance;

    function fetchData() {
        fetch(covidApiUrl)
            .then(response => response.json())
            .then(data => {
                const summary = data.data.summary;
                const unofficialSummary = data.data["unofficial-summary"][0];
                updateCovidData(summary, unofficialSummary);
                updateCovidChart(data.data.regional);
            })
            .catch(error => console.error('Error fetching COVID-19 data:', error));

        fetch(hospitalApiUrl)
            .then(response => response.json())
            .then(data => {
                updateHospitalCharts(data.data.regional);
            })
            .catch(error => console.error('Error fetching hospital data:', error));
    }

    function updateCovidData(summary, unofficialSummary) {
        confirmedElem.textContent = summary.total.toLocaleString();
        activeElem.textContent = unofficialSummary.active.toLocaleString();
        recoveredElem.textContent = summary.discharged.toLocaleString();
        deathsElem.textContent = summary.deaths.toLocaleString();
    }

    function updateCovidChart(regionalData) {
        const labels = regionalData.map(entry => entry.loc);
        const confirmedCases = regionalData.map(entry => entry.totalConfirmed);
        const recoveredCases = regionalData.map(entry => entry.discharged);
        const deathCases = regionalData.map(entry => entry.deaths);

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Confirmed',
                    data: confirmedCases,
                    borderColor: 'rgba(255, 193, 7, 1)',
                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
                    fill: false
                },
                {
                    label: 'Recovered',
                    data: recoveredCases,
                    borderColor: 'rgba(40, 167, 69, 1)',
                    backgroundColor: 'rgba(40, 167, 69, 0.2)',
                    fill: false
                },
                {
                    label: 'Deaths',
                    data: deathCases,
                    borderColor: 'rgba(220, 53, 69, 1)',
                    backgroundColor: 'rgba(220, 53, 69, 0.2)',
                    fill: false
                }
            ]
        };

        if (covidChartInstance) {
            covidChartInstance.destroy();
        }

        covidChartInstance = new Chart(covidCtx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Regions'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Cases'
                        }
                    }
                }
            }
        });
    }

    function updateHospitalCharts(regionalData) {
        const states = regionalData.map(entry => entry.state);
        const ruralBeds = regionalData.map(entry => entry.ruralBeds);
        const urbanBeds = regionalData.map(entry => entry.urbanBeds);
        const ruralHospitals = regionalData.map(entry => entry.ruralHospitals);
        const urbanHospitals = regionalData.map(entry => entry.urbanHospitals);

        const bedsChartData = {
            labels: states,
            datasets: [
                {
                    label: 'Rural Beds',
                    data: ruralBeds,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Urban Beds',
                    data: urbanBeds,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        };

        const hospitalsChartData = {
            labels: states,
            datasets: [
                {
                    label: 'Rural Hospitals',
                    data: ruralHospitals,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Urban Hospitals',
                    data: urbanHospitals,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }
            ]
        };

        if (hospitalBedsChartInstance) {
            hospitalBedsChartInstance.destroy();
        }

        hospitalBedsChartInstance = new Chart(hospitalBedsCtx, {
            type: 'bar',
            data: bedsChartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'States'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Beds'
                        }
                    }
                }
            }
        });

        if (hospitalHospitalsChartInstance) {
            hospitalHospitalsChartInstance.destroy();
        }

        hospitalHospitalsChartInstance = new Chart(hospitalHospitalsCtx, {
            type: 'bar',
            data: hospitalsChartData,
            options: {
                responsive: true,
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'States'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Hospitals'
                        }
                    }
                }
            }
        });
    }

    fetchData();
});
