## EngWeb2024

**Título:** TPC4 De EngWeb

**Autor:** Pedro Afonso Moreira Lopes, A100759

## Introdução

Neste trabalho, o objetivo principal era o desenvolvimento de um sistema de gerenciamento de compositores e períodos musicais, desenvolvido para facilitar o armazenamento e a visualização de informações relacionadas a esses artistas e seus respectivos períodos históricos.

Isto seria feito através de um servidor em JS, criando as principais rotas `/compositores`, `/periodos`, `/compositores/{id}` e `periodos/{id}`.

## Explicação da resolução do exercício:

**Alteração do Ficheiro JSON**

Antes de tudo, primeiro é feita a criação do array de elementos de períodos, para assim ser mais fácil o tratamento das rotas relacionadas aos períodos. Isto foi feito através do script `jsonFixer.py`, o que levou à criação ficheiro JSON utilizado na resolução deste exercício `compositoresv2.json`. Para fazer isto, basta correr:

```
python jsonFixer.py
``` 

**Desenvolvimento das operações CRUD**

Com isto feito, falta agora a parte principal deste trabalho: as operações CRUD. Para isto, foram criados casos específicos para cada operação no script `server.js`, quer o `req.method`fosse GET ou POST. 

**Criação das páginas**

Dentro de cada operação destas, tiveram também que ser criadas "templates" destas páginas, que se situam armazenadas no script `templates.js`, que vai ser responsável por exportar os templates das páginas HTML pro script principal, sendo assim possível a construção e visualização das páginas

**Execução do código**

Para a execução, basta executar os seguintes comandos:

```
json-server --port 17001 --watch compositoresv2.json
``` 
e
``` 
node server.js
``` 


