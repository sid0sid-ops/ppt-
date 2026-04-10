// Web Worker for heavy algorithm processing off the main thread
self.onmessage = function (e) {
    const data = e.data;
    console.log('Worker received data:', data);

    // Perform intense calculations here
    const result = computeMetrics(data);

    self.postMessage({ status: 'done', result });
};

function computeMetrics(data) {
    // Mock simulation
    let sum = 0;
    for (let i = 0; i < 1000; i++) sum += i;
    return sum;
}
