# this graphql-api is available under:

https://sch-anbieter.herokuapp.com

# to run the project on localhost:3001

## install the packages with:

$ yarn install

## to seed the DB

$ yarn run seed

## to run without seed:

yarn start

## migration

(prisma cli should be installed)

npx prisma migrate reset

npx prisma db push

npx prisma migrate dev --name= `<someName>`
