/**
 * @author Botpi
 */

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

function logout()
{
	document.cookie = "encabezado='','',''";
	document.cookie = "IDcuentacli=0";
	EliminaTokenP(vaRegistro);	
}

function vaRegistro()
{
	window.location.assign("registro.html");	
}

function ajustaEncabezado(cuenta)
{
	encabezado = "'" + cuenta.email + "','" + cuenta.clave + "','" + cuenta.token + "'";
	document.cookie = "encabezado=" + encabezado;
}

function chequeaToken()
{
	if (typeof token == 'undefined')
		token='';
	else if (token==null)
		token='';	
}

// ------------------- dibujos

function dibujaCatalogos(datos, titulo, carro)
{
	var cad = armaCadCatalogos(datos, carro);
	$("#catalogosh").html(cad);
	$("#titulocatalogo").html('<label> ' + titulo + ' </label>')
}

function dibujaCatalogosAbajo(datos, titulo, carro)
{
	var cad = armaCadCatalogos(datos, carro);
	$("#catalogosh1").html(cad);
	$("#titulocatalogo1").html('<label> ' + titulo + ' </label>')
}

function armaCadCatalogos(datos, carro)
{
	var cad = "";
	$.each(datos, function(i,item) {
		cad = cad + '<a class="nav-link" href="catalogo.html?ID='+ item.ID +'"><div class="nav-col col"><span>' + item.nombre + '</span></div></a>';
	} );
	cad = cad + '<a class="nav-link" href="contacto.html"><div class="nav-col col"><span>Contacto</span></div></a>';
	if (carro>=0)
		cad = cad + '<a class="nav-link icon-cart" href="carro.html"><div class="nav-col col"><span>Carro (' + carro + ')</span></div></a>'
	
	return cad;
}

function dibujaTitulo(titulo, logo)
{
	$("#titulocuenta").html('<h2>' + titulo + '</h2>');
	$("#logo").attr("src", imagedir + "logos/" + logo)
}

function dibujaTituloAbajo(titulo, logo)
{
	$("#titulocuenta1").html('<h2>' + titulo + '</h2>');
	$("#logo1").attr("src","logos/" + logo)
}

function dibujaBuscar(tags)
{
    $("#buscar").autocomplete({
      source: extraeNombre(tags, "tag")
    }); 	
}

function dibujaLogin(cuenta)
{
	var usuario;
	if (typeof cuenta == 'undefined' || cuenta==null )
		usuario = "";
	else
		if (typeof cuenta.usuario == 'undefined' || cuenta.usuario==null )
			usuario = "";
		else
			if (cuenta.usuario==cuenta.empresa)
				usuario = cuenta.usuario;
			else	
				usuario = cuenta.usuario + " / " + cuenta.empresa;
	$("#ayuda").attr("href",ayuda);			
	if (usuario!="") {
		$("#quierovender").hide();
		$("#registro").hide();
		$("#login").hide();
		$("#nombreusuario").html(usuario);
		$("#nombreusuario").show();
		$("#logout").show();
		if (cuenta.tipo=="P" | cuenta.tipo=="V")
			dibujaMenu();
	}
	else {	
		$("#quierovender").show();
		$("#registro").show();
		$("#login").show();
		$("#nombreusuario").hide();
		$("#logout").hide();
	}	
	if (cuenta.eslenguaje)
		dibujaTitulos(cuenta);
}

function inicioSinLogin()
{
	leeServidor();	
	encabezado = getCookie("encabezado");
	if (encabezado==null | encabezado=="" | encabezado=="'',''")
		encabezado="'','',''";
	token = encabezado.split(",")[2]
	token = token.trim().substr(1,token.length-2);
	if (token=="''")
		token = "";
	l = navigator.languages? navigator.languages[0] : (navigator.language || navigator.userLanguage)
	l = "en";	
	//LeeLenguajeP(l, dibujaLogin);
}

// ---------------------------- Menu

