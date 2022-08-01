# 2022-1-PUMA-ProjectService

## Objetivo

Esse serviço é responsável por lidar com todas as operações que envolvem projetos e propostas de projeto no Puma.

### Como rodar

Para utilizar o projeto com todos os microsserviços, siga as intruções de como rodar no [Api Gateway](https://github.com/fga-eps-mds/2021-1-PUMA-ApiGateway). Para rodar este serviço individualmente, execute:

``` $ sudo docker build -t projectservice -f dev.Dockerfile . ```

``` $ sudo docker run -p 3000:3000 userservice ```

Para rodar os testes, execute:

``` $ sudo make test```

``` $ sudo make test-debug```

É necessário preencher o arquivo .env na raiz com as informações necessárias.
