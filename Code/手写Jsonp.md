jsonp
```javascript
    /**
     * jsonp获取请求数据
     * @param {object}options
     */
    function jsonp(options) {
        // console.log(options);
        // 1. 产生不同的函数名(函数名随机)
        let callBackName = 'itLike' + Math.random().toString().substr(2)+ Math.random().toString().substr(2);
        // console.log(callBackName);

        // 2. 产生一个全局函数
        window[callBackName] = function (params) {
            // console.log(params);
            // console.log(options.success);
            if(params !== null){
                options.success(params);
            }else{
                options.failure(params);
            }

            // 2.1 删除当前脚本标签
            scriptE.remove();
            // 2.2 将创建的全局函数设为null
            window[callBackName] = null;
        };

        // 3. 取出url地址
        let jsonpUrl;
        if(options.data !== undefined){
            jsonpUrl = options.url + '?' + options.data + '&callBack=' + callBackName;
        }else {
            jsonpUrl = options.url + '?callBack=' + callBackName;
        }
        // console.log(jsonpUrl);

        // 4. 创建script标签
        let scriptE = document.createElement('script');
        scriptE.src = jsonpUrl;
        document.body.appendChild(scriptE);
    }
```


服务端(express)
```javascript
router.get('/api/v1', function(req, res, next) {
  res.json({
    'name': '轩灵',
    'address': '北京',
    'intro': 'fltenwall'
  });
});
```


调用jsonp
```javascript
btn.addEventListener('click', ()=>{
        jsonp({
            url: 'http://localhost:3000/api/v1',
            data: 'name=轩灵&age=24',
            success: function (data) {   
                console.log(data);
            },
            failure:function(data){
                console.log(数据请求失败);
            }
        });
    });
```
