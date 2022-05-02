import "reflect-metadata"
import { createConnection } from "typeorm"
import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"
import { Request, Response } from "express"
import { Routes } from "./routes"
import { Student } from "./entity/student.entity"

createConnection()
  .then(async (connection) => {
    // create express app
    const app = express()
    app.use(cors())
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach((route) => {
      ;(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next)
        if (result instanceof Promise) {
          result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined))
        } else if (result !== null && result !== undefined) {
          res.json(result)
        }
      })
    })

    // start express server
    app.listen(4001)

    // insert 15 students

    await connection.manager.find(Student).then(async (students) => {
      console.log("We have " + students.length + " students")
      if (students.length === 0) {
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "David",
            last_name: "Bowie",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Robert",
            last_name: "Plant",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "James",
            last_name: "Bond",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Bob",
            last_name: "Marley",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Paul",
            last_name: "McCartney",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "George",
            last_name: "Harrison",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Elton",
            last_name: "John",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Simon",
            last_name: "Joyner",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "John",
            last_name: "Denver",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Neil",
            last_name: "Diamond",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Donna",
            last_name: "Summer",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Aretha",
            last_name: "Franklin",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Diana",
            last_name: "Ross",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Kate",
            last_name: "Bush",
            photo_url: "",
          })
        )
        await connection.manager.save(
          connection.manager.create(Student, {
            first_name: "Boz",
            last_name: "Scaggs",
            photo_url: "",
          })
        )
      }
    })

    console.log("Express server has started on port 4001. Open http://localhost:4001/student/get-all to see results")
  })
  .catch((error) => console.log(error))
