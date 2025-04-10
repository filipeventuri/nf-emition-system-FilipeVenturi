# 📄 Sistema de Emissão de Notas Fiscais

Bem-vindo ao desafio de backend!  

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express.js**
- **MariaDB**
- **Joi** para validações
- **JWT** para autenticação
- **Swagger** para documentação da API

---

## 🎯 Funcionalidades

- Cadastro de **clientes** e **produtos**
- Emissão de **notas fiscais eletrônicas**
- Validações fiscais:
  - CNPJ
  - CFOP
  - NCM
- Cálculo automático de impostos:
  - **ICMS** (18%)
  - **IPI** (4%)
- Geração de **XML da Nota Fiscal**
- Listagem e consulta de notas emitidas
- Histórico de emissão
- Autenticação de usuários via JWT

---

## 📦 Endpoints Principais

### Clientes
- `POST /clients` - Criar cliente
- `GET /clients` - Listar clientes

### Produtos
- `POST /products` - Cadastrar produto
- `GET /products` - Listar produtos

### Notas Fiscais
- `POST /invoices` - Emitir nota fiscal
- `GET /invoices` - Listar notas
- `GET /invoices/:id` - Detalhar nota

---

## 📄 Exemplo de Payload para Emissão de Nota

```json
{
  "clientId": "cliente-uuid",
  "products": [
    {
      "productId": "produto-uuid",
      "quantity": 3
    },
    {
      "productId": "produto-uuid-2",
      "quantity": 1
    }
  ]
}
```

A resposta incluirá:
- Detalhes da nota
- Cálculo de impostos
- Valor total
- XML da nota em base64

---

## ✅ Regras de Negócio

- **CNPJ** validado conforme Receita Federal
- **CFOP** e **NCM** validados conforme padrões fiscais
- **ICMS** aplicado em todos os produtos (18%)
- **IPI** aplicado se o produto for industrializado (4%)

---

## 🏁 Considerações Finais

Este projeto tem o objetivo de aplicar boas práticas, regras de negócio reais e validações fiscais!
