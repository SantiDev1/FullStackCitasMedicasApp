# Aplicacion web para la gestion de Citas Medicas

Nuestra aplicación ofrece una solución intuitiva y eficiente para la solicitud de citas médicas. Diseñada para facilitar el proceso tanto para pacientes como para profesionales de la salud, permite gestionar citas de manera cómoda y segura. Con características que optimizan la experiencia del usuario, como la disponibilidad en tiempo real y recordatorios automáticos, buscamos mejorar el acceso y la atención médica.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Uso](#uso)
5. [Contribución](#contribución)
6. [Licencia](#licencia)
7. [Test](#test)
8. [Documentacion Back end](#DocumentacionBackend)

## Requisitos

- Node.js (versión 18.13.0)
- Angular CLI (versión  17.3.1)

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/SantiDev1/AppFullStackCitasMedicas.git
   cd tu-repositorio

2. instala las dependencias usando npm:
   
npm install

3. Si es necesario, instala Angular CLI globalmente:

npm install -g @angular/cli

## Configuración

1. Configura las variables de entorno si es necesario. en el archivo  settings/appsettings.ts

   export const appsettings= {
    apiUrl: "https://localhost:7083"
}

## Uso

Para iniciar la aplicación en modo de desarrollo, ejecuta:

    ```bash
    ng serve

    Luego, abre tu navegador y visita http://localhost:4200.

    Para construir el proyecto para producción, ejecuta:

    ng build --prod

    Los archivos de salida se generarán en el directorio dist/.

## Contribución

Si quieres contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Clona tu fork localmente.
3. Crea una nueva rama para tu contribución:

   ```bash
   git checkout -b mi-contribucion

   Haz commit de tus cambios:

   git commit -m "Descripción de mi contribución"
Haz push de tu rama:

git push origin mi-contribucion

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

## Test

Ejecuta ng test para realizar los respectivos test

#DocumentacionBackend

Visita esta url para ver la documentacion del back end https://drive.google.com/file/d/12eH_7V8UCBofUeRo5oWbLmKIE7-ZzS3Z/view?usp=sharing
