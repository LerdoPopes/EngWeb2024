import json

def edit_Json(file_path):
    count_periodo=1
    count = 0

    new_json = {
        "compositores": [],
        "periodos":[]
    }
    
    with open(file_path, 'r') as arquivo:
        jsonData = json.load(arquivo)
        
        new_json["compositores"].extend(jsonData["compositores"])
    # Listas para armazenar informações de cast e genres
        periodos_list = []

        # Itera sobre cada filme no array 'filmes'
        for compositor in jsonData["compositores"]:
            # Adiciona informações de genres à lista 'genres_list'
            if "periodo" in compositor:
                periodo = compositor["periodo"]
                if periodo not in periodos_list:
                    new_periodo={
                        "id": periodo
                    }
                    periodos_list.append(periodo)
                    new_json["periodos"].append(new_periodo)
                    count_periodo += 1
    
    with open("compositoresv2.json", 'w+') as new_file:
        json.dump(new_json, new_file, indent=2)

file_path = "compositores.json"
edit_Json(file_path)