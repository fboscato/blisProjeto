Sistema operacional linux Ubuntu
Configuração do Docker para Banco de Dados MySQL
Este projeto utiliza o Docker para facilitar a configuração e o gerenciamento do banco de dados MySQL. A seguir, explicamos como configurar e rodar o banco de dados em um contêiner Docker usando o arquivo docker-compose.yml.
Como rodar o MySQL com Docker
Certifique-se de ter o Docker e o Docker Compose instalados:

Instalar Docker
Instalar Docker Compose
Arquivo docker-compose.yml:

O arquivo docker-compose.yml configura um contêiner Docker para rodar o MySQL. Abaixo está a explicação de cada configuração:

version: '3.8'

services:
  mysql:
    image: bitnami/mysql:latest               # Imagem do Docker para MySQL
    environment:
      - MYSQL_ROOT_PASSWORD=docker           # Senha do usuário root do MySQL
      - MYSQL_USER=docker                    # Nome do usuário customizado
      - MYSQL_PASSWORD=docker                # Senha do usuário customizado
      - MYSQL_DATABASE=api-blis              # Nome do banco de dados a ser criado
    ports:
      - "3306:3306"                          # Mapeamento da porta do MySQL
    volumes:
      - mysql_data:/bitnami/mysql           # Volume persistente para dados
      - ./scripts:/docker-entrypoint-initdb.d # Scripts de inicialização no contêiner
    restart: unless-stopped                   # Reiniciar o contêiner, caso pare

volumes:
  mysql_data:
    driver: local                            # Volume persistente para dados do MySQL

image: bitnami/mysql:latest: Esta linha especifica a imagem do MySQL que será usada no contêiner. A Bitnami fornece imagens de MySQL prontas para uso, com configurações otimizadas para produção.
Rodando o MySQL com Docker Compose:

Depois é so rodar o comado  docker-compose up -d

pra rodar o sistema foi utilozado o npm
deve ser feito um:
  sudo npm install 
para instalar as dependencias necessarias, 
so dar um npm run depois de tudo instalado