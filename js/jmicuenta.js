/**
 * @author botpi
 */

function cambiaClave()
{
	if ($("#passwd1").val()=="")
		alert("la nueva contraseña no puede estar vacía")
	else if ($("#passwd1").val()!=$("#passwd2").val())
		alert("la nueva contraseña y su repetición deben ser iguales")
	else
		CambiaClaveH($("#passwd").val(), $("#passwd1").val(), aviso)
	
}

function aviso(response)
{
	if (response) {
		encabezado = "'" + response.email + "','" + response.clave + "'";
		document.cookie = "encabezado=" + encabezado;				
		alert("Clave cambiada con éxito");
		cancelar();		
	}
	else {
		alert("No se pudo cambiar la clave");
	}
}

function cancelar()
{
	window.location.assign("ocupacion.html")
}
