import json

def edit_Json(file_path):
    count_genre=1
    count_cast=1
    count = 0

    new_json = {
        "films": [],
        "cast":[],
        "genres":[],
    }
    
    with open(file_path, 'r') as arquivo:
        jsonData = json.load(arquivo)
        
        new_json["films"].extend(jsonData["filmes"])
    # Listas para armazenar informações de cast e genres
        cast_list = []
        genres_list = []

        # Itera sobre cada filme no array 'filmes'
        for filme in jsonData["filmes"]:
            print(count)
            count += 1
            # Adiciona informações de cast à lista 'cast_list'
            for ator in filme["cast"]:
                if ator not in cast_list:
                    new_cast={
                        "id": f'a{count_cast}',
                        "actor": ator,
                    }
                    cast_list.append(ator)
                    new_json["cast"].append(new_cast)
                    count_cast += 1
            # Adiciona informações de genres à lista 'genres_list'
            for genre in filme["genres"]:
                if genre not in genres_list:
                    new_genre={
                        "id": f'g{count_genre}',
                        "genre": genre,
                    }
                    genres_list.append(genre)
                    new_json["genres"].append(new_genre)
                    count_genre += 1
    
    with open("filmesv2.json", 'w+') as new_file:
        json.dump(new_json, new_file, indent=2)



file_path = "filmes.json"
edit_Json(file_path)