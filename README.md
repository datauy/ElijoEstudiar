# ElijoEstudiar

## Origen
El proyecto Elijo Estudiar comienza con la presentación de la idea por parte de DATA Uruguay al llamado del fondo de la Alianza Latinoamericana para la Tecnología Cívica (ALTEC), una alianza entre Avina y Luminate en 2017. El mismo es seleccionado y comienza el proceso de desarrollo y acompañamiento del proyecto, junto a otros 10 proyectos de tecnología cívica de América Latina.

Localmente, el proyecto genera su primera alianza con UNICEF Uruguay, con quiénes DATA Uruguay ya había colaborado en otro proyecto de educación (ver “Antecedentes”). Se concreta con la autorización de CODICEN para la participación de ANEP y los subsistemas (CEIP, CES, CETP y CFE) que proveen los conocimientos, datos y retroalimentación para el diseño e implementación del proyecto.

## Objetivos
---
El proyecto se propone ofrecer una manera simple y rica de visualizar información y datos existentes de gran utilidad, pero dispersos en distintas áreas de gestión y no necesariamente accesibles para el público en general. En ese proceso, el proyecto también ordena la información -usualmente de gestión y orientada al uso interno- de maneras que permiten presentarla en una lógica orientada al usuario/a.

De forma secundaria, se procura también disponibilizar la mayor cantidad de información en formatos abiertos, para fomentar el reuso de la misma en otras iniciativas.

Por último, pero no menos importante, se busca establecer vínculos entre los actores involucrados bajo los principios del gobierno abierto, fomentando la adopción de éstas prácticas entre los actores y con otros a futuro.

## Antecedentes
---
DATA Uruguay ha trabajado junto a diversas organizaciones aliadas en una serie de herramientas de temáticas como salud, servicios públicos, derechos humanos y sostenibilidad, entre otros temas (por más detalles consultar sitio web o Dossier DATA Uruguay). 

Entre ellas se cuenta Derechos del Estudiante, un proyecto en colaboración con UNICEF Uruguay, el Consejo de Educación Secundaria (CES) y el Consejo de Educación Técnico Profesional (CETP). En el mismo se listan derechos de estudiantes de secundaria y CETP, y se proveen mecanismos de consulta que a su vez dejan públicamente las respuestas para facilitar el acceso a ese conocimiento.

Éste primer proyecto relacionado con educación, así como la alianza con UNICEF Uruguay sentó las bases de la idea inicial y del trabajo posterior de este proyecto con nuevos aliados a través de ANEP.

## Datos abiertos que utiliza la aplicación
---
Los datos utilizados en esta aplicación se encuentran disponibles para su reutilización a través del Catálogo Nacional de Datos Abiertos de AGESIC y otras fuentes, como datos abiertos, en formatos abiertos.

* ANEP - Centros educativos y oferta educativa
* INE - Mapas vectoriales (departamentos)
* IDE.uy - Localidades de Uruguay

Otros datos

* Banasevich, Isabel et al. Liceos del Uruguay. Montevideo: CES, 2008.

Los organismos estatales del sector público recogen, producen, reproducen y difunden datos para cumplir con su función pública. Incorporar la publicación de datos públicos en formatos abiertos abre la puerta a la posibilidad de que los mismos sean reutilizados en nuevos proyectos, que puedan combinarse con otras fuentes de datos y generar nuevas aplicaciones desarrolladas por el gobierno, por la sociedad civil, organizaciones, empresas o ciudadanos en general.

## Procesamiento de datos
---
Los análisis y visualizaciones provistos por esta aplicación son realizados por DATA Uruguay. Estas operaciones están disponibles para consulta a través del código de la aplicación disponible en GitHub, así como el resto del código fuente. De cualquier manera se detallan a continuación algunas definiciones clave para el procesamiento de los datos y presentación de resultados.

### Turnos
La herramienta procura evitar ocultar a los/as usuarios/as información erróneamente, por lo que se aplica una política de filtros, donde si la certeza es baja, se opta por incluir información en los resultados, en lugar de excluirla. A modo de ejemplo; contamos con filtros para turnos que son “Matutino”, “Vespertino”, “Nocturno” y “Completo/Extendido”, que sirven para la enorme mayoría de la información disponible. Sin embargo, existen otros turnos que no están asociados al horario como por ejemplo “Rural”. En una búsqueda por filtrando únicamente a turno “Matutino”, se mostrarán también en los resultados, aquellos turnos que no sean “Matutino”, pero tampoco “Vespertino”, “Nocturno” y “Completo/Extendido”, de forma de evitar infomración que podría ser útil.

### Filtros
De la misma forma, se procura siempre ofrecer resultados a la búsqueda, así sea que ésto implique ampliar el criterio. Si por ejemplo se está buscando un curso específico en una localidad donde no está disponible, el resultado no será nulo, sino que se mostrarán las opciones disponibles en otras partes del país.

