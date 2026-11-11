// Pie común del sitio: autoría y licencia.
// Para usarlo en otra página, agregar antes de </body>:
//   <script src="pie.js"></script>
(function () {
    var pie = document.createElement("footer");
    pie.style.cssText = "text-align: center; padding: 20px; font-family: inherit; border-top: 1px solid #ddd; margin-top: 40px;";
    pie.innerHTML =
        '<p style="margin: 0 0 10px 0; font-size: 16px; font-weight: bold; color: #333;">' +
            'Material elaborado por escolar.com.ar' +
        '</p>' +
        '<a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/">' +
            '<img alt="Licencia Creative Commons" width="88" height="31" style="border-width: 0; margin-bottom: 10px;" ' +
                'src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png">' +
        '</a>' +
        '<br>' +
        '<small>' +
            'Los contenidos de este sitio están bajo una ' +
            '<a rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" style="color: #333; text-decoration: underline;">' +
                'Licencia CC Atribución-NoComercial-CompartirIgual 4.0 Internacional' +
            '</a>.' +
        '</small>';
    document.body.appendChild(pie);
})();
