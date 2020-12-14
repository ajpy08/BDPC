# BDPC
Backend developer position challenge

# Instalación
```console
$ npm install
```

# Uso
Consultas en Postman
<https://www.getpostman.com/collections/a9e3ad4e34c931432e57/>.

El archivo env.variables.json se enviará por correo.


* **CRUD Professors**

* **CRUD Students**

* **CRUD Courses**
  - getCoursesStudents.- Devuelve cursos y que estudiantes tienen acceso.

* **CRUD Lessons**
  - getLessonDetails.- Devuelve detalles de una lección pasando como parametro el id de una lección.
  - getLessonsByCourse.- Devuelve las lecciones que tiene un curso y que estudiantes tienen acceso.
  - gradeLesson.- Califica todas las preguntas de una lección por cada tipo de pregunta y cambia el curso 
  de cada estudiante si aprobo la lección.
  
* **CRUD Questions**

* **ApiKey**
  - Creación y Validación de ApiKey Válida
  
* **Framework**
NodeJS

## Librerias

* **express**: Use express ya que es una infraestructura de aplicaciones web 
  Node.js mínima y flexible que proporciona un conjunto sólido de características 
  para las aplicaciones web.
* **Moongose**: Utilice ésta libreria ya que facilita la creación de esquemas,
  contiene validación y middleware, populate, etc. La principal ventaja es la 
  abstracción sobre el mongo puro.
  
* **Nodemon**: Utilice ésta libreria ya que facilita la ejecución de nuestra aplicación
ya que siempre está esperando cambios para el servidor.uuid

* **uuid**: Utilice ésta libreria para generar guids aleatorios.



* **I.S.C. Angel Javier Puc Yamá** &lt;angelpuc08@gmail.com&gt;
