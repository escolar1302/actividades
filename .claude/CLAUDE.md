# Instrucciones para Claude

Sitio estático de actividades escolares en PDF, publicado en https://www.actividades.com.ar/
con GitHub Pages desde la rama `main`.

## Publicación

- Todo lo que llega a `main` se publica en el sitio. Hacer `git push` solo cuando yo lo pida.
- No añadir un archivo `.nojekyll`: esta carpeta `.claude/` se publicaría en el sitio.
- No modificar ni borrar `CNAME`: mantiene el dominio del sitio.
- El repositorio es público: este archivo se puede leer en GitHub. No guardar aquí datos privados.

## Estructura

- `index.html`: página principal.
- `numeracion/`, `operaciones/`, `problemas/`: PDF de actividades por tema.

## Cómo trabajo

Trabajo mayormente solo y en más de una computadora. En algunos repositorios colabora otra persona.

## Git

### Al empezar a trabajar

Cada vez que empiezo a trabajar, antes de hacer cualquier otra cosa:

1. Ejecutar `git fetch` y comparar la copia local con el remoto.
2. Avisarme si la copia local está atrasada, adelantada o si divergió del remoto.
3. Avisarme si hay pull requests abiertos.

### Trabajar siempre en lo último

Siempre tenemos que trabajar sobre la última versión. Antes de empezar un cambio, si la copia
local está atrasada, hacer `git pull` y decírmelo. Si no se puede actualizar sin conflictos
(hay trabajo local que choca con el remoto o las ramas divergieron), parar y preguntarme.

### Cuando pregunto por el estado

Decirme qué existe en mi computadora y todavía no está en el remoto, y al revés. Incluir commits
sin subir, commits sin bajar y archivos nuevos o modificados.

### Vocabulario

- "Bajar" significa `git pull`.
- "Subir" significa `git push`.

### Pull requests

- Si hay pull requests abiertos, avisarme.
- Referirse a ellos como "solicitudes de cambio pedidas por <usuario>", usando el autor del pull request.
