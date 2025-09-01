FROM node:22-alpine

ENV APP_PORT=3000
ENV NODE_ENV=development
ENV WORKDIR_APP=/home/app/consumer

# Establece el directorio de trabajo dentro del contenedor
WORKDIR ${WORKDIR_APP}

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación al directorio de trabajo
COPY . .

# Instala las dependencias
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación
# O el puerto que use tu aplicación NestJS
EXPOSE 3000 

# Comando para iniciar la aplicación
# O el script de inicio de tu proyecto
CMD [ "npm", "run", "start:dev" ] 