# CloudPrep

Simulador web de certificaciones AWS y Microsoft Azure. Puedes practicar en español o inglés, revisar tus errores y seguir tu avance por examen, tema y proveedor.

## Ejecutar en local

Abre `dist/index.html` en el navegador. También puedes servir la app desde la raíz del repositorio con Python:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory dist
```

En ese caso, abre [http://127.0.0.1:8000](http://127.0.0.1:8000). La app es estática y no necesita instalar dependencias ni compilar.

## Practicar

1. En **Certificaciones**, elige un examen y el idioma. Para Azure también puedes elegir 40, 50 o 60 preguntas.
2. Al terminar, consulta **Temas que debes reforzar**. El resultado ordena los temas por porcentaje de aciertos y muestra las respuestas incorrectas y las omitidas.
3. Pulsa **Repasar errores** para volver a responder únicamente las preguntas que marcaste mal en ese intento. El repaso conserva el idioma, permite practicar sin cronómetro y queda registrado en **Historial**. Los aciertos del repaso cuentan para el dominio del banco. Las gráficas de rendimiento se calculan con los simulacros completos.
4. En **Resumen**, consulta las barras de certificaciones practicadas y las gráficas de aciertos de los últimos siete días para AWS y Azure.

El banco incluye preguntas originales de práctica y variantes de escenarios. Consulta los temarios y formatos en las [guías de AWS](https://docs.aws.amazon.com/aws-certification/latest/examguides/) y el [catálogo de Azure](https://learn.microsoft.com/en-us/credentials/browse/?credential_types=certification&products=azure).

El historial y el intento activo se guardan en el almacenamiento local del navegador. Usa el mismo perfil y la misma dirección para recuperar tu progreso.

## Subir a GitHub

Crea un repositorio vacío en GitHub. Ejecuta estos comandos desde la carpeta `cloudprep` y sustituye la URL de ejemplo por la de tu repositorio:

```sh
git add README.md .gitignore dist/
git commit -m "Agrega simulador CloudPrep"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

`dist/` contiene los archivos de la app y se versiona en Git.
