## EngWeb2024

**Título:** TPC5 De EngWeb

**Autor:** Pedro Afonso Moreira Lopes, A100759

## Introdução

Neste trabalho, o objetivo principal era o desenvolvimento de um sistema de gerenciamento de compositores e períodos musicais, desenvolvido para facilitar o armazenamento e a visualização de informações relacionadas a esses artistas e seus respectivos períodos históricos.

Isto seria feito através de um servidor em JS e o uso da framework Express, criando as principais rotas `/compositores`, `/periodos`, `/compositores/{id}` e `periodos/{id}`.

## Explicação da resolução do exercício:

**Alteração do Ficheiro JSON**

Antes de tudo, tal como no TPC anterior, primeiro é feita a criação do array de elementos de períodos, para assim ser mais fácil o tratamento das rotas relacionadas aos períodos. Isto foi feito através do script `jsonFixer.py`, o que levou à criação ficheiro JSON utilizado na resolução deste exercício `compositoresv2.json`. Para fazer isto, basta correr:

```
python jsonFixer.py
``` 

**Desenvolvimento das operações CRUD**

Com isto feito, falta agora a parte principal deste trabalho: as operações CRUD. Para isto, foram criados casos específicos para cada operação nos scripts `compositores.js`,`periodos.js` e `index.js`, quer o pedido fosse GET ou POST. 

**Criação das páginas**

Dentro de cada operação destas, devido à diferente framework utilizada neste trabalho, tiveram também que ser criadas "templates" destas páginas, que se situam armazenadas na pasta `views`, que vai ser responsável por exportar os templates das páginas PUG para os scripts principais, sendo assim possível a construção e visualização das páginas.

**Aparência das páginas**

Tal e qual como no trabalho anterior, como as páginas foram apenas desenvolvidas numa framework diferente e com o mesmo CSS, as páginas manteram assim a mesma aparência.

**Execução do código**

Para a execução, após a correção do ficheiro JSON, basta executar os seguintes comandos:

```
json-server --port 17001 --watch compositoresv2.json
``` 
e
``` 
npm start
``` 

Depois disto, é inserir o seguinte link no motor de busca, com a porta específica 3000:

```
http://localhost:3000/
```


