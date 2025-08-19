## Colocar o db no ar localmente para testar 

na pasta do projeto executar o comando no git bash:

1. Acessar pasta pelo bash: cd zombieplus
2. Excutar: docker-compose up -d

## Acessar o postgree local e registrar o servidor

1. Registrar o servidor novamente com o botão direito clicar em register
2. Nome do servidor: pgdb
3. usuário: postgres
4. pwd123

# Criar o banco de dados

1. botão direito em create
2. selecionar database
3. nome zombieplus


## API
# Dentro da pasta api rode o comando para recriar a estrutura de dados

- rode:  ./db.sh
  (caso de erro rode: npm install --save-dev sequelize-cli)

 ## Colocar a api e web no ar

  - npm run dev dentro de cada pasta

## comandos

Verifica as imagens
  docker ps -a

## Apaga de vez ambiente no PostgreSQL

No bash: docker-compose down


# OBSERVAÇÃO

sempre que reinicinar a maquina abra o docker Desktop e vá em container e clique no projeto

Depois coloque as aplicações no ar api e web

- rode: npm run dev dentro da pasta web e api para coloca-las no ar
