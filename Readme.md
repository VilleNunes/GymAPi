# 🏋️‍♂️ **GymAPI** – API de Check-ins para Academias

API RESTful para gerenciamento de check-ins em academias, com recursos de geolocalização, autenticação de usuários e validação por administradores.

---

## 📌 **Objetivo**

A **GymAPI** foi criada para facilitar e automatizar a gestão de acesso em academias, oferecendo funcionalidades modernas como:

- 🧭 Localização de academias próximas ao usuário  
- 📍 Realização de check-ins com validação  
- 📊 Consulta ao histórico de visitas  
- 🛡️ Controle administrativo de registros e academias

---

## ✅ **Funcionalidades Principais**

- 🔐 Cadastro e autenticação de usuários (via JWT)  
- 👤 Consulta de perfil e histórico pessoal de check-ins  
- 🔎 Busca por academias (por proximidade ou nome)  
- 📥 Realização de check-in em uma academia  
- ✔️ Validação manual de check-ins por administradores  
- 🏢 Cadastro e gerenciamento de academias (admin only)

---

## 🛠️ **Tecnologias Utilizadas**

| Tecnologia     | Finalidade                          |
|----------------|-------------------------------------|
| **Fastify**    | Framework web ultra rápido          |
| **TypeScript** | Tipagem estática para maior robustez|
| **Prisma ORM** | Abstração e manipulação de dados    |
| **PostgreSQL** | Banco de dados relacional           |
| **Zod**        | Validação de schemas                |
| **bcrypt**     | Criptografia de senhas              |
| **JWT**        | Autenticação baseada em tokens      |
| **Docker**     | Contêinerização e deploy            |
| **Vitest**     | Testes unitários                    |

---

## 🚀 **Como rodar o projeto (resumo)**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gymapi.git
cd gymapi

# Instale as dependências
npm install

# Configure as variáveis de ambiente (.env)

# Rode a aplicação em desenvolvimento
npm run dev
