//npm init инициализируем проект(появляется файл package.json) 
//если не хотим отвечать на вопросы и нужны данные по умолчанию npm init -y
//npm install express (будет поднимать наш сервер и обрабатывать запросы)
//npm install mongoose (этот пакет будет служить для работы с mongoDB)
//npm i -D nodemon (для того чтобы было проше разрабатывать и сервер авоматически перезагружался)
//прописываем скрипты для автоматизации работы приложения "scripts": {"start": "node index.js","dev": "nodemon index.js"}

//npm run dev чтобы запустить наше приложение

const express = require ('express') 
const mongoose = require ('mongoose')
const path = require('path')
//так как у нас будет много страниц и в обычном html будет работать неудобно,
//=> подключим html движок handlebars+подключаем кастомные различные движки для express
const exphbs = require('express-handlebars')
//2.5подключаем наш роутер
const todoRoutes = require('./routes/todos.js')

//чтобы обозначить, на каком порту мы запускаем все приложение
const PORT = process.env.PORT || 3000 //если есть системная переменная, то из нее, а иначе порт 3000

//создаем объект нашего приложения
const app = express()
//настроим пакет handlebars
const hbs = exphbs.create({//метод позволяет настроить конфигурации для будущего шаблонизатора
    defaultLayout: 'main',//уназываем назвыние дефолтного лэйаута для наших страниц
    extname: 'hbs' //по умолчанию расширение handlebars, мы изменяем на hbs чтобы занимало меньше места
})
app.engine('hbs',hbs.engine)//движок для рендоринга страниц (hbs-называть можно как угодно), а
// в параметре передаем объект и его параметр,кот является функцией, но мы его не вызываем
//=> зарегистрировали движок по ключу 'hbs'
//и теперь можем его использовать
app.set('view engine', 'hbs')//'hbs' должен совпадать с ключом app.engine('hbs',hbs.engine)
app.set('views', 'views')//+регистрируем в экспрессе папку, где будут храниться все виды нашего сайта
//здесь все оставили по умолчанию(отобразили просто для того, чтобы было понятно откуда беруться все наши страницы)
//2.6 регистрируем наши роуты
app.use(express.urlencoded({extended:true}))
//указываем express, где искать наши стили
app.use(express.static(path.join(__dirname, 'public')))//указывает на некие статический папки и файлы
app.use(todoRoutes)


async function start(){
    try{                        
        await mongoose.connect(//вначале запускаем базу данных
            //обычно пароль выносится в конфиг 'mongodb+srv://katerina:Freedom123@cluster0.otjys.mongodb.net/myFirstDatabase'
            //и изменяем название коллекции на todos
            'mongodb+srv://katerina:Freedom123@cluster0.otjys.mongodb.net/todos',
            {
            useNewUrlParser: true,
            useFindAndModify: false //это нужно чтобы не было различных warninng в консоли
        }) //этот метод позволит нам подключиться к базе данных
        app.listen(PORT, ()=>{ //запускаем сервер, чтобы база к этому моменту уже была доступна
            console.log('Server has been started...')
        })
    }catch (e){
        console.log(e)
    }
}



start()

