var ctx = $('#myChart');
let dataValue = [{
    x: 10,
    y: 20
}, {
    x: 15,
    y: 10
}];
var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Düsseldorf', 'Essen']
    },
    //options: options
});