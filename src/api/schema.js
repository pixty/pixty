import { schema } from 'normalizr'

//export const userSchema = new schema.Entity('users')

export const user = new schema.Entity('users', {}, {
  idAttribute: 'login'
})


export const profile = new schema.Entity('profiles')

export const picture = new schema.Entity('pictures')

export const person = new schema.Entity('persons', { 
  matches: [ profile ],
  pictures: [ picture ],
  profile: profile
})

export const scene = new schema.Entity('scenes', {
  persons: [ person ]
}, { idAttribute: 'camId' })