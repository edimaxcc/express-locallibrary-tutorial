# Node.js/Express aplicación
Aplicación desarrollada con orientaciones del sitio https://developer.mozilla.org
express-locallibrary-tutorial

## biblioteca Libre
Hola bienvenido a mi repositorio. está es mi primer aplicación web utilizando node.js junto con Express. Aunque no es una aplicación de grande porte pero ya es possible hacer mucha cosas com está grande herraminta. El objetivo es poner más funcionalidades ha esta aplicación y así seguiré.

### Dependencias

- Pug 2.0.0-beta11
- Morgan 1.9.0
- mongoose 5.0.12
- moment 2.22.0
- http-errors 1.6.2
- express-validator 5.1.2
- debug 2.6.9
- cookie-parser 1.4.3
- async 2.6.0  

### Estructura, Estilo, Database y Seguridad

> MVC Estructura

Si usted es un desarrollador o tiene conocimiento con ruby on rails no tendrá mucha dificultad para entender el estándar MVC pues esta aplicación sigue este modelo.
- model
- View
- Controller

El uso del estándar MVC se traduce como un beneficio aislar las reglas de negocio de la lógica de presentación, la interfaz de usuario. Esto permite la existencia de varias interfaces con el usuario que pueden ser modificadas sin necesidad de cambiar las reglas de negocio, proporcionando así más flexibilidad y oportunidades de reutilización de las clases.

> MongoDB Database noSql

MongoDB es un documento de almacenamiento diseñado para un alto rendimiento, una alta disponibilidad y una escalada automática. Los documentos se guardan en un formato BSON (JSON binario) y los valores de campo aparte de los tipos JSON usuales pueden incluir otros documentos, matrices y matrices de documentos. Cada campo puede ser indexado y consultado.

> Express Validator

para ganrantizar que nostra aplicación recebera los datos corretos, utilizamos
express-validation que es un middleware que valida el cuerpo, params, query, headers y cookies de una solicitud y devuelve una respuesta con errores; si alguna de las reglas de validación configuradas falla.

> Boostrap

Bootstrap es un framework desarrollado y liberado por Twitter que tiene como objetivo facilitar el diseño web. Permite crear de forma sencilla webs de diseño adaptable, es decir, que se ajusten a cualquier dispositivo y tamaño de pantalla y siempre se vean igual de bien. Es Open Source o código abierto, por lo que lo podemos usar de forma gratuita y sin restricciones.

### Como utilizar esta aplicación?

como ustedes pueden ver no he hecho upload la pasta node_modules, que toda via haz necessario para que nostra Aplicación fucione coretamente. para poner todo en ordern abra el command line "cmd" o terminal  y en el directorio de la aplicación entre con el comando.

> npm install  
