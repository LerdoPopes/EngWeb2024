import json

# Abrir o arquivo JSON e ler o conteúdo
with open('filmes.json', 'r') as file:
    data = file.read()

# Remover quebras de linha extras e espaços em branco
data = data.replace('\n', '').replace(' ', '')

# Adicionar vírgulas entre os elementos
data = data.replace('}{', '},{')

# Escrever de volta no arquivo
with open('bla.json', 'w') as file:
    file.write(data)

# Carregar e imprimir o arquivo JSON para verificar se as vírgulas foram adicionadas corretamente
with open('bla.json', 'r') as file:
    data = json.load(file)
    print(json.dumps(data, indent=4))