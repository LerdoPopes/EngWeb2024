import os
import xml.etree.ElementTree as ET
import re

# Função para remover tags XML de uma string
def clear_tags(text):
    clean = re.compile('<.*?>')
    return re.sub(clean, '', text)


html='''
<!DOCTYPE htlm>
<html>
<head>
    <title>EngWeb2024</title>
    <meta charset="UTF-8">
</head>
<body>

'''

list_ruas=[]

#Para termos todos os nomes presentes nessa pagina
xml_names = [x for x in os.listdir("texto")]
xml_names.sort()

#Criação da pasta para as páginas das ruas
if not os.path.exists("paginas_ruas"):
    os.mkdir("paginas_ruas")

#-----------------------------------------------------------------------------------------------------------------------------------------

#Aqui vai ser processado cada ficheiro XML existente, sendo criadas as páginas HTML através do tratamento dos diferentes elementos no XML:

i=0
while i < len(xml_names):

    tree = ET.parse(f"texto/{xml_names[i]}")
    root = tree.getroot()

    # Encontrar o elemento 'nome' dentro de 'meta'
    street_name = root.find('./meta/nome').text
    list_ruas.append(street_name)
    
    #Esta variável é que vai conter o código HTML da página em si, sendo modificada ao longo do tratamento do ficheiro XML
    html_street=html
    html_street+="<ul>"

    # Adicionar o Nome da Rua 
    html_street+=f"<h1>{street_name}</h1>"
    
    html_street+="<h3>Descrição:</h3>"
    for para in root.findall('.//para'):
        # Obter o texto dentro do elemento 'para'
        texto_para = ET.tostring(para, encoding='unicode', method='text')
        
        # Remover as tags XML do texto e adicionar ao texto final
        texto_final = clear_tags(texto_para.strip()) + "\n"

        # Adicionar o texto ao HTML
        html_street += f"<p>{texto_final}</p>"
    html_street += f"<br><br>"
    
    #Para as casas
    html_street += f"<h3>Casas:</h3>"
    html_street += f"<pre style='margin-left: 20px;'>"

    for casa in root.findall('.//casa'):
        numero_element = casa.find('número')
        if numero_element is not None:
            numero = numero_element.text
            html_street += f"<p><b>Número:</b> {numero}</p>"

        enfiteuta_element = casa.find('enfiteuta')
        if enfiteuta_element is not None:
            enfiteuta = enfiteuta_element.text
            html_street += f"<p><b>Enfiteuta:</b> {enfiteuta}</p>"
        
        foro_element = casa.find('foro')
        if foro_element is not None:
            foro = foro_element.text
            html_street += f"<p><b>Foro:</b> {foro}</p>"
        
        descricao_element = casa.find('desc')
        if descricao_element is not None:
            descricao_limpa = clear_tags(ET.tostring(descricao_element, encoding='unicode'))
            html_street += f"<p><b>Descrição:</b> {descricao_limpa}</p>"

        html_street += f"<br><br>"
    html_street += f"</pre>"

    # Encontrar todas as figuras
    figuras = root.findall('.//figura')
    if figuras:
        html_street += f"<h3>Imagens:</h3>"
        html_street += f"<div style='margin-left: 20px;'>"
        for figura in figuras:
            # Iterar sobre as figuras
            figura_id = figura.get('id')
            imagem_path = figura.find('imagem').get('path')
            legenda = figura.find('legenda').text

            html_street += f"<p>{legenda}</p>"
            html_street += f"<img src='{imagem_path}' alt='Imagem indisponível' style='max-width: 100%; height: auto;'>"
        html_street += f"<br><br>"
        html_street += f"</div>"
    html_street += f"<br><br><br>"

    #Fotos atuais
    html_street += f"<h3>Fotos atuais da rua:</h3>"

    # Listar todos os arquivos no diretoria
    list_img=[]
    for nome_arquivo in os.listdir("atual"):
        if re.match(f"{str(i+1).zfill(2)}-.*", nome_arquivo):
            caminho_imagem = os.path.join("atual", nome_arquivo)
            list_img.append(caminho_imagem)
    #Se existirem imagens atuais, entao estas vao ser exibidas
    if list_img:
        for img in list_img:
            print(img)
            html_street += f"<img src='../{img}' alt='Imagem indisponível' style='max-width: 100%; height: auto;'>"   

    #Para terminar a pagina principal
    html_street+="</ul>"
    html_street+="</body>"
    html_street+="</html>"

    #Para criar a pagina propriamente dita
    file = open(f"paginas_ruas/{i+1}.html","w",encoding="utf-8")
    file.write(html_street)
    file.close()

    i+=1

#Ordenar alfabeticamente as ruas e para associar aos nomes das paginas
list_ruas=list(enumerate(list_ruas,start=1))
list_ruas = sorted(list_ruas, key=lambda x: x[1])

#-----------------------------------Criação da página principal----------------------------------------------

html_principal_pag=html

html_principal_pag+="<ul>"
html_principal_pag+="<h1>Selecione uma das ruas para obter mais informações!</h1>"

i=0
while i < len(list_ruas):
    html_principal_pag+=f"<li><a href='paginas_ruas/{list_ruas[i][0]}.html'>{list_ruas[i][1]}</a></li>"
    i+=1

#Para terminar a pagina principal
html_principal_pag+="</ul>"
html_principal_pag+="</body>"
html_principal_pag+="</html>"

#Para criar a pagina propriamente dita
file = open("main_page.html","w",encoding="utf-8")
file.write(html_principal_pag)
file.close()
    