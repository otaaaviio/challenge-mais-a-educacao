### Otávio Gonçalves Lamberty

Olá, nesse arquivo explico as decisões tomadas durante o desenvolvimento do projeto.

## Decisão da arquitetura utilizada

### Backend

Para o backend, foi utilizado:

- Nest com TS para o desenvolvimento da API
- Prisma para ORM
- PostgreSQL como banco de dados
- Docker para containerização
- Jest para testes unitários e e2e
- Redis para cache
- JWT para autenticação
- bcrypt para criptografia de senhas
- zod para validação de dados
- casual para geração de dados fictícios e factories

Todos esses componentes foram escolhidos por serem tecnologias que tenho mais familiaridade e por serem tecnologias que se encaixam bem no contexto do desafio.

### Frontend

Para o frontend, foi utilizado:

- Vue com TS para o desenvolvimento da aplicação
- Vuetify para estilização
- Docker para containerização
- i18n para internacionalização
- NGINX para servir a aplicação
- Axios para requisições HTTP
- Toastify para notificações na tela do usuário

Como o backend, as tecnologias foram escolhidas por serem tecnologias que tenho mais familiaridade e por serem tecnologias que se encaixam bem no contexto do desafio.

Para ambos usei Lint e Prettier para padronização de código, sendo escrito totalmente em inglês, incluindo README tanto no frontend quanto no backend.
Os READMEs foram escritos para serem claros e objetivos, com instruções de como rodar o projeto, explicações mais detalhadas e imagens para ilustrar o funcionamento
(recomendo fortemente que leia os READMEs para entender melhor o funcionamento do projeto).

## O que eu melhoraria se tivesse mais tempo

Eu melhoraria a cobertura de testes na parte do Backend, adicionaria Swagger para documentação da API, melhoraria a interface do usuário com feedbacks visuais e melhor responsividade.
Também adicionaria mais funcionalidades, como, por exemplo, um dashboard para administradores com estatísticas e gráficos.
E por último configuraria um CI/CD para automatizar os testes e deploy.

