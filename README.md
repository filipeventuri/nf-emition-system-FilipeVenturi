# 📄 Sistema de Emissão de Notas Fiscais

Bem-vindo ao desafio de backend!  
Neste projeto, desenvolvi uma API RESTful para **emissão de Notas Fiscais**, com foco em **validações fiscais**, **cálculo de impostos**, e **persistência segura de dados**.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express.js**
- **Prisma ORM**
- **PostgreSQL**
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

## 🔐 Autenticação

Todas as rotas (exceto login) são protegidas via token JWT.

- `POST /auth/login`  
  Envia `email` e `senha` e retorna token de acesso.

---

## 🚀 Como Rodar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/emissor-notas-fiscais.git
   cd emissor-notas-fiscais
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados:
   - Crie um `.env` com base no `.env.example`
   - Rode as migrações:
     ```bash
     npx prisma migrate dev
     ```

4. Inicie o servidor:
   ```bash
   npm run dev
   ```

---

## 📘 Documentação da API

Após iniciar o projeto, acesse:

```
http://localhost:3000/api-docs
```

> A documentação é gerada automaticamente via Swagger.

---

## 🧪 Testes

Rode os testes com:

```bash
npm run test
```

---

## ✍️ Autor

Desenvolvido por **[Seu Nome]**  
[linkedin.com/in/seu-perfil](https://linkedin.com/in/seu-perfil)

---

## 🏁 Considerações Finais

Este projeto foi desenvolvido como parte de um desafio backend, com o objetivo de aplicar boas práticas, regras de negócio reais e validações fiscais. Fique à vontade para sugerir melhorias ou entrar em contato!