### Correcciones ortográficas
Los datos fuente originales, por diversas causas relacionadas con el origen y archivo de los mismos en sistemas antiguos, están disponiobles únicamente en mayúsculas y sin el uso de tildes. Para proveer una mejor experiencia de usuario, se adaptaron éstas bases originales para corregir éstos defectos y algunas correcciones ortográficas. Aunque se tomaron los máximos recaudos para evitar introducir errores en éste proceso, recomendamos utilizar para procesamientos los datos originales, enlazados en la sección “Datos abiertos que utiliza la aplicación” de este documento. Los datos reprocesados  igualmente se encuentran disponibles en el Catálogo Nacional de Datos Abiertos.

### Diccionario de sinónimos
Para facilitar búsquedas de cursos y niveles, se elaboró un diccionario de palabras que se usan coloquialmente para referirse a éstos, lo que permite etiquetarlos y ofrecerlos como resultado cuando se utilizan esas palabras. Por ejemplo, la palabras “tercero” ofrecerá tanto “Escuela común” (CEIP) como “Ciclo básico” (CES) entre sus resultados.

### Previaturas
En los datos abiertos que utiliza la aplicación, se incluyen las previaturas que permiten acceder a cada curso. Como una forma de facilitar las consultas, usamos esta información para sugerirle a los/as usuarios/as qué previas se deben cursar para un curso, cuando la persona no tiene los requerimientos necesarios. Ésta información se brinda como ayuda, pero pueden existir otras opciones o cambios en las previaturas. Ante dudas sobre el nivel al que es posible acceder, se recomienda consultar en los centros de estudio, o en DerechosDeEstudiantes.edu.uy.
El árbol de previaturas generado a partir de esta información se encuentra disponibles en el Catálogo Nacional de Datos Abiertos.

## Disponibilidad del código como software libre
DATA Uruguay incentiva la reutilización de este software para cualquier propósito, brindándolo bajo licencia GPLv3 para que otras organizaciones, gobiernos, empresas o ciudadanos puedan sacar provecho del trabajo aquí realizado.
https://github.com/datauy/ElijoEstudiar/

## Contacto
En caso de consultas sobre la aplicación, DATA Uruguay o contactos de prensa puede dirigirse a contacto@datauy.org. También estamos disponibles a través de nuestras cuentas de Twitter, Facebook e Instagram.
Como la mayoría de los proyectos que trabajan con datos abiertos y software libre, la retroalimentación de los usuarios es una herramienta fundamental para la mejora de los datos y su tratamiento, por lo que agradecemos e incentivamos la recepción de ideas, sugerencias o correcciones.

En la web de DATA puede encontrarse un kit de prensa de la organización conteniendo material gráfico, así como un kit de prensa del proyecto.

## Términos y condiciones
La prestación de este servicio tiene carácter gratuito para los usuarios. Los usuarios se obligan a hacer buen uso del sitio web y de sus contenidos, respetando la normativa nacional vigente, las buenas costumbres y el orden público, comprometiéndose en todos los casos a no causar daños al mismo ni a ningún tercero. A tal efecto, el Usuario se abstendrá de utilizar cualquiera de los servicios con fines o efectos ilícitos, prohibidos en los presentes Términos y condiciones, lesivos de los derechos e intereses de terceros, o que de cualquier forma puedan dañar, inutilizar, sobrecargar, deteriorar o impedir la normal utilización de los servicios, documentos y toda clase de contenidos en cualquier equipo informático o de otros Usuarios.

Para asegurarnos de que la aplicación esté acorde a las necesidades de nuestros usuarios, e intentar mejorarla utilizamos Google Analytics para recolectar información sobre cómo se utiliza. Google Analytics almacena información como qué páginas ha visitado, cuánto tiempo ha navegado en las mismas, cómo llegó a la página, qué elementos clikea e información sobre qué navegador utiliza. Su dirección IP es enmascarada (parcialmente almacenada) y la información personal sólo es reportada en forma no individualizada (agregada). No permitimos a Google usar o compartir nuestros datos analíticos para ningún propósito además de proveernos de información analítica y recomendamos que todo usuario de Google Analytics siga la misma política.

## Lenguaje inclusivo
En la elaboración de este material se ha buscado que el lenguaje no invisibilice ni discrimine a las mujeres y a la vez que el uso reiterado de “ /o”, “/a”, “los y las”, etcétera, no dificulte la lectura. En la página 9 de la siguiente publicación se puede encontrar recomendaciones al respecto: [Guía de Lenguaje Inclusivo - INMUJERES](http://www.inmujeres.gub.uy/innovaportal/file/21498/1/15guia_de_lenguaje_inclusivo.pdf).

## Acerca de DATA
Somos una organización de la sociedad civil que trabaja creando herramientas sociales para promover la participación y el debate público a través de la transparencia, datos abiertos y acceso a la información.
* www.datauy.org
* https://twitter.com/datauy
* https://facebook.com/datauruguay
* https://instagram.com/datauy

## ¿Qué son los datos abiertos?
El estado recoge y produce datos para cumplir con su función. Su publicación en formatos abiertos permite que sean reutilizados por el gobierno, sociedad civil, organizaciones, empresas o ciudadanos en general.
www.catalogodatos.gub.uy
