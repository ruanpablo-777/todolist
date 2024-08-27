import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
const app = express()
const port =process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//conectar mongoose
dotenv.config()

const mongoURI = process.env.DATABASE_URL
console.log("DATABSE_URL: ",process.env.DATABASE_URL)

mongoose.connect(mongoURI)
.then(() => console.log("conectado ao MongoDB Atlas"))
.catch((err) => console.error("erro ao conectar ao MongoDB Atlas: ", err))


//prisma studio


/*
const prismas = new PrismaClient();

async function createTaskWithPrisma() {
  const task = await prismas.task.create({
    data: {
      text: "Tarefa inserida pelo Prisma",
      done: false,
    },
  });
  console.log(task);
}

createTaskWithPrisma(); 

async function deletePrisma() {
    await prisma.task.delete({
        where: {
            id: "66ccf8f3d5a7637367a3a7de"
        }
    })
}
deletePrisma()

*/

//Rotas
const prisma = new PrismaClient()
app.get("/tasks", async (req, res) => {
    const task = await prisma.task.findMany()
    res.json(task)
})

app.post("/tasks", async (req, res) => {
   // const task = new prisma(req.body)
   // await task.save()
    await prisma.task.create({
        data : {
            text: req.body.text,
            done: req.body.done
        }
    })
    res.status(200).json({message: "funcionou"})
})

app.put("/tasks/:id", async (req, res) => {
   // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true})
   try {
   await prisma.task.update({
    where: {
       id: req.params.id
    },
    data: {
        text: req.body.text,
        done: req.body.done
    }
   })
    //req.json(task)
    res.status(200).json({message: "funciona"})
} 
catch (err){
    res.status(400).json({ err: err.message })
}
})

app.delete("/tasks/:id", async (req, res) => {
    try {
    //await Task.findByIdAndDelete(req.params.id)

    await prisma.task.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({ message: "Task deleted" })
    }
    catch (err) {
        res.status(400).json( {err: err.message} )
    }
})

app.listen(port, () => {
    console.log(`Server rodando na porta http://localhost:${port}`)
})