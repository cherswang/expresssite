var path = require('path')

var express = require('express');

var app = express();

// 设置handlebars视图引擎
var handlebars = require('express3-handlebars').create({defaultLayout:'main' })
// 请注意，您将需要 var path = require('path');  为了将“视图”设置为文件路径视图/布局/。援引自：https://stackoverflow.com/questions/27763846/failed-to-lookup-view
app.set('views', path.join(__dirname, 'views/layouts/'));
app.engine('handlebars',handlebars.engine)
app.set('view engine', 'handlebars')

app.set('port',process.env.PORT || 3000)

app.use(express.static(__dirname + '/public'))
// app.get 是我们添加路由的方法，在Express文档中写的是app.VERB,这并不意味着存在一个VERB的方法，它是用来指代HTTP动词的（最常见的是‘get’和‘post’）。这个方法有两个参数：一个路径和一个函数。其中，路由就是有这个路径定义的。
app.get('/', function(req, res){
    // res.type('text/plain')
    // res.send('Shaolin Travel')
    res.render('home')
})

app.get('/about', function(req, res){
    // res.type('text/plain')
    // res.send('About Shaolin Travel')
    var randomFortune = fortunes[Math.floor(Math.random()* fortunes.length)]
    res.render('about', {fortune: randomFortune })
})

// app.use 是 Express 添加中间件的一种方法,目前可以把它看作一个处理器，用来处理所有没有路由匹配的路径

//定制404页面，catch-all处理器（中间价）
app.use(function(req, res, next){
    // res.type('text/plain');
    res.status(404);
    // res.send('404 - Not Found');
    res.render('404')
});

//定制500页面，错误处理器（中间件）
app.use(function(err, req, res, next){
    console.error(err.stack);
    // res.type('text/plain');
    res.status(500);
    // res.send('500 - Server Error')
    res.render('500')
});

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.')
})

// 为了显示动态的信息，做的小测试
var fortunes = [
    "Conquer your fears or they will conquer you.", "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]