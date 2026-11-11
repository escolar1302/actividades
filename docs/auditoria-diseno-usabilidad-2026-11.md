# Auditoría de diseño y usabilidad — actividades.com.ar

## Para empezar

Hola! Te dejo una auditoría de diseño y usabilidad de actividades.com.ar, para que decidas qué hacer con cada hallazgo. Este PR no cambia nada del sitio: solo agrega este documento. No hace falta mergearlo; si se mergea, queda publicado en la web. La hice con IA y no se probó con docentes, así que puede tener errores.

Si le pedís a Claude "buscá solicitudes de cambio y guiame en cómo resolverlas", esta es la revisión que te propongo hacer con él:

1. Leer `docs/auditoria-diseno-usabilidad-2026-11.md`, que tiene cada hallazgo con código, comando para comprobarlo y grado de certeza.
2. Comprobar cada hallazgo contra el código actual de `main`. El informe ya tuvo errores, así que ninguno se da por cierto.
3. Mostrarte una tabla con cada hallazgo: si se confirma o no, qué impacto tiene para los docentes, cuánto cuesta arreglarlo y qué recomienda. Ordenada por lo que conviene hacer primero.
4. Recorrer los hallazgos con vos, de a uno, y anotar cuáles querés resolver.
5. No modificar archivos, no hacer commits y no mergear ni cerrar este PR hasta que vos lo indiques. Cada arreglo que elijas conviene que vaya en su propio PR.

Comprobaciones del 10 de noviembre de 2026, sobre el commit `f02ca5d`.

## Resumen

El sitio es una sola página clara y liviana (22 KB) que enlaza 98 de sus 100 PDF. Se ve bien en celular y sus acordeones tienen buen contraste. Los problemas principales están en lo que hay detrás de cada enlace: no se sabe qué ficha es, para qué grado es ni cuánto pesa.

## Alcance y límites

Se revisó `index.html`, se comprobaron los PDF del repo y se midió el sitio publicado a 375 px de ancho. No se evaluó el contenido pedagógico de los PDF. La auditoría se hizo con IA (Claude) y no reemplaza la mirada de una persona especialista. No hubo pruebas con docentes ni datos de uso.

## Auditoría de diseño

- **Contraste:** el texto blanco de los seis paneles da entre 4,88:1 y 7,64:1, por encima del mínimo de 4,5:1.
- **Móvil:** a 375 px no hay desborde horizontal, y los enlaces miden 41 px de alto.
- **Tipografía:** Roboto, cargada correctamente.
- **Imágenes:** el único peso innecesario en la página es `logo1.png` (ACT-10).

## Auditoría de usabilidad

- **Encontrar una ficha:** hay 83 enlaces llamados "Ficha N" (14 dicen "Ficha 1"), sin grado ni descripción. Hay que abrir el PDF para saber qué contiene (ACT-04 y ACT-05).
- **Descargas:** 100 PDF suman 54M, y tres pesan más de 5 MB, sin aviso (ACT-01).
- **Teclado:** los acordeones actualizan `aria-expanded` y tienen foco visible, pero el foco también entra en los paneles cerrados (ACT-02).
- **Lo que funciona:** la introducción avisa que los enlaces abren en pestaña nueva, y ningún enlace a PDF está roto.

## Grado de certeza

- **en vivo:** probado en el sitio publicado con un navegador.
- **comando:** el comando confirma el hecho descripto en el código.

## Hallazgos

| ID | Severidad | Certeza | Hallazgo | Recomendación |
| --- | --- | --- | --- | --- |
| ACT-01 | Alta | comando | PDF de más de 5 MB sin aviso de peso | Comprimirlos y mostrar "PDF · 10 MB" junto al enlace. |
| ACT-02 | Alta | en vivo | Los enlaces de los paneles cerrados reciben el foco del teclado | Usar `hidden` o `inert` al cerrar el panel. |
| ACT-03 | Media | comando | La página no tiene `h1` ni `<main>` | Agregarlos. |
| ACT-04 | Media | comando | Nombres de enlace y de archivo poco descriptivos | Usar nombres como "Sumas con reagrupamiento · Ficha 1" y un atributo `download` con nombre legible. |
| ACT-05 | Media | comando | No se indica el grado de las fichas | Agregar grado o ciclo a cada grupo. |
| ACT-06 | Media | comando | Título genérico y sin descripción, sitemap, licencia ni pie | Completar título, descripción y pie con la licencia que corresponda. |
| ACT-07 | Media | comando | Dos PDF no tienen enlace | Enlazarlos o quitarlos. |
| ACT-08 | Baja | comando | Los paneles arrancan cerrados y sin contador | Mostrar cuántas fichas tiene cada panel. |
| ACT-09 | Baja | comando | El `alt` del logo que lleva a escolar.com.ar no describe el destino | Cambiarlo por "Ir a escolar.com.ar". |
| ACT-10 | Baja | comando | `logo1.png` pesa 520 KB para mostrarse chico | Exportarlo a unos 200 px. |

## Detalle y comprobación

Los comandos se corren con bash desde la raíz del repo.

### ACT-01: PDF de más de 5 MB sin aviso de peso

- Severidad: Alta
- Certeza: comando
- Recomendación: Comprimirlos y mostrar "PDF · 10 MB" junto al enlace.
- Nota: Son para imprimir: al comprimir hay que cuidar la calidad de impresión.

Comprobar:

