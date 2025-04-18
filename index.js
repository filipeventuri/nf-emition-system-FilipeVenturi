const express = require('express');
const connection = require('./database/database');
const bodyParser = require('body-parser');
const joi = require('joi');
const Product = require('./models/Product/Product');
const Client = require('./models/Client/Client');
const slugify = require('slugify');
const emailValidator = require('email-validator');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

connection.authenticate().then(()=>{
    console.log("Banco de dados acessado!")
}).catch((err)=>{
    console.log("Erro: " + err);
});

const productSchema = joi.object({
    name: joi.string().min(3).max(100).required().messages({
      'string.min': 'O nome deve ter no mínimo 3 caracteres',
      'string.max': 'O nome deve ter no máximo 100 caracteres',
      'any.required': 'O nome é obrigatório',
    }),
    description: joi.string().min(0).max(500).optional(),
    price: joi.number().positive().precision(2).required().messages({
      'number.positive': 'O preço deve ser positivo',
      'number.precision': 'O preço deve ter até 2 casas decimais',
      'any.required': 'O preço é obrigatório',
    }),
    amount: joi.number().integer().min(1).required().messages({
      'number.integer': 'A quantidade deve ser um número inteiro maior que zero',
      'number.min': 'A quantidade não pode ser zero, negativa ou decimal',
      'any.required': 'A quantidade é obrigatória',
    }),
    ncm: joi.string().pattern(/^\d{8}$/).required().messages({
      'string.pattern.base': 'O NCM deve ter 8 dígitos numéricos',
      'any.required': 'O NCM é obrigatório',
    }),
  }); // validação do produto

  const clientSchema = joi.object({
    name: joi.string().min(3).max(100).required().messages({
      'string.min': 'O nome deve ter no mínimo 3 caracteres',
      'string.max': 'O nome deve ter no máximo 100 caracteres',
      'any.required': 'O nome é obrigatório',
    }),
    password: joi.string().length(6).pattern(/^\d+$/).required().messages({
      'string.length': 'A senha deve ter exatamente 6 dígitos',
      'string.pattern.base': 'A senha deve conter apenas números',
      'any.required': 'A senha é obrigatória',
    }),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
      'string.email': 'O e-mail deve ser válido',
    }),
    phone: joi.string().pattern(/^\d{10,11}$/).required().messages({
      'string.pattern.base': 'O telefone deve ter 10 ou 11 dígitos (DDD + número)',
      'any.required': 'O telefone é obrigatório',
    }),
    document: joi.string().pattern(/^\d{11,14}$/).required().messages({
      'string.pattern.base': 'O documento deve ter 11 (CPF) ou 14 (CNPJ) dígitos',
      'any.required': 'O documento é obrigatório',
    }),
    street: joi.string().min(3).required().messages({
      'string.min': 'O logradouro deve ter no mínimo 3 caracteres',
      'any.required': 'O logradouro é obrigatório',
    }),
    number: joi.string().min(1).required().messages({
      'string.min': 'O número deve ter pelo menos 1 caractere',
      'any.required': 'O número é obrigatório',
    }),
    complement: joi.string().allow(null, '').optional(),
    neighborhood: joi.string().min(3).required().messages({
      'string.min': 'O bairro deve ter no mínimo 3 caracteres',
      'any.required': 'O bairro é obrigatório',
    }),
    city: joi.string().min(3).required().messages({
      'string.min': 'A cidade deve ter no mínimo 3 caracteres',
      'any.required': 'A cidade é obrigatório',
    }),
    state: joi.string().length(2).uppercase().required().messages({
      'string.length': 'O estado deve ter exatamente 2 caracteres (UF)',
      'any.required': 'O estado é obrigatório',
    }),
    zipCode: joi.string().pattern(/^\d{8}$/).required().messages({
      'string.pattern.base': 'O CEP deve ter 8 dígitos (sem hífen)',
      'any.required': 'O CEP é obrigatório',
    })
  }); // validação do cliente

app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/newProduct', (req,res)=>{
    res.render('newProduct');
})

app.get('/newClient', (req,res)=>{
  res.render('newClient');
})

app.post('/clients', async(req,res)=>{
  var { error, value } = clientSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  var { name, password, email, phone, document, street, number, complement, neighborhood, city, state, zipCode } = value;

  try {
    var existingClient = await Client.findOne({ where: { email: email } });
    var existingEmail = emailValidator.validate(email);
    if (!existingClient && existingEmail) {
      await Client.create({
        name,
        password,
        email,
        phone,
        document,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode
      });
      return res.redirect("/newClient");
    } else{
      return res.redirect("/");
    }
  } catch (err) {
    console.error("Erro no banco de dados:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
  

})

app.post('/products', async(req,res)=>{
    var { error, value } = productSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({
      errors: error.details.map((err) => err.message),
    });
  }
  var { name, description, price, amount, ncm } = value;
  var slugifiedName = slugify(name);

  try {
    var existingProduct = await Product.findOne({ where: { name: slugifiedName } });

    if (!existingProduct) {
      await Product.create({
        name: slugifiedName,
        description,
        price,
        amount,
        ncm
      });
      return res.redirect("/products");
    } else {
      var newAmount = existingProduct.amount + amount;
      await Product.update(
        { amount: newAmount },
        { where: { name: slugifiedName } }
      );
      return res.redirect("/products");
    }
  } catch (err) {
    console.error("Erro no banco de dados:", err);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
}) //Cadastro de produtos

app.get('/products', (req,res)=>{
  Product.findAll().then((products)=>{
    res.render("products", {products:products});  
});
}) //Listagem de produtos

app.get('/clients', (req,res)=>{
  Client.findAll().then((clients)=>{
    res.render("clients", {clients:clients});  
});
}) //Listagem de produtos

app.listen(8080, ()=>{
    console.log('Servidor rodando!')
})