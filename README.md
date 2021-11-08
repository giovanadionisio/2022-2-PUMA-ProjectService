# 2021-1-PUMA-ProjectService
[![Build Status](https://dev.azure.com/puma-eps/Puma/_apis/build/status/ProjectService-CI)](https://dev.azure.com/puma-eps/Puma/_build/latest?definitionId=9)
![Azure DevOps coverage](https://img.shields.io/azure-devops/coverage/puma-eps/Puma/9?style=flat-square)

## Objetivo

Esse serviço é responsável por lidar com todas as operações que envolvem projetos e propostas de projeto no Puma.

### Como rodar

Para utilizar o projeto com todos os microsserviços, siga as intruções de como rodar no [Api Gateway](https://github.com/fga-eps-mds/2021-1-PUMA-ApiGateway). Para rodar este serviço individualmente, execute:

``` $ sudo docker build -t projectservice -f dev.Dockerfile . ```

``` $ sudo docker run -p 3000:3000 userservice ```

Para rodar os testes unitários, execute:

``` $ sudo make test ```

É necessário preencher o arquivo .env na raiz com as informações necessárias