```bash
find . -name '*.pdf' -not -path './.git/*' -size +5M -exec ls -l {} + | awk '{print $5, $NF}'
```

Resultado:

```text
10858866 ./lengua/alfabetizacion/iniciales_mpls.pdf
10607797 ./lengua/alfabetizacion/inicio_vocales.pdf
5876961 ./lengua/alfabetizacion/memotest.pdf
```

### ACT-02: Los enlaces de los paneles cerrados reciben el foco del teclado

- Severidad: Alta
- Certeza: en vivo
- Recomendación: Usar `hidden` o `inert` al cerrar el panel.
- Nota: Probado el 2026-11-10: un enlace dentro de un panel cerrado recibió el foco sin verse.

Comprobar:

```bash
grep -n 'max-height: 0' index.html; grep -cE 'inert|\.hidden|setAttribute\(.hidden' index.html
```

Resultado:

```text
117:            max-height: 0;
0
```

### ACT-03: La página no tiene `h1` ni `<main>`

- Severidad: Media
- Certeza: comando
- Recomendación: Agregarlos.

Comprobar:

```bash
grep -c '<h1' index.html; grep -c '<main' index.html
```

Resultado:

```text
0
0
```

### ACT-04: Nombres de enlace y de archivo poco descriptivos

- Severidad: Media
- Certeza: comando
- Recomendación: Usar nombres como "Sumas con reagrupamiento · Ficha 1" y un atributo `download` con nombre legible.
- Nota: Primer número: enlaces "Ficha N". Segundo: cuántos dicen "Ficha 1". Fuera de contexto, un lector de pantalla los anuncia todos igual.

Comprobar:

```bash
grep -oE '>Ficha [0-9]+<' index.html | wc -l; grep -oE '>Ficha 1<' index.html | wc -l; find . -name 'cm_*.pdf' -not -path './.git/*' | head -3
```

Resultado:

```text
83
14
./problemas/cm_01.pdf
./problemas/cm_02.pdf
./problemas/cm_03.pdf
```

### ACT-05: No se indica el grado de las fichas

- Severidad: Media
- Certeza: comando
- Recomendación: Agregar grado o ciclo a cada grupo.
- Nota: Requiere decidir el grado de cada grupo. Se agrupan por rango numérico ("Hasta 1000").

Comprobar:

```bash
grep -ci 'grado' index.html
```

Resultado:

```text
0
```

### ACT-06: Título genérico y sin descripción, sitemap, licencia ni pie

- Severidad: Media
- Certeza: comando
- Recomendación: Completar título, descripción y pie con la licencia que corresponda.

Comprobar:

```bash
grep -n '<title' index.html; grep -c 'name="description' index.html; ls sitemap.xml robots.txt 2>&1; grep -ciE 'licen|creativecommons|<footer' index.html
```

Resultado:

```text
6:    <title>Actividades</title>
0
ls: cannot access 'sitemap.xml': No such file or directory
ls: cannot access 'robots.txt': No such file or directory
0
```

### ACT-07: Dos PDF no tienen enlace

- Severidad: Media
- Certeza: comando
- Recomendación: Enlazarlos o quitarlos.
- Nota: Puede ser intencional si todavía no están listos.

Comprobar:

```bash
for f in $(find . -name '*.pdf' -not -path './.git/*' | sed 's|^\./||'); do grep -q "$f" index.html || echo "$f"; done
```

Resultado:

```text
lengua/cuentos_cortos/el_traje_nuevo_del_emperador_cuento.pdf
lengua/cuentos_cortos/el_traje_nuevo_del_emperador_fichas.pdf
```

### ACT-08: Los paneles arrancan cerrados y sin contador

- Severidad: Baja
- Certeza: comando
- Recomendación: Mostrar cuántas fichas tiene cada panel.

Comprobar:

```bash
grep -c 'aria-expanded="false"' index.html
```

Resultado:

```text
6
```

### ACT-09: El `alt` del logo que lleva a escolar.com.ar no describe el destino

- Severidad: Baja
- Certeza: comando
- Recomendación: Cambiarlo por "Ir a escolar.com.ar".

Comprobar:

```bash
grep -n 'alt="Escolar 1302"' index.html
```

Resultado:

```text
211:        <a href="https://escolar.com.ar/"><img src="logo1.png" alt="Escolar 1302" width="841" height="768"></a>
```

### ACT-10: `logo1.png` pesa 520 KB para mostrarse chico

- Severidad: Baja
- Certeza: comando
- Recomendación: Exportarlo a unos 200 px.

Comprobar:

```bash
ls -l logo1.png | awk '{print $5, $NF}'; grep -n 'logo1.png' index.html
```

Resultado:

```text
520755 logo1.png
211:        <a href="https://escolar.com.ar/"><img src="logo1.png" alt="Escolar 1302" width="841" height="768"></a>
```

## Orden sugerido

1. ACT-02: un cambio chico en el script del acordeón.
2. ACT-03, ACT-06 y ACT-09: etiquetas y textos de la página.
3. ACT-01 y ACT-10: comprimir archivos.
4. ACT-07 y ACT-08: decidir sobre los PDF sueltos y agregar contadores.
5. ACT-04 y ACT-05: renombrar enlaces y agregar grados, que es lo que más trabajo lleva y más ayuda a los docentes.

## Preguntas para el dueño

- ¿Los dos PDF de "El traje nuevo del emperador" están listos para publicar?
- ¿Las fichas se pueden asignar a un grado o ciclo, o se usan a propósito por rango numérico?
