const express = require('express');
const connection = require('./database/database');
const bodyParser = require('body-parser');
const joi = require('joi');
const Product = require('./models/Product/Product');
const slugify = require('slugify');

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

app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/newProduct', (req,res)=>{
    res.render('newProduct');
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

app.listen(8080, ()=>{
    console.log('Servidor rodando!')
})