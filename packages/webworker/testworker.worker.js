onmessage = function(e) {
    console.log('eeeeee',e.data)
    var workerResult = 'Result: ' + e.data * 5; //将获取到的值乘以5再返回
    setTimeout(() => {
        postMessage(workerResult); //调用postMessage将数据传递给主线程
    }, 5000);
};