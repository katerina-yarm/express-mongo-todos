//2.1создадим набор роутов
const { Router } = require('express') 
//подключаем роутер, с помощью него можно создовать различные инстансы роутов и
//декомпозировоть логику приложения

//3.3 Подключаем молель todo
const Todo = require('../models/Todo')
const router = Router()

//2.2метод get вызываем чтобы обрабатывать запросы, которые мы отправляем из браузера
// url=/ это главная страница
router.get('/', async (req, res) => { 
  //3.4 Получаем массив всех todo
  const todos = await Todo.find({})

  //2.3для того, чтобы пользователю что-то вернуть обращаемся к объекту response
  //мы работаем не с нативными response и request, а с объектами, которые обернул express
  res.render('index', { //метод позволяет рендорить определенные страницы (страница 'index',которую мы создавали в папке views)
    //вторым параметром в объекте передаем динамические параметры
    title: 'Todos list',
    isIndex: true,
    //3.5 Передаем массив с нашими todo как параметр страницы
    todos
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true
  })
})

router.post('/create', async (req, res) => {
  //создаем новый объект todo исходя из тех параметров, которые мы передаем с клиента
  const todo = new Todo({
    title: req.body.title  
    //title соответствует названию, который мы указывали в <input type="text" name="title">
    //но для того, чтобы express мог парсить body(так как по умолчанию он не понимает, что это)
    //то index.js добавляем app.use(express.urlencoded({extended:true}))
  })

  //сохраняем данную модель
  await todo.save()
  //переходим на главную страницу, чтобы посмотреть список всех todo
  res.redirect('/')
})

router.post('/complete', async (req, res) => {
  const todo = await Todo.findById(req.body.id)

  todo.completed = !!req.body.completed //(параметр прилетит как строка, => с помощью !! преоюразуем к boolean значению)
  await todo.save()

  res.redirect('/')
})

//важно экспортировать роутер из этого файла наружу
module.exports = router
