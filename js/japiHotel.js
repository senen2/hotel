/**
 * @author botpi
 */
    
function LoginH(email, token, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LoginH('" + email + "','" + token + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(email, response);
		}
	});	
}
    
function LeeHabitacionesH(IDhotel, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/LeeHabitacionesH(" + encabezado + "," + IDhotel+ ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function LeeHabitacionH(IDhab, fecha, funcion)
{
	var f = $.datepicker.formatDate("yy-mm-dd", fecha);
	$.ajax({
		url: "http://" + servidor + "/function/LeeHabitacionH(" + encabezado + "," + IDhab + ",'" + f + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
    
function LeeOcupacionH(IDhotel, fecha, funcion)
{
	var f = $.datepicker.formatDate("yy-mm-dd", fecha);
	$.ajax({
		url: "http://" + servidor + "/function/LeeOcupacionH(" + encabezado + "," + IDhotel + ",'" + f + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}

function CreaReservaH(cliente, telefono, IDhab, IDplan, desde, noches, precio, funcion)
{
	var datos = {};
	datos.cliente = cliente;		
	datos.telefono = telefono;		
	datos.IDhab = IDhab;		
	datos.IDplan = IDplan;		
	datos.desde = $.datepicker.formatDate("yy-mm-dd", desde);;
	datos.noches = noches;		
	datos.precio = precio;		

	$.post( 'http://' + servidor + "/functiond/CreaReservaH(" + encabezado + ")?pagina=" + pagina, JSON.stringify(datos))
	 	.always(function(){
	 		funcion();
	 	});
}
  
function BorraReservaH(IDreserva, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/BorraReservaH(" + encabezado + "," + IDreserva + ")?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
  
function PagarH(IDreserva, IDpagotipo, valor, descripcion, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/PagarH(" + encabezado + "," + IDreserva + "," + IDpagotipo  + "," + valor+ ",'" + descripcion + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			if (funcion)
				funcion(response);
		}
	});	
}
  
function GrabarNotasH(IDreserva, notas)
{
	var datos = {};
	datos.IDreserva = IDreserva;		
	datos.notas = notas;		

	$.post( 'http://' + servidor + "/functiond/GrabarNotasH(" + encabezado + ")?pagina=" + pagina, JSON.stringify(datos));	
}
    
function CambiaClaveH(clave, clavenueva, funcion)
{
	$.ajax({
		url: "http://" + servidor + "/function/CambiaClaveH(" + encabezado + ",'" + clave + "','" + clavenueva + "')?pagina=" + pagina,
		jsonp: "callback",
		dataType: "jsonp",
		success: function( response ) {
			funcion(response);
		}
	});	
}