function dibujaMenu()
{ 
	$("#menu").html(
		  '<h2 id="titmanejesutienda">Maneje su Tienda &nbsp;</h2>'
		+ '<a class="nav-link v2" href="catalogo.html?m=1"><div class="nav-col v2"><span id="titcatalogo">Catalogo</span></div></a>'
		//+ '<a class="nav-link v2" href="subeprod.html"><div class="nav-col v2"><span>Subir Productos</span></div></a>'
		+ '<a class="nav-link v2" href="pedidos.html"><div class="nav-col v2"><span id="titpedidos">Pedidos</span></div></a>'
		+ '<a class="nav-link v2" href="tasoc.html"><div class="nav-col v2"><span id="titasociados">Asociados</span></div></a>'
		+ '<a class="nav-link v2" href="tcat.html"><div class="nav-col v2"><span id="titsecciones">Secciones</span></div></a>'
		+ '<a class="nav-link v2" href="editorlogo.html"><div class="nav-col v2"><span id="titmicuenta">Mi Cuenta</span></div></a>'
		+ '<a class="nav-link v2" href="tactivap.html"><div class="nav-col v2"><span id="titpapelera">Papelera</span></div></a>'
	)
}
/*
function muestraMenu()
{
	//$("#menu").toggleClass("config-menu");
	//$("#menu").toggleClass("nothovered");
	$("#menu").removeClass(".config-menu").addClass(".config-menu.hover");
}

function ocultaMenu()
{
	//$("#menu").toggleClass("config-menu");
	//$("#menu").toggleClass("nothovered");
	$("#menu").removeClass(".config-menu.hover").addClass(".config-menu");
}
*/

// -----------------------------

function buscaTag(funcion)
{
	BuscarTag($("#buscar").val(), gdatos.cuentaCat.ID, funcion);
}

function getCookie(c_name)
{
	var c_value, c_start, c_end;
	 c_value = document.cookie;
	c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1) {
		c_start = c_value.indexOf(c_name + "="); }
	if (c_start == -1) {
		c_value = null; }
	else  {
		c_start = c_value.indexOf("=", c_start) + 1;
		c_end = c_value.indexOf(";", c_start);
		if (c_end == -1)  {
			c_end = c_value.length;  }
		c_value = unescape(c_value.substring(c_start,c_end));}
	
	return c_value;
}

function IsEmail(email) 
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function buscaObjetoxID(datos, ID)
{
	for (var i=0; i<datos.length; i++)
		if (datos[i]["ID"]==ID)
			break;
	if (i<datos.length)
		return datos[i];
	return null
}

function esUsuario(datos)
{
	return  datos.cuenta!=null && datos.cuentaCat!=null && datos.cuentaCat.ID==datos.cuenta.ID;
}

function isOwner(datos)
{
	return  datos.cuenta!=null && datos.cuentaCat!=null && datos.cuentaCat.IDowner==datos.cuenta.ID;
}

function logueado()
{
	var d = encabezado.split(",");
	return d[0]!="''" & d[2].trim()!="''";
}

function ymd(date)
{
	return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}

function extraeNombre(lista, campo)
{
	var l=[];
	$.each(lista, function(i, item) {
		l.push(item[campo]);
	});	
	return l;	
}

// ------------------------------- Selectores

function llenaSelector(datos, control)
{
	var cad = "";
	$.each(datos, function(i,item) {
		cad = cad + '<option value="' + item.ID +'">' + item.nombre + '</option>';
	});
	$("#" + control).html(cad);	
}

function llenaSelectorxCampo(datos, control,campo)
{
	var cad = "";
	$.each(datos, function(i,item) {
		cad = cad + '<option value="' + item.ID +'">' + item[campo] + '</option>';
	});
	$("#" + control).html(cad);	
}

function poneSelector(val, control)
{
	var sel = document.getElementById(control);
	sel.value = val;
/*
    for(var i = 0, j = sel.options.length; i < j; ++i) {
        if(sel.options[i].innerHTML === val) {
           sel.selectedIndex = i;
           break;
        }
    }
    */
}

function poneSelectorxID(ID, control)
{
	var sel = document.getElementById(control);
    for(var i = 0, j = sel.options.length; i < j; ++i) {
        if(sel.options[i].value === ID.toString()) {
           sel.selectedIndex = i;
           break;
        }
    }
}

// ----------------- formatos

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
 
// ------------------------- datepicker

function poneDatePicker(selector, formato, fecha)
{
	$(selector).datepicker();
	$(selector).datepicker( "option", "dayNamesMin", [ "Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa" ]);
	$(selector).datepicker( "option", "monthNamesShort", [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ]);
	$(selector).datepicker( "option", "monthNames", [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"
													, "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ]);
	if (formato!="")
		$(selector).datepicker( "option", "dateFormat", formato);
	$(selector).datepicker( "setDate", fecha);
	
}

function tomaDatePicker(valor)
{
	var t = $("#fecha").val().replace("Ene","Jan").replace("Abr","Apr").replace("Ago","Aug").replace("Dic","Dec");
	return new Date(t);
	
}
