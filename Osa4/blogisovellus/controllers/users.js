const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  if (body.password.length < 2)  return response.status(401).json({
    error: 'invalid username or password'})
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', {author: 1, title: 1})

    response.json(users.map(u => u.toJSON()))
  })

module.exports = usersRouter