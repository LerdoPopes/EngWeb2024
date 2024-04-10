import json

# Função para adicionar IDs às pessoas
def adicionar_ids_arquivo(nome_arquivo):
    # Abrir o arquivo JSON e carregar os dados
    with open(nome_arquivo, 'r') as arquivo:
        dados = json.load(arquivo)
    
    # Iterar sobre cada pessoa no array
    for i, pessoa in enumerate(dados['pessoas'], start=1):
        # Adicionar o campo "id" à pessoa atual com um valor único (por exemplo, o índice)
        pessoa["id"] = i
    
    # Escrever os dados modificados de volta para o arquivo JSON
    with open(nome_arquivo, 'w') as arquivo:
        json.dump(dados, arquivo, indent=4)

# Nome do arquivo JSON
nome_arquivo = 'datasets/dataset.json'

# Chamar a função para adicionar IDs às pessoas no arquivo JSON
adicionar_ids_arquivo(nome_arquivo)
