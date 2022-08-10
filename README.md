# 2022-1-PUMA-ProjectService

## Objetivo

Esse serviço é responsável por lidar com todas as operações que envolvem projetos e propostas de projeto no Puma. Interage com o banco de dados ao fazer:
- Inserts, deletes e consultas em lectures relacionamento entre PROFESSOR e SUBJECT  
- Consultas em PROFESSOR 
- Inserts e consultas em KEYWORDS 
- Insert, deletes e consultas em abstracts relacionamento entre KEYWORD e SUBJECT 
- Inserts e consultas em SUBJECT 
- Inserts, deletes e consultas em summarize relacionamento entre KEYWORDS e SUBJECT 
- Inserts e consultas em KNOWLEDGE_AREA 
- Inserts e consultas em PROJECT 
- Consultas com SEMESTER 
- Inserts e consultas em SUBAREA  
- Inserts e consultas em identifies relacionamento entre SUBJECT e SUBARES 
- Inserts e consultas em SUBJECT 

## Endpoints

### Alternativa de Keywords 

Esse endpoint coleta _summarize_ com base no _subject_, _keyword_, _lectures_ e _professor_

#### GET  
```
/keyword
```

### Criar uma Keyword

Esse endpoint cria uma nova _keyword_

#### POST  
```
/keyword
body: {keyword: <keyword>}
```

### Editar uma Keyword

Esse endpoint edita uma _keyword_

#### PUT  
```
/keyword
body: {keywordid: <id_keyword>, newKeyword: <nova_keyword>}
```

### Criar um summarize

Esse endpoint cria um _summarize_ com base na id da keyword e id do subject

#### POST  
```
/keyword/subject
body: {keywordid: <id_keyword>, subjectid: <id_subject>}
```

### Editar um summarize

Esse endpoint edita um _summarize_ com base na id da keyword e id do subject

#### PUT  
```
/keyword/subject
body: {keywordid: <id_keyword>, subjectid: <id_subject>}
```

### Deleta uma Keyword

Esse endpoint deleta uma _keyword_

#### DELETE  
```
/keyword/:keywordid
```

### Cria um Project

Esse endpoint cria um _project_

#### POST  
```
/project
body: {name: <name>,problem: <problem>,expectedresult: <expectedresult>,status: <status>,userid: <userid>,subjectid: <subjectid>,createdat: <createdat>}
```

### Edita um Project

Esse endpoint edita um _project_

#### PUT  
```
/project
body: {name: <name>,problem: <problem>,expectedresult: <expectedresult>,status: <status>,userid: <userid>,subjectid: <subjectid>}
```

### Avaliar um Project

Esse endpoint avalia um _project_

#### PUT  
```
/project/evaluate
body: {projectId: <projectId>, status: <status>, feedback: <feedback>}
```

### Realoca um Project

Esse endpoint realoca um _project_

#### PUT  
```
/project/reallocate
body: {projectId: <projectId>, status: <status>, feedback: <feedback>, subjectId: <subjectId>}
```
### Keywords disponiveis para um Projeto 

Esse endpoint encontra _keywords_ disponiveis para um _project_

#### GET 
```
/project/keywords
```

### Propostas de projetos 

Esse endpoint encontra propostas de projetos basedos no usuário que fez a requisição

#### GET 
```
/userProposals/:userId
```

### Projeto

Esse endpoint encontra um _project_ por seu id

#### GET 
```
/project/:projectId
```

### Deletar Projeto

Esse endpoint deleta um _project_ por seu id

#### DELETE 
```
/project/:projectId
```

### Como rodar

Para utilizar o projeto com todos os microsserviços, siga as intruções de como rodar no [Api Gateway](https://github.com/fga-eps-mds/2021-1-PUMA-ApiGateway). Para rodar este serviço individualmente, execute:

``` $ sudo docker build -t projectservice -f dev.Dockerfile . ```

``` $ sudo docker run -p 3000:3000 userservice ```

Para rodar os testes, execute:

``` $ sudo make test```

``` $ sudo make test-debug```

É necessário preencher o arquivo .env na raiz com as informações necessárias.
