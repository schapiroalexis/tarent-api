# Heroku deployment example

[Deployment guide](https://www.prisma.io/docs/guides/deployment/deploying-to-heroku)

## Download manually

```bash
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/deployment-platforms/heroku
cd heroku
```

https://git.heroku.com/sch-anbieter.git

postgresql-dimensional-08417 as DATABASE_URL

https://sch-anbieter.herokuapp.com

export DATABASE_URL=postgres://tpqozdpncwypff:aa678f2b9c02466ab562a39285a109f6a92a261cca5666c9ee381cb853ed20c8@ec2-3-225-79-57.compute-1.amazonaws.com:5432/d284ipototg4b0

# mirgation

$ npx prisma migrate reset
$ npx prisma db push
$ npx prisma migrate dev --name=<someName>
